import React from 'react'
import BlogHeader from '../include/BlogHeader'
import "bootstrap/dist/css/bootstrap.min.css";
import { ContainerDiv,HeaderDiv,FormDiv } from '../styles/FormStyle';
import KakaoMap from '../kakao/KakaoMap';
const HomePage = () => {
  return (
    <>
      <ContainerDiv>
      <BlogHeader/>
      <HeaderDiv>
        <h1 style={{marginLeft:"10px"}}>터짐블로그</h1>
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
