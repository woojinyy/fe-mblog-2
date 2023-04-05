import React, { useEffect, useState } from 'react'
import { Button,Container, Nav, Navbar } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link,useNavigate } from 'react-router-dom';
import { logout } from '../../service/authLogic'
//로그아웃버튼 추가
const BlogHeader = ({authLogic}) => { 
  const navigate =useNavigate()             
const [email,setEmail]=useState()
const auth = authLogic.getUserAuth()//firebase/auth에서 주입
useEffect(()=>{//의존성배열-useMemo,useCallback 효율성
  setEmail(sessionStorage.getItem("email"))//왜 일반변수가 아닌 상태훅에 관리?
},[])                                        //상태훅에 관리하면 화면에 즉시 반영
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/"className='nav-link'>TerrGYM</Link>
          <Nav className="me-auto">
            <Link to="/home" className='nav-link'>Home</Link>
            <Link to="/dept/0" className='nav-link'>부서관리</Link>
            <Link to="/reple/board" className='nav-link'>게시판</Link>
            <Link to="/qna/list" className='nav-link'>QnA게시판</Link>
          </Nav>
          {/* js와 jsx섞어쓰기 */}
          {email && <Button variant='primary' onClick={()=>{logout(auth); navigate('/login'); window.location.reload();}}>Logout</Button>}
        </Container>
      </Navbar>
    </>
  )
}

export default BlogHeader
