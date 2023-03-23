export const actionCreator=(type)=>(payload)=>({
    type,
    payload,
    //커링함수
});

export const createStore=(reducer)=>{//외부 참조위해 export
    //배치 위치는 index.js배치 ->store생성
    let state; //상태를 담아두는 저장소
    let handlers=[];
    const dispatch=(action)=>{
        console.log("dispatch호출")
        state = reducer(state,action);
        handlers.forEach((handler)=>handler());//전달받은 함수 호출해줘
    };

    const subscribe= (handler)=>{//useDispatcher 훅
        console.log(store.getState())
        handlers.push(handler);
    }
    const getState= ()=>{
        return state;
    }
    return {
        dispatch,
        getState,
        subscribe,
    };
};//end of store
