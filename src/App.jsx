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
function App({authLogic,imageUploader}) {
  const navigate=useNavigate()
  const ssg=sessionStorage;
  const dispatch = useDispatch()
  const toastStatus = useSelector(state=>state.toastStatus)
  useEffect(()=>{
    //시그널보내
    const asyncDB=async()=>{
    const auth=authLogic.getUserAuth()
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
        const res = await memberListDB({MEM_ID:user.uid,type:'auth'})
        //오라클 서버에 회원집합에 uid존재 sessionStorage에 값을 담기
        if(res.data){
          const temp = JSON.stringify(res.data)
          const jsonDoc=JSON.parse(temp)
          ssg.setItem('nickname',jsonDoc[0].MEM_NICKNAME)
          ssg.setItem('status',jsonDoc[0].MEM_STATUS)
          ssg.setItem('auth',jsonDoc[0].MEM_AUTH)
          ssg.setItem('no',jsonDoc[0].MEM_NO)
          navigate('/')
          return//렌더링 종료
        }
        //구글 로그인은 했지만 false일 때
       
        //오라클 서버의 회원집합에 uid가 존재하지 않으면
        else{

        }
      }
      else{
        console.log('user정보가 없을 때')
        if(sessionStorage.getItem('email')){
          //sessionStorage에있는 값 모두 삭제
          sessionStorage.clear()
          window.location.reload()
        }
      }
    }
  },[dispatch])
  return (
    <>
    <div style={{height:'100vh'}}>
      {toastStatus.status&&<Toast/>}
    
     <Routes>
      <Route path = "/login" exact={true} element={<KhLoginPage authLogic={authLogic}/>}/>
      <Route path = "/" exact={true} element={<HomePage/>}/>
      <Route path = "/auth/signup" exact={true} element={<SignupPage authLogic={authLogic}/>}/>
      <Route path = "/repleboard" exact={true} element={<RepleBoardPage/>}/>
      <Route path = "/dept/:gubun" element={<DeptPage imageUploader={imageUploader}/>}/>
      {/* 컴포넌트 함수 호출 =마운트 컴포넌트함수가 가진 return 호출  */}
      <Route path = "/deptdetail/:deptno" element={<DeptDetail imageUploader={imageUploader}/>}/>
      <Route path = "/auth/kakao/callback" exact={true} element={<KakaoRedirectHandler/>}/>
      <Route path='/member' exact={true} element={<MemberPage imageUploader={imageUploader}/>}/>
      <Route path='/profile' exact={true} element={<Profile/>}/>
    </Routes>
      
    </div>
    </>
  );
}

export default App;
