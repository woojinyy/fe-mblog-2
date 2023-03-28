import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setToastMsg } from '../../redux/toastStatus/action'
import { loginGoogle } from '../../service/authLogic'
import './loginpage.css'

const LoginPage = () => {
  //dispatch =허브 oneway binding에서 액션을 스토어에 전달할 때 dispatch사용한다
  const dispatch=useDispatch()
  //store에 초기화 된 state안에 담긴 data꺼내올 때 사용
  const userAuth=useSelector(store=>store.userAuth)
  const navigate= useNavigate()
  const auth =useSelector((store)=>store.userAuth.auth)
  console.log(auth)
  const googleProvider =useSelector((store)=>store.userAuth.googleProvider)
  console.log(googleProvider)
    const handleGoogle =async (event) => {
      event.preventDefault()
      try {
        //결과값 받아와서 사용자정보uid 유지
        //비동기처리
        const result =await loginGoogle(auth,googleProvider) 
        console.log(result.uid)
        //uid값 sessionstorage에 담기
        window.sessionStorage.setItem('userId',result.uid)
        navigate('/')
      } catch (error) {
        //payload로 error넘기기
        dispatch(setToastMsg(error+":로그인오류 입니다."))//[objet,object]로 찍히는데
        //JSON.stringify()로 문자열로 바꿔서 출력하게 되어있다
        
      }
      } //end of handleGoogle    
  return (
    <>
    <div className="bg"></div>
    <form className="login__form" action="">
      <h1>로그인</h1>
      <p>신규 사용자이신가요? <Link to="#">계정 만들기</Link></p>
      <label htmlFor="useremail">이메일 주소
        <input type="email" id="useremail" placeholder="이메일 주소를 입력해주세요."/>
      </label>
      <input type="submit" className="btn__submit" value="계속" />
      <div className="divider">
        <hr />
        <span>또는</span>
      </div>
      <button className="btn__google" onClick={handleGoogle}>
        <i className="icon icon-google"></i>Google으로 계속
      </button>
      <button className="btn__facebook">
        <i className="icon icon-facebook"></i>Facebook으로 계속
      </button>
      <p className="captcha__text">
        reCAPTCHA로 보호되며 Google <Link to="#">개인정보보호 정책</Link> 및
        <Link to="#">서비스 약관</Link>의 적용을 받습니다.
      </p>
      </form>
    </>
  )
}

export default LoginPage