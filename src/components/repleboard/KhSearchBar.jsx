import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BButton } from '../styles/FormStyle';
import MyFilter from './MyFilter';
const KhSearchBar = () => {
  //사용자가 입력한 문자열 담기
  const[content, setContent]= useState('');
  const[types]= useState(['제목','내용','작성자']);
  const location = useLocation();
  const search = decodeURIComponent(location.search);
  const navigate = useNavigate();
  //제목 내용 작성자 중에 한가지
  const[tTitle, setTTitle]= useState('제목');

  const handleTTitle = useCallback((e) => {
    //console.log(e);사용자가 선택한 콤보박스명 제목,내용,작성자
    setTTitle(e);
  },[]) 

  useEffect(() => {
    console.log('effect');
    search.split('&').forEach((item)=>{
      console.log(item)//>condeition제목
      //요청url에 담긴 condition 정보를 setTTitle에 초기화
      if(item.match('condition')){
      setTTitle(item.split('=')[1])
      }
    })

  },[search,setTTitle])//의존배열에 search를 사용, 상태훅을 선택
  //정보가 바뀔 때마다 호출


  const setPath = () => {
    console.log(tTitle,content)
    console.log(search)
    //자바스크립트에서는 '' "로 묶지 않으면 변수취급
    console.log(search.match('condition'))
    let path;
    //앞에서 조회한 내용이 있을 때 기존에 쿼리스트링 삭제후 다시 쿼리스트링 만들어야함
    if(search.match('condition')){
      path = location.pathname+
      search.replace(
        `&${search.split('&').filter((item)=>{return item.match('page')})}&${search.split('&').filter((item)=>{return item.match('content')})}`,
        `&condition=${tTitle}&content=${content}`
        ).replace(`&${search.split('&').filter((item)=>{return item.match('page')})}`,'&page=1&')
    }else{
      path = location.pathname+search+`?condition=${tTitle}&content=${content}`
    }
    console.log(path)
    return path;
  }

  return (
    <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
      <MyFilter types={types} title={tTitle} id={"condition"} handleTitle={handleTTitle}/>
      <input type="text" value={content} style={{maxWidth: "600px", width: "40%", height:"40px",
        margin: "0px 10px 0px 10px", border:"1px solid lightgray", borderRadius:"10px"}}
        onChange={(e)=>{setContent(e.target.value);}}
        />
      <BButton style={{width: "70px", height:'40px', marginRight:"10px"}} onClick={()=>{navigate(setPath())}}>검색</BButton>
      <BButton style={{width: "70px", height:'40px'}} onClick={()=>{navigate(`/qna/list?page=1`); setContent('');}}>초기화</BButton>
    </div>
  );
};

export default KhSearchBar;