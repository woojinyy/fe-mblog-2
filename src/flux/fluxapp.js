//상태는 createStore()안에 있다
//store안에는 상태를 담을 변수 선언 state
//콜백함수를 담을 배열 선언 handlers[]
//send 함수 구현-파라미터로 action
//subscribe(handler-콜백함수)구독발행모델 (aka 알람설정) 
//subscribe를 통해 들어온 콜백함수는 handlers[]에 담긴다
//getState함수 state값을 반환 받을 수 있도록 정의
//return {...send,subscribe,getState}
const createStore=()=>{//배치위치 index.js에 배치 = store를 생성하겠다
    let state; /* 변하니까 상태다 */
    //함수를 담아두는 배열 선언
    let handlers=[];
    //상태 바꾸기 useSelector훅을 통해서 action 전달
    const send=(action)=>{
        //새로운 객체가 만들어진다
        console.log("send호출")
        state = dispatcher(state,action)
        //나에게 구독신청한 사람들에게 알림
        handlers.forEach((handler)=>handler());//전달받은 함수 호출해줘
    };
    const subscribe= (handler)=>{//useDispatcher 훅
        //콜백함수
        console.log(store.getState())
        handlers.push(handler);
    }
    
    const getState= ()=>{
        return state;
    }
    //외부에서 호출하기위해 
    //함수안에서 함수를 리턴하도록 처리하여야한다
    return {
        send,//함수 == 객체 파라미터로 들어온 상태를 받아서 가공 후 새로운 객체로 내보냄
        getState,//함수 ==상태정보를 담은 state를 반환해준다
        subscribe,
    };
};//end of store

const worker=(state={count:0},action)=>{//state가 undefined되는 것 방지위해 객체 선언
    //Q1.무엇을 해야 하나요?  
    //A1.참조무결성이 깨지는 걸 방지하기위해 dispathcer
    //입력으로 상태 줄테니까 이 객체 복사해서 (깊은)새로운객체로 변화해서 처리해라
    //기존의 참조를 끊어라
    //Q2.왜 끊어?
    //A2. sideEffect 방지 

    //상태를 바꾸면 createStore안에 state 의 참조 무결성이 깨짐
    //리덕스에서는 상태를 바꾸는 함수는 반드시 새로운 상태를 반환해라
    //컨셉이 새로운 객체를 만들어서 오류 방지가 컨셉이야
    //새로운 상태= 화면의 입력(Action)으로 상태의 객체를 줄테니 이 객체를 깊은복사해서
    //기존의 참조(링크)를 끊어라  그래야 side effect방지한다
switch(action.type){
    
    case'increase':
        return{...state,count:state.count+1}
    case'decrease':
        return{...state,count:state.count-1}
    default:
        return {...state}
}
return {...state,count:state.count+1}//깊은복사=새로운객체를 만들어서 내용을복사함
//링크를 걸지 않는다 링크를 뺸다 원본과의 연결고리를 끊어
}
//자바스크립트에서는 함수도 파라미터로 넘길 수 있다
//index.js에서 생성할 거임 props대신 중앙에서(index.js)에서 즉시 한번에 가져다 사용
const store = createStore(dispatcher)/* createStore함수받기 */
store.subscribe(function(){
    console.log(store.getState());
})
//action의 내용은  send에서 만듦
//사용자가 버튼 클릭 시 시그널 발생  type정해서 value를 store에 전달한다
//store가 받아서 전변으로 관리
store.send({type:'increase'})//시그널 보내기 send의 파라미터 => action
store.send({type:'increase'})
store.send({type:'decrease'})
console.log(store.getState())

/* 
자바스크립트에서 함수는 객체
소문자로 선언하면 함수
대문자로 선언하면 화면을 렌더링하는 컴포넌트

코드정리하는 시나리오정리
return에서는 상태값을 직접 넘겨주지않는다
상태는 createStore함수에 있지만 변경하거나 읽거나 하는
코드들은 UI의  component이다
이 컴포넌트들은  createStore함수의 바깥쪽에 위치한다
직접 접근 모 ㅅ하는데 어떻게 수정할것인가 create함수에 제공하면 되겠지
createStore가 상태 변경하는 것을 제공하는것이고 제공한다는 뜻은 

1. ui에게는 직접적인 상태를 주지 않는다
   return {
        state
    } 이렇게 안한다

일꾼= dispatcher

Q. 화면에 컴포넌트(HomePage.jsx, LoginPage.jsx등..)가 여러개 있는 상황에서
어떤 컴포넌트의 데이터가 변경되었는지 확인하고 
getState함수를 호출할까?

A. 구독발행 모델사용 Pub and Subscribe 
함수(dispatcher)를 줄테니 데이터 변경되면 호출해줄래??

*/