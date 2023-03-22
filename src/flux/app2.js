const createStore=()=>{
    let state; 
    let handlers=[];
    //상태 바꾸기 
    const send=(action)=>{
        //새로운 객체가 만들어진다
        console.log("send호출")
        state = dispatcher(state,action)
        handlers.forEach(handler=>handler())
    }
    const subscribe=( ()=>{
        console.log(store.getState())
        handlers.push(handlers)
    }) 
    const getState= ()=>{
        return state
    }
    return {
        send,
        getState,
        subscribe
    }
}

const dispatcher=(state={count:0},action)=>{
    
switch(action.type){
  
    case'increase':
        return{...state,count:state.count+1}
    case'decrease':
        return{...state,count:state.count-1}
    dafault:
        return {...state};
}
return {...state,count:state.count+1}
}

const store = createStore(dispatcher)
store.subscribe(function (){
    console.log(store.getState())
})
    store.send({type:'increase'})
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