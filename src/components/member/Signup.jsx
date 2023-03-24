import  { useCallback, useState } from 'react'
import { ContainerDiv,HeaderDiv,FormDiv, BButton } from '../styles/FormStyle' 
import {memberInsertDB} from '../../service/dbLogic'
import { useNavigate } from 'react-router'

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
      mem_birthday,mem_birthday
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
            
            <hr style={{margin:'10px 0px 10px 0px'}}/>
            <BButton onClick={memberInsert}>회원가입</BButton>
          </div>
        </FormDiv>
      </ContainerDiv>
    </>
    
  )
}

export default Singup
