import *as ActionType from './action-type.js'
//store에서 관리해야하는 상태값의 종류가 점점 많아진다-객체 리터럴을 사용하자
//열거형 연산자를 사용하여 n개관리 및 초기화 
const initializeState={count:0}// let state
export const reducer=(state=initializeState,action)=>{//하나씩 모듈화
    //state가 undefined되는 것 방지위해 객체 선언
    switch(action.type){
        case ActionType.INCREASE:
            return{...state,count:state.count+1}
        case ActionType.DECREASE:
            return{...state,count:state.count-1}
        case ActionType.RESET:
            return{...state,count:0}
        default:
            return {...state}
    }
    };