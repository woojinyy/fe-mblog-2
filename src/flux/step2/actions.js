import { DECREASE, INCREASE, RESET } from "./action-type.js";
import { actionCreator } from "./redux.js";
//store.dispatch(increase()) dispatch는 action을 store에 전달할 하는 허브역할
//store에 있는 상태값을 꺼내는 것이 getState 리액트에서는 useSelector
export const increase=actionCreator(INCREASE);
export const decrease=actionCreator(DECREASE);
export const reset =actionCreator(RESET);
/////////////////////////////////////////////

export const setToastMsg = (msg)=>{
    return {
        type:SET_MSG,
        msg:msg,
        bool:true,
    }
}
export const setToastFalse=()=>{
    return{
        type:SET_FALSE,
        msg:"",
        bool:false,
    };
}