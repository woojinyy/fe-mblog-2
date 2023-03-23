import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

const BlogHeader = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/"className='nav-link'>TerrGYM</Link>
          <Nav className="me-auto">
            <Link to="/home" className='nav-link'>Home</Link>
            <Link to="/dept/0" className='nav-link'>부서관리</Link>
            <Link to="/repleboard" className='nav-link'>게시판</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default BlogHeader
