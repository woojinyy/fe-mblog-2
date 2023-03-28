import *as ActionType from './action-type.js'
import {initializeState} from './state.js'
//store에서 관리해야하는 상태값의 종류가 점점 많아진다-객체 리터럴을 사용하자
//열거형 연산자를 사용하여 n개관리 및 초기화 
//상태를 관리하는 변수 선언
//선언된 변수들이 payload에 담기고 

//상태를 변형하는 것 reducer
//첫번째 파라미터 =상태값, 두번째 파라미터 = action dispatch를통해서 store에 전달이 되는 것 action 안에 뭔가 메시지를 담고있어야 
//action에 담긴 정보를  dispatch가 store에 전달하는 컨셉 flux architecture
//oneway방식 이라 한쪽방향으로만 흘러감 
//action쪽 타입은 별도로 action-type.js에서 정한다
//action-dispatch-store-view 그림 기억
//action 같ㅇ는 것들이 동일하게 필요 
export const reducer=(state=initializeState,action)=>{
    //하나씩 모듈화
    //state가 undefined되는 것 방지위해 객체 선언
    switch(action.type){
        case ActionType.INCREASE:
            return{...state,count:state.count+1}
        case ActionType.DECREASE:
            return{...state,count:state.count-1}
        case ActionType.RESET:
            return{...state,count:0}
        case ActionType.SET_MSG:
            //깊은복사에서 두번째  인자가 payload에 해당
            return{...state,status:action.bool,msg:action.msg}
        case ActionType.SET_FALSE:
            //깊은복사에서 두번째  인자가 payload에 해당
            return{...state,status:action.bool,msg:action.msgfalse}
        default:
            return {...state};
    }
};