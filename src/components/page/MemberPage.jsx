import React, { useEffect, useState } from 'react'
import { jsonMemberListDB } from '../../service/dbLogic'

const MemberPage = ({imageUploader}) => {
    const[member,setMember]=useState({})
useEffect(()=>{
    const memberList=async()=>{
        console.log("memberList호출")
        const res=await jsonMemberListDB(member)
        console.log(res.data)
    }
    memberList()
  
    
},[])
//async는 비동기 처리시 사용
const imgChange = async(event)=>{
  console.log(event.target.files[0])
  //async가 붙은 함수안에서만 await을 사용 할 수 있다 파일이 업로드 될 때까지 기다린다
  
  const uploaded = await imageUploader.upload(event.target.files[0])/* 함수 호출 시 업로드 이벤트 발생 */
  //public_id -선택한 이미지의 실제아이디가 아닌 cloudinary에서 부여하는 아이디값
  //이 값으로 실제 이미지링크 정보가 생성된다
  //format은 선택한 파일의 확장자
  //url 링크이미지URL정보
  console.log(`${uploaded.public_id}${uploaded.format}${uploaded.url}`)
}
  return (
    <>
        회원관리페이지
        <input type="file"name ="ming" id = "ming" onChange={imgChange} />
    </>
  )
}

export default MemberPage
