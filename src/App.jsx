import { Route, Routes, useNavigate } from 'react-router';
import './components/css/style.css';
import MemberPage from './components/page/MemberPage';
import Profile from './components/kakao/Profile'
import HomePage from './components/page/HomePage'
import KakaoRedirectHandler from './components/kakao/KakaoRedirectHandler';
import DeptPage from './components/page/DeptPage';
import DeptDetail from './components/dept/DeptDetail';
import RepleBoardPage from './components/page/RepleBoardPage';
import Toast from './components/Toast'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setToastMsg } from './redux/toastStatus/action';
import SignupPage from './components/auth/SignupPage';
import KhLoginPage from './components/auth/KhLoginPage';
import { memberListDB } from './service/dbLogic';
import { onAuthChange } from './service/authLogic';
import EmailVerifiedPage from './components/auth/EmailVerifiedPage';
import FindEmailPage from './components/auth/FindEmailPage';
import ResetPwdPage from './components/auth/ResetPwdPage';
import RepleBoardDetail from './components/repleboard/RepleBoardDetail';
import RepleBoardWriteForm from './components/repleboard/RepleBoardWriteForm';
import KhQnAListPage from './components/repleboard/KhQnAListPage';
import KhQnAWriteForm from './components/repleboard/KhQnAWriteForm';
import KhQnADetailPage from './components/repleboard/KhQnADetailPage';
import KhQnAUpdatePage from './components/repleboard/KhQnAUpdatePage';
function App({authLogic,imageUploader}) {
  //Hook 화면을 전환 시킬 때 vs window.location.href차이점 새로고침 요청 발생 가상의 돔 사용하지 않음
  const navigate=useNavigate()//가상돔 사용
  const dispatch = useDispatch()//onewaybinding 허브역할 action.type(switch문-선택),action.payload(내용) 인자를 넘겨야한다
  const ssg=sessionStorage;
  const toastStatus = useSelector(state=>state.toastStatus)//store에 값을 접근할 때
  useEffect(()=>{//의존성 배열 존재 -의존성 배열에 있는 변수 또는 함수,훅이 변할 때 마다 다시 호출 가능하다
    //시그널보내
    console.log('effect')
    const asyncDB=async()=>{//함수 선언 -memberListDB호출
    const auth=authLogic.getUserAuth()
    console.log('asyncDB')
    //현재 인증된 사용자 정보를 가져온다
    const user = await onAuthChange(auth)
       //사용자 정보가 있으면 =userId가 있다
       //구글 로그인으로 사용자 정보를 가지고 있을 때
       //user정보가 있으면 sessionStorage에담는다- email
      if(user){
        console.log('user정보가 있을  때')
        //sessionStorage에 email담기
        ssg.setItem('email',user.email)
        //db로보내기
        const res = await memberListDB({mem_uid:user.uid,type:'auth'})
        //오라클 서버에 회원집합에 uid존재 sessionStorage에 값을 담기
        if(res.data!==0){//스프링부트 RestMemberController-memberList  0 or [{mem_uid:asfesef...}]
          const temp = JSON.stringify(res.data)
          const jsonDoc=JSON.parse(temp)
          ssg.setItem('nickname',jsonDoc[0].MEM_NICKNAME)
          ssg.setItem('status',jsonDoc[0].MEM_STATUS)
          ssg.setItem('auth',jsonDoc[0].MEM_AUTH)
          ssg.setItem('no',jsonDoc[0].MEM_NO)
          //navigate('/')
          return//렌더링 종료
        }
        //구글 로그인은 했지만 false일 때
        if(!user.emailVerified){
          navigate('./auth/emailVerified')
        }
       
        //오라클 서버의 회원집합에 uid가 존재하지 않으면
        else{
          console.log("해당구글계정은 회원가입 대상입니다.")
          navigate('/auth/signup')
        }
      }
      //사용자 정보 없을 때
      else{
        console.log('user정보가 없을 때')
        if(sessionStorage.getItem('email')){
          //sessionStorage에있는 값 모두 삭제
          sessionStorage.clear()
          window.location.reload()
        }
      }//end of else
    }
    asyncDB()//함수 호출
  },[dispatch])
  return (
    <>
    <div style={{height:'100vh'}}>
      {toastStatus.status&&<Toast/>}
    
     <Routes>
      {/* 로그인 및 회원가입 */}
      <Route path = "/" exact={true} element={<HomePage/>}/>
      <Route path = "/login" exact={true} element={<KhLoginPage authLogic={authLogic}/>}/>
      <Route path = "/auth/signup" exact={true} element={<SignupPage authLogic={authLogic}/>}/>
      <Route path = "/auth/emailVerified" exact={true} element={<EmailVerifiedPage authLogic={authLogic}/>}/>
      <Route path = "/auth/findEmail" exact={true} element={<FindEmailPage />}/>
      <Route path = "/auth/resetpwd" exact={true} element={<ResetPwdPage authLogic={authLogic} />}/>
      {/* 댓글형 게시판 */}
      <Route path = "/reple/board" exact={true} element={<RepleBoardPage/>}/>
      <Route path = "/reple/boardwrite" exact={true} element={<RepleBoardWriteForm/>}/>
      <Route path = "/reple/boarddetail/:bm_no"  element={<RepleBoardDetail/>}/>
      {/* 컴포넌트 함수 호출 =마운트 컴포넌트함수가 가진 return 호출  */}
      <Route path = "/dept/:gubun" element={<DeptPage imageUploader={imageUploader}/>}/>
      <Route path = "/deptdetail/:deptno" element={<DeptDetail imageUploader={imageUploader}/>}/>
      <Route path = "/auth/kakao/callback" exact={true} element={<KakaoRedirectHandler/>}/>
      <Route path='/member' exact={true} element={<MemberPage imageUploader={imageUploader}/>}/>
      <Route path='/profile' exact={true} element={<Profile/>}/>
      {/* qna게시판 */}
      <Route path = "/qna/list" exact={true} element={<KhQnAListPage authLogic={authLogic}/>}/>

      <Route path = "/qna/write" exact={true} element={<KhQnAWriteForm authLogic={authLogic}/>}/>

      <Route path = "/qna/detail/*"  element={<KhQnADetailPage/>}/>

      <Route path = "/qna/update/:bno"  element={<KhQnAUpdatePage/>}/>
    </Routes>
      
    </div>
    </>
  );
}

export default App;
