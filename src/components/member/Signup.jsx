/* global daum */
import  { useCallback, useState } from 'react'
import { ContainerDiv,HeaderDiv,FormDiv, BButton } from '../styles/FormStyle' 
import {memberInsertDB} from '../../service/dbLogic'
import { useNavigate } from 'react-router'
import { Button } from 'react-bootstrap'

//회원가입페이지
const Singup = () => {//컴포넌트함수
  //useXXXX 훅이라한다 함수형프로그래밍에 대한 이점으로 훅을 지원하게 되었다.
  //클래스(this이슈)지원에서 함수형으로 진화
  const navigate = useNavigate()
  const [mem_uid,setMemuid]=useState("")
  const [mem_pw,setMempw]=useState("")
  const [mem_name,setMemname]=useState("")
  const [mem_nickname,setMemnickname]=useState("")
  const [mem_email,setMememail]=useState("")
  const [mem_tel,setMemtel]=useState("")
  const [mem_gender,setMemgender]=useState("")
  const [mem_birthday,setMembirthday]=useState("")
  const [mem_zipcode,setMemZipcode]=useState("")
  const [mem_addr,setMemaddr]=useState("")
  const [post,setPost]=useState({
    zipcode:"",
    addr:"",
    addrDetail:"",
  })
  
  //Post @RequestBody{}-> Map or VO 비동기처리 Promise(resolve(성공),reject(실패))
  //async - awiat
  const memberInsert=async()=>{
    
    const member ={
      mem_uid:mem_uid,
      mem_pw:mem_pw,
      mem_name:mem_name,
      mem_nickname:mem_nickname,
      mem_email:mem_email,
      mem_tel:mem_tel,
      mem_gender:mem_gender,
      mem_birthday:mem_birthday,
      mem_zipcode:mem_zipcode,
      mem_addr:mem_addr,
    }
    
    const res = await memberInsertDB(member)//비동기는 await쓴다
       console.log(res)  
       if(!res.data){
         console.log("회원가입 실패")
        }else{
          console.log("회원가입성공")
          navigate("/login")
       }
   }
  //사용자가 입력한 값을 useState에 초기화하기
  const handleID=useCallback((e)=>{
    setMemuid(e)
   },[])
  const handlePW=useCallback((e)=>{
    setMempw(e)
   },[])
  const handleName=useCallback((e)=>{
    setMemname(e)
   },[])
  const handleNickName=useCallback((e)=>{
    setMemnickname(e)
   },[])
  const handleEmail=useCallback((e)=>{
    setMememail(e)
   },[])
  const handleTel=useCallback((e)=>{
    setMemtel(e)
   },[])
  const handleGender=useCallback((e)=>{
    setMemgender(e)
   },[])
  const handleBirthday=useCallback((e)=>{
    setMembirthday(e)
   },[])
   const handleZipcode=useCallback((e)=>{
    setMemZipcode(e)
   },[])
   const handleAddr=useCallback((e)=>{
    setMemaddr(e)
   },[])
   const handleAddrDtl=useCallback((e)=>{
    setPost(e)
   },[])

   const searchAddr=(event)=>{
    event.preventDefault()//이벤트버블링방지
  
    new daum.Postcode({
        oncomplete: function(data) {
          let addr=""
          if (data.userSelectedType==='R'){
            addr=data.roadAddress;//도로명
          }
           else{
            addr=data.jibunAddress;//지번
           }
           console.log(data)//전체주소 한글+영어
           console.log(addr)//주소정보만
           setPost({...post,zipcode: data.zonecode,addr:addr})//깊은복사 기존의 참조관계를 끊는다
           document.querySelector("#mem_zipcode").value=data.zonecode//화면에 자동 입력처리
           document.querySelector("#mem_addr").value=addr//선택한 주소정보를 input컴포넌트에 자동입력 처리
           document.querySelector("#mem_addr_dtl").focus()//addr입력되었을 때 커서 넘기기
        }
    }).open();
   }
  return (
    <>
    <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>회원가입</h3>
        </HeaderDiv>
        <FormDiv>
          <div style={{width:"100%", maxWidth:"2000px"}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>아이디</h4> 
            </div>
            <input id="mem_id" type="text" maxLength="50" placeholder="ID를 입력하십시오."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleID(e.target.value)}} />
              
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>비밀번호</h4> 
            </div>
            <input id="mem_pw" type="text" maxLength="50" placeholder="비밀번호를 입력하십시오."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handlePW(e.target.value)}}/>
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>비밀번호확인</h4> 
            </div>
            <input id="mem_pw2" type="text" maxLength="50" placeholder="비밀번호를 확인하십시오."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}}/>
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>이름</h4> 
            </div>      
            <input id="mem_name" type="text" maxLength="50" placeholder="이름을 입력하십시오."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleName(e.target.value)}}/>
            
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>닉네임</h4> 
            </div>      
            <input id="mem_nickname" type="text" maxLength="50" placeholder="별멍을 입력하십시오."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleNickName(e.target.value)}}/>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>E-mail</h4> 
            </div>      
            <input id="mem_email" type="text" maxLength="50" placeholder="E-mail을 입력하십시오."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleEmail(e.target.value)}} />

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>전화번호</h4> 
            </div>      
            <input id="mem_tel" type="text" maxLength="50" placeholder="전화번호를 입력하십시오."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}}onChange={(e)=>{handleTel(e.target.value)}} />

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>성별</h4> 
            </div>      
            <input id="mem_gender" type="text" maxLength="50" placeholder="성별을 입력하십시오."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}}onChange={(e)=>{handleGender(e.target.value)}} />

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>생년월일</h4> 
            </div>      
            <input id="mem_birthday" type="text" maxLength="50" placeholder="생년월일을 입력하십시오."
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleBirthday(e.target.value)}} />

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>우편번호</h4> 
            </div>      
            <input id="mem_zipcode" type="text" maxLength="50" placeholder="우편번호 입력"
              style={{width:"200px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleZipcode(e.target.value)}} />
           
           <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>주소검색</h4> 
            </div>      
            <input id="mem_addr" type="text" maxLength="50" placeholder="주소를 입력하십시오"
              style={{width:"350px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleAddr(e.target.value)}} />
           
            <Button onClick={searchAddr}>주소검색</Button>

            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'5px'}}>
              <h4>상세주소</h4> 
            </div>      
            <input id="mem_addr_dtl" type="text" maxLength="50" placeholder="상세주소를 입력하십시오" readOnly={postMessage.addr?false:true}
              style={{width:"350px",height:'40px' , border:'1px solid lightGray', marginBottom:'5px'}} onChange={(e)=>{handleAddrDtl(e.target.value)}} />

            <hr style={{margin:'10px 0px 10px 0px'}}/>
            <BButton onClick={memberInsert}>회원가입</BButton>
          </div>
        </FormDiv>
      </ContainerDiv>
    </>
    
  )
}

export default Singup
