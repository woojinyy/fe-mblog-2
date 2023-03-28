import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth';
class AuthLogic{
    constructor(){
        this.auth=getAuth();//외부에서 쓰기 위해 
        this.googleProvider= new GoogleAuthProvider();
    }
    getUserAuth=()=>{
        return this.auth
    }
    getGoogleAuthProcvider=()=>{
        return this.googleProvider;
    }
}
export default AuthLogic;
//사용자가 변경되었는지 지속적으로 체크 변경되면 될 때마다 호출
export const onAuthChange =(auth) =>{
    return new Promise((resolve) =>{
        //사용자 바뀌었을 때 콜백함수 받아서
        auth.onAuthStateChanged((user)=>{
            resolve(user)
        })
    })
}
export const logout=(auth)=>{ 
    return new Promise((resolve,reject)=>{
        auth.signOut().catch(e=>reject(e+'로그아웃오류입니다'));
        //로그인 성공시 sessionstorage에 담아 둔 정보를 모두 지운다
        sessionStorage.clear();
        //서비스를 더이상 사용하지 않는 경우 -> 돌려줄 값은 없다
        resolve();//돌려줄 값이 없기 떄문에 파라미터값 비워둔다
    });
 }
 //로그인 시도시 구글인증인지 아니면 깃허브인증인지 문자열로 넘겨 받기
  //구글 인증인 경우 -Google
  //깃헙 인증인 경우 -Github
  export const loginGoogle=(auth,googleProvider) =>{
    return new Promise((resolve,reject) =>{
        signInWithPopup(auth,googleProvider).then(
        (result) =>{
            const user =result.user;//구글에 등록되어 있는 profile정보담겨있음
            console.log(user)
            resolve(user)
        }
        ).catch(e=> reject(e));
    })
  }