import {GoogleAuthProvider,getAuth,signInWithPopup,createUserWithEmailAndPassword, EmailAuthProvider, sendEmailVerification,signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
class AuthLogic{
  //생성자 전변 초기화
    constructor(){
        this.auth=getAuth();//외부에서 쓰기 위해 
        this.googleProvider= new GoogleAuthProvider();
        //this.kakaoProvider = new KakaoAuthProvider();
    }
    getUserAuth=()=>{
        return this.auth
    }
    getGoogleAuthProvider=()=>{
        return this.googleProvider;
    }
}
export default AuthLogic; //외부 js에서 사용 대비 export
//사용자가 변경되었는지 지속적으로 체크 변경되면 될 때마다 호출 callback함수 
export const onAuthChange =(auth) =>{//구글에서 제공하는 서비스 
    return new Promise((resolve) =>{//Promise prototype함수를 사용 비동기 서비스 구현
        //사용자 바뀌었을 때 콜백함수 받아서
        auth.onAuthStateChanged((user)=>{//파라미터주입
            resolve(user) //내보내지는 정보 View계층 App.jsx
        })
    })//end of Promise
}//end of onAuthChange

export const logout=(auth)=>{ 
    return new Promise((resolve,reject)=>{
        auth.signOut().catch(e=>reject(e+'로그아웃오류입니다'));
        //제공하는 서비스를 누리기위해서는 구글에서 제공하는 기본정보 외 추가로 필요한 정보가 있다 -table설계에 반영 -정보를 세션에 담는다
        //로그아웃 성공시 sessionstorage에 담아 둔 정보를 모두 지운다
        window.sessionStorage.clear();
        //서비스를 더이상 사용하지 않는 경우 -> 돌려줄 값은 없다
        resolve();//돌려줄 값이 없기 떄문에 파라미터값 비워둔다
    });
 }
 //로그인 시도시 구글인증인지 아니면 깃허브인증인지 문자열로 넘겨 받기
  //구글 인증인 경우 -Google
  //깃헙 인증인 경우 -Github
  export const loginGoogle=(auth,googleProvider) =>{
    return new Promise((resolve,reject) =>{
        signInWithPopup(auth,googleProvider)//팝업창 열림
        .then((result) =>{//콜백진행
            const user =result.user;//구글에 등록되어 있는 profile정보담겨있음
            console.log(user)
            resolve(user)//인증된 사용자 프로필 정보 화면쪽으로 내보낸다
        }
        ).catch(e=> reject(e));
    })
  }
  //이메일과 비번으로 회원가입 한 경우 로그인 처리
  //auth = authLogic클래스 생성자 getAuth() -auth
  //user = email,password
  export const loginEmail=(auth,user)=>{
    console.log(auth)
    console.log(user.email+user.password)
    return new Promise((resolve,reject)=>{
      signInWithEmailAndPassword(auth, user.email, user.password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user)
    //성공하면 resolve
    resolve(userCredential)//응답

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode+","+errorMessage)
    reject(error)//error객체 넘겨주기
  });
    })

  }
  export const signupEmail = (auth, user) => {
    return new Promise((resolve, reject) => {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          sendEmail(userCredential.user).then(() => {
            resolve(userCredential.user.uid);
          });
        })
        .catch((e) => reject(e));
    });
  };
  export const linkEmail = (auth, user) => {
    console.log(auth);
    console.log(auth.currentUser);
    console.log(user);
    return new Promise((resolve, reject) => {
      console.log(user.email + "," + user.password);
      const credential = EmailAuthProvider.credential(user.email, user.password);
      console.log(credential);
      console.log(auth.currentUser.uid);
      resolve(auth.currentUser.uid)
      /* 인증정보가 다른 사용자 계정에 이미 연결되어 있다면 아래 코드 에러 발생함
      linkWithCredential(auth.currentUser, credential)
        .then((usercred) => {
          console.log(usercred);
          const user = usercred.user;
          console.log("Account linking success", user.uid);
          resolve(user.uid);
        })
        .catch((e) => reject(e));
      */
    });
  };
  export const sendEmail = (user) => {
    return new Promise((resolve, reject) => {
      sendEmailVerification(user)
        .then(() => {
          resolve("해당 이메일에서 인증메세지를 확인 후 다시 로그인 해주세요.");
        })
        .catch((e) => reject(e + ": 인증메일 오류입니다."));
    });
  };

  export const sendResetpwEmail=(auth,email)=>{
    console.log(email);
return new Promise((resolve,reject)=>{
  sendPasswordResetEmail(auth,email)
  .then(()=>{
    resolve('비밀번호 변경메일을 보냈습니다.')
  })
  .catch((e)=>reject(e))
})
  }