import React from 'react'
import {  deptInsertDB } from '../../service/dbLogic'

const DeptUpdate = () => {
    const deptInsert=async()=>{
        const dept = {
            deptno:deptno,
            dname:dname,
            loc:loc,
            filename:files.filename,
            fileurl:files.fileurl
        }
    }
    const res = await deptInsertDB(dept)
      console.log(res+","+res.data)
      if(res.data){//성공
        console.log("부서등록 성공")
        handleClose()//모달창 닫기
        navigate("/dept/1")
      }
      else{//false
        console.log("부서등록 실패")
      //성공시 부서목록 새로고침 처리할 것 window.location.reload()쓰지말것 SPA(single page application )
      //useEffect 사용 의존성 배열을 연습할 수 있으니까 좋다!
      //부서목록 새로고침 처리
    }
  return (
    <>
      
    </>
  )
}

export default DeptUpdate
