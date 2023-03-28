import { decrease, increase } from "./actions.js";
import {reducer} from "./reducer.js";
import {createStore} from "./redux.js"

//사용 - 함수호출=store생성하기  index.js에서 store생성(리액트에서는)
//Q. 왜 index.js?  
//A. 모든 전역상태를 관리하고싶어 initializeState
//app.js에있는 코드가 리액트 컴포넌트에 사용해야하는 코드
//문제제기 app.js 하나에 모두 있을 때는 파라미터에 reducer(구:worker)파라미터로 넘겨야 한다

const store = createStore(reducer);/*index.js에서 생성 createStore함수받기 */
store.subscribe(function(){//pub and subscribe 모델 함수호출
    console.log(store.getState());//변경된 상태값 확인하기 리액트 - 컴포넌트가 마운트 될 때
})
//getState = Selector(state=>state.userAuth)

//store.dispatcher(actionCreator(INCREASE,1))//시그널 보내기 send의 파라미터 => action
//해당 컴포넌트에서 satae값을 가저오기 useSelector 전달은 dispatch
store.dispatch(increase());//시그널 주기 action 리액트 -useDispatch dispatch(type,payload)
store.dispatch(increase());
store.dispatch(decrease());
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