import React from 'react'
import BlogHeader from '../include/BlogHeader'
import "bootstrap/dist/css/bootstrap.min.css";
import { ContainerDiv,HeaderDiv,FormDiv } from '../styles/FormStyle';
import KakaoMap from '../kakao/KakaoMap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
const HomePage = ({authLogic}) => {
  const auth = authLogic.getUserAuth()
  const member = window.localStorage.getItem('member')
  const jsonDoc=JSON.parse(member)
  console.log(JSON.parse(member))
  const navigate = useNavigate()
  const handleLogin=()=>{
    console.log('로그인요청')
    navigate('/login')//버블링 이슈 잡자 어디에 써야해? prevent default
  }
  return (
    <>
      <ContainerDiv>
      <BlogHeader authLogic={authLogic}/>
      <HeaderDiv>
        <h1 style={{marginLeft:"10px"}}>터짐블로그</h1>
        <Button onClick={handleLogin}>로그인</Button>
      </HeaderDiv>
      <FormDiv>
        <div>이벤트존</div>
        <hr style={{height:"2px"}} />
        <div>추천 수업존</div>
        <hr style={{height:"2px"}}/>
        <div><KakaoMap/></div>
        <div>카카오맵존</div>
        <hr style={{height:"2px"}}/>


      </FormDiv>
      </ContainerDiv>
    </>
  )
}

export default HomePage
