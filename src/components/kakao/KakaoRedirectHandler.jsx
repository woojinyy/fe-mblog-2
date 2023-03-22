/*  */
import axios from 'axios'
import React, { useEffect } from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

const KakaoRedirectHandler = () => {
  //location.href나 sendRedirect대신 사용
  const navigate = useNavigate()
  
  
    //카카오 서버에서 돌려주는 URL뒤에 쿼리스트링 가져오기
    let params = new URL(document.location).searchParams;
    let code = params.get("code"); // is the string "Jonathan Smith".
    console.log(code)
    //카카오 서버에서 돌려주느 URL뒤에 쿼리스트링 가져오기 mdn searchParams restAPI방식
    //서블릿 request.getParameter("code")
    const grant_type="authorization_code"
    const redirect_uri="http://localhost:3000/auth/kakao/callback"
    const getToken = async()=>{
      const payload = qs.stringify({
            grant_type:grant_type,
            client_id:process.env.REACT_APP_KAKAO_API_KEY,
            redirect_uri:redirect_uri,
            code:code
        });
        try {
            const res = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                payload
            )
            window.Kakao.init("REACT_APP_KAKAO_API_KEY")
            console.log(res.data.access_token)
            window.Kakao.Auth.setAccessToken(res.data.access_token);            

            navigate("/profile")//index.js ->App.jsx 라우트에 등록 되어있어야한다
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect( ()=>{
      getToken()
    });
  return (
    <div>
      {/* 아무의미없는 화면 거쳐서 다른 화면으로 이동하니까
      rootcontext- 인증되면 /home으로  route에 설정해놨다 */}
      {code}
    </div>
  )
}

export default KakaoRedirectHandler
