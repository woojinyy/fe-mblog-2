//상태관리
//service-> authLogic.js-> AuthLogic객체선언 매번 props로 가지고 다니기 싫다
//-> redux쓰자
//auth정보에 담기는 정보 = firebase/auth
export const userAuth={
    auth:"",
    googleProvider:"",//간편로그인 구글은 공급자 정보 필요
    //githubProvider:"", 깃헙 공급자정보
}