//Flux Architecure- ONE WAY BINDING 를 구현해 낸 게 redux
//Q.왜  One way binding 방식?????

//함수(일급객체시민=함수를 파라미터로 넘길 수 있고,return으로 함수를 넘길 수 있고)선언, 할당가능
//함수는 어디든 갈 수 있는 권리가 있다
//상태는 createStore함수 안에 있다
//Q. 누가 상태를 변경하고 읽어가나?
//A. UI의 컴포넌트
//worker함수의 switch문에서 action.type에 따라 상태를 변경하거나 읽어낸다
//변경되고 읽어낸 정보는 return 으로 처리
//store를 모아서 상태의 묶음을 넘겨준다=worker의 할일
const createStore=()=>{
    console.log(worker)
    //외부함수에서 선언한 변수를 내부함수에서 사용가능
    //상태값 반환하기 위한 변수
    let state;//step1- state.js 상태관리가 필요한 변수들의 꾸러미
    //구독신청한 이벤트들 꾸러미 담기
    let handlers=[] //구독신청하는 애들이 여러명이니까 배열로 받자
    const subscribe=(handler)=>{//자바스크립트 문법 코드 분석 가치O
        handlers.push(handler)
    }
    //외부에서 구독신청을 한 회원들에게 알림처리  구독발행모델 패턴 적용 by redux
    //구독버튼은 이벤트핸들러로 결국 callback 
    //document.querySelector("#root").addEventListener('click',function(){}) 클릭하면 함수 호출해줘


    //함수안에 또다른 함수 사용
    //위에서 선언된 상태 정보를 담은 변수를 새로운 상태정보로 치환 =기존의 참조를 끊어낸다=안전하게
        const send =(action)=>{//시그널보내기=worker경유하기
            //worker함수에 파라미터로 state를 두는 건 기존에 상태정보에 추가된 상태 정보 변경사항을 담기위함
            //선언된 let state에 새로운 상태정보가 추가된 상태정보를 갖는 주소번지로 치환
            state= worker(state,action)
            handlers.forEach(handler=>handler())
        }
//구독발행모델 PubAndSubscribe
//내가 어떤 함수(worker)구독할테니 데이터가바뀌면 너가 함수를 발행해줘 
//이벤트가 발생했을 때 바꿔야 하니까 이벤트를 관리해줄 함수를 담아야한다



    //내부함수 클로저 검색
    //https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures
    const getState=()=>{//react-redux가 제공 지금은 모방해보자
       //상태가 매번 다르다
        return state//관리하는 상태값 모두를 return으로 받자=객체리터럴이 필요 {}
    }
    return{//객체리터럴을 사용하면 여러개의 함수를 외부에서 사용가능함
        getState,//리턴타입이니까  괄호붙이면 망해
        send,
        subscribe,
        //외부에서 호출 시에는 리턴타입에 함수이름을 반환한다 -API
    }
}//end of createStore
//state={count:0} = state.js역할
const worker=(state={count:0},action)=>{//state가 undefined가되면 안되니까  객체 리터럴로 대입해줬다
    //그러나 여기서 상태를 바꾸면 createStore에있는 state의 참조 무결성이 깨진다 (원본이 바뀌면 안된다 불변성을 깨지면 안된다)
    //redux에서는 반드시 이 worker즉 상태를 바꾸는 함수는 새로운 상태를 반환해라 라는 규칙을 만듦

//action 을 추가
switch(action.type){
    case "increase":
    return {...state,count:state.count+1}
    case "decrease":
        return{...state,count:state.count-1}
    default:
        return{...state}
}//end of switch
   //return state; 이러면 안돼
   //깊은 복사 원본을 지킬 수 있는 방법
   //새로운 객체가 만들어진다=기존 참조를 끊어내라 =부작용 방지
}//end of worker
//store함수 호출하기
//const store = legacy_createStore(reducer)  - reducer = reducer.js
const store = createStore(worker)//worker를 파라미터로 넘긴다
store.subscribe(()=>{
    console.log(store.getState())
})
//아래와 같이 store에 내부함수를 외부에서 호출하려면 return 에 반드시 등록할 것
store.send({type:"increase"});
//action의 내용을 만드는 역할은 send를 하는 쪽에서 만들어 줌
console.log(store.state)//undefined 
console.log(store.getState())//worker를 경유해서 객체리터럴을 갖고있음 count:1
console.log(store.getState())//worker를 경유안해서 증가X count:1
store.send({type:"increase"});//시그널 보내기 worker경유하기
console.log(store.getState())//worker를 경유해서 객체리터럴을 갖고있음 count:2
store.send({type:"decrease"})
console.log(store.getState())//worker를 경유해서 객체리터럴을 갖고있음 count:2
/* 
 UI한테는 직접적인 상태를 주지 않을 거야
 Q. 함수에서 직접 값을 주는것과 주지않는것 사이에 차이는?
 A. 여기서 return 하는 것에는 state주지 않겠다 =redux 컨셉
 state를 그냥 주는 것은 자바스크립트 컨셉
 상태값을 읽거나 변경 이것을 반영하는 것이 컴포넌트
*/

/* 문제
무작정1 증가하는 컨셉
상태를 바꿔야 하는데 바꿔야 하는 상태가 어디있어 createStore 안에
createStore가 상태를 갖고있고 상태를 바꾸고자하는 코드는 밖에있으니까
worker를createStore에 파라미터로 넘겨준거고
언제 상태를 바꿀거냐의 문제인데 상태를 바꾸는 데 문제는 타이밍상이슈가 있을 수 있으니까
언제바꾸라고하는 시그널을 바깥에서 줘야한다
createSTore밖에서 줘야한다 적절한 타이밍에 그 시그널을 ㅁ넘겨줘야하고 
createStore는 그 시그널을 받을수있는 구조를 제공해야한다
상태를 어디서 어떻게 만들어야 하나
결국은 내부에서 만들어야 하는데 내부가 
*/