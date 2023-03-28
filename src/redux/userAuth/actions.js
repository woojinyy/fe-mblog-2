export const SET_AUTH = "USER_AUTH/SET_AUTH"
//파라미터로 auth와 googleProvider를 받아서 초기화->reducer에서 처리하자
export const setAuth= (auth,googleProvider)=>{
    return {
        type:SET_AUTH,
        auth:auth,
        googleProvider:googleProvider,
    };
};
