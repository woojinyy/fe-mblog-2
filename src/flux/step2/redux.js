//type을 정의하는 규칙 =커링함수 
//매개변수 분할 처리
//첫번째 파라미터 =타입, 두번째 파라미터= data받아오는 인자
//payload 
//개발자가 정의한 data나 에러처리에 필요한 메시지값
//요청에 대한 응답 메시지로 사용가능 toast
export const actionCreator=(type)=>(payload)=>({
    type,
    payload,
    //커링함수
    //순서대로 처리할 필요가 있음 커링함수패턴 적용
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
