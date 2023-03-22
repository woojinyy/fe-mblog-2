import { Route, Routes } from 'react-router';
import './components/css/style.css';
import MemberPage from './components/page/MemberPage';
import LoginPage from './components/auth/LoginPage'
import Profile from './components/kakao/Profile'
import HomePage from './components/page/HomePage'
import KakaoRedirectHandler from './components/kakao/KakaoRedirectHandler';
import DeptPage from './components/page/DeptPage';

function App({imageUploader}) {
  return (
    <>
     <Routes>
      <Route path = "/" exact={true} element={<LoginPage/>}/>
      <Route path = "/home" exact={true} element={<HomePage/>}/>
      <Route path = "/dept/:gubun" element={<DeptPage imageUploader={imageUploader}/>}/>
      <Route path = "/auth/kakao/callback" exact={true} element={<KakaoRedirectHandler/>}/>
      <Route path='/member' exact={true} element={<MemberPage imageUploader={imageUploader}/>}/>
      <Route path='/profile' exact={true} element={<Profile/>}/>
    </Routes>
    </>
  );
}

export default App;
