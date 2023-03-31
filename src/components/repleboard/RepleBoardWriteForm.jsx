
import React, { useCallback, useRef, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {  qnaInsertDB, uploadFileDB } from '../../service/dbLogic'
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle'
import QuillEditor from './QuillEditor'
import RepleBoardFileInsert from './RepleBoardFileInsert'

  const RepleBoardWriteForm = () => {
      const no=sessionStorage(no)
      const navigate=useNavigate()
      const [title,setTitle]=useState("")//사용자가 입력한 제목 담기
      const [secret,setSecret]=useState("")//사용자가 입력한 비밀번호 담기
      const [content,setContent]=useState("")//사용자가 입력한 내용 담기(태그 포함된 값들)
      const [file_name,setFileName]=useState("")//이미지 아닌 첨부파일 이름 담기
      const [file_size,setFilesize]=useState("")//이미지 아닌 첨부파일 크기 담기
      //quilleditor이미지 선택하면 imageuploadDb타면 스프링프로젝트 pds이미지에 업로드
      //pds에 업로드 된 파일을 읽어서 Editor안에 보여줌 =imageGet?imageName=man1.png
      const [files,setFiles]=useState([])
  
      const quillRef=useRef()
      const fileRef=useRef()
    
    //사용자가 입력한 값을 useState에 초기화 하기
    const handleTitle=useCallback((e)=>{
      setTitle(e)
     },[])
     const handleSecret=useCallback((e)=>{
      setSecret(e)
     },[])
     const handleContent=useCallback((value)=>{//QuillEditor에 담김 태그포함된 정보
      setContent(value)
     },[])

     const boardInsert=async()=>{
   const board ={
      qna_bno:0,//오라클 자동채번하는 시퀀스 사용
      qna_title:title,
      qna_content:content,
      qna_secret:secret,
      qna_hit:0,
      qna_type:'양도',
      mem_no:no
     
  
   }
   const res = await qnaInsertDB(board)
   console.log(res)
   navigate('/board')
  }
  /*  const res = await boardInsertDB(board)//비동기는 await쓴다
      console.log(res)  
      navigate.replace("/board")
  } */
      
   
    const handleChange = async (event) => {
      console.log('첨부파일 선택'+event.target.value);
      //console.log(fileRef.current.value);
      //fileRef에서 가져온 값중 파일명만 담기
      const str = fileRef.current.value.split('/').pop().split('\\').pop()
      setFileName(str)
      console.log(str);
      //선택한 파일을 url로 바꾸기 위해 서버로 전달할 폼데이터 만들기
      const formData = new FormData()
      const file = document.querySelector("#file-input").files[0]
      formData.append("file_name", file)
      const res = await uploadFileDB(formData)
      console.log(res.data)
      const fileinfo = res.data.split(',')
      console.log(fileinfo)
      setFileName(fileinfo[0])
      setFileName(fileinfo[1])
    }
    const handleFiles = () => {

    }
      return (
      <>
           <ContainerDiv>
          <HeaderDiv>
            <h3 style={{marginLeft:"10px"}}>공지사항 글작성</h3>
          </HeaderDiv>
          <FormDiv>
            <div style={{width:"100%", maxWidth:"2000px"}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
                <h3>제목</h3> 
                <BButton onClick={()=>{boardInsert()}}>글쓰기</BButton>
              </div>
              <input id="dataset-title" type="text" maxLength="50" placeholder="제목을 입력하세요."
                style={{width:"100%",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleTitle(e.target.value)}}/>
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
                <h3>비밀번호</h3> 
              </div>              
              <input id="dataset-pw" type="text" maxLength="50" placeholder="비밀번호를 입력하세요."
                style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleSecret(e.target.value)}}/>
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
                <h3>첨부파일</h3> 
              </div>     
              <input id="file-input" name='file_name' ref={fileRef} type="file" maxLength="50" className="visuallyhidden" onChange={handleChange}/>            
              
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}></div>
              <h3>상세내용</h3>
              <hr style={{margin:'10px 0px 10px 0px'}}/>
              <QuillEditor value={content} handleContent={handleContent} quillRef={quillRef} files={files} />
              <RepleBoardFileInsert files={files}/>
            </div>
          </FormDiv>
        </ContainerDiv>
      </>
    )
  }

  export default RepleBoardWriteForm
