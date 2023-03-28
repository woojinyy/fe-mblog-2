import { Route, Routes } from 'react-router';
import './components/css/style.css';
import MemberPage from './components/page/MemberPage';
import LoginPage from './components/auth/LoginPage'
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
function App({authLogic,imageUploader}) {
  const dispatch = useDispatch()
  const toastStatus = useSelector(state=>state.toastStatus)
  useEffect(()=>{
    //시그널보내
    dispatch(setToastMsg('회원가입 하세요'))
  },[])
  return (
    <>
    <div style={{height:'100vh'}}>
      {toastStatus.status&&<Toast/>}
    
     <Routes>
      <Route path = "/login" exact={true} element={<LoginPage/>}/>
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
