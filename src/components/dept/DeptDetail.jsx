import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal,  Card } from 'react-bootstrap'
import BlogHeader from '../include/BlogHeader'
import BlogFooter from '../include/BlogFooter'
import styled from 'styled-components'
import {  deptListDB } from '../../service/dbLogic'
import { useNavigate, useParams } from 'react-router'
import { MyInput, MyLabel,MyLabelAb } from '../styles/FormStyle'
import { validateDName } from '../../service/validateLogic'

const DivDeptBody=styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 20px;
`;
const DivUploadImg=styled.div`
    display:fldx;
    width:200px;
    height:250px;
    overflow:hidden;
    margin:10px auto;
`;
const Img = styled.img`
    widht:100%;
    height:100%;
    object-fit:cover;

`;

const DeptDetail = ({ImageUploader}) => {
    const validate = (key,e)=>{
        console.log('validate:'+key)
        let result;
        if(key==='dname'){
          result = validateDName(e);
        }
        setComment({...comment,[key]:result})
        if(result){
          if(result===""){
            setStar({...star,[key]:"*"})
          }else{
            setStar({...star,[key]:""})
          }
        }
      }
    const gubun = useParams()//Route path = "/boarddetail/:bm_no"
    //디폴트는 없고 부서등록이 성공하면 1을 돌려준다
    const handleClose=()=>setShow(false)
    const [dname,setDname]=useState("")
    const [loc,setLoc]=useState("")
    //Filename과 fielurl 두개라 객체로 선언
    const [files,setFiles]=useState({filename:null,fileurl:null})

    const [comment, setComment]=useState({
      deptno:"",
      dname:"",
      loc:"",
    })
    const [star, setStar]=useState({
      deptno:"*",
      dname:"*",
      loc:"*",
    })
    //사용자가 선택한 해시값으로 전달된 부서번호 가져오기
    //사용자가 부서번호를 선택할 때마다 변경된다useEffect에서 의존배열인자로 사용한다
    const {deptno}=useParams()
    //오라클서버에서 파라미터로 넘어오는 부서번호를 가지고 한건을 조회한 후 담기
    const [dept,setDept]=useState({
        DEPTNO:0,
        DNAME:"",
        LOC:"",
        FILENAME:"",
        FILEURL:"",
    })
    //deptDetail 컴포넌트가 마운트 될 때마다 주소번지가 바뀐다.
    //함수의 구현내용이 변화가 없는 경우라면 한 번 생성된 주소번지를 계속 가지고 있어도 된다
    //주소 기억해줘 cash메모리에  필요할 때 새로 생성하지 않고 cash에 있는 함수를 불러줘 
    //이럴 때 useCallback을 사용한다
      const handleDname = useCallback((value)=>{
        console.log(value)
        setDname(value)
      },[])
      //useCallback사용 안하면 DeptDetail 마운트 될 때 마다 주소번지가 바뀐다(초기화발생도니다) -비효율적
    const handleLoc = useCallback((value)=>{
        console.log(value)
        setLoc(value)
      },[])
    const navigate=useNavigate()
    //수정화면 Modal Mount여부 결정 false 안보임 true보임
    const [show,setShow]=useState(false)
    const handleShow = ()=>setShow(true)
    const deptDelete = ()=>{
    }//end of deptDelete
    //의존배열
    useEffect(()=>{
        const asyncDB= async()=>{
            const res = await deptListDB({deptno:deptno})
            console.log(res.data)
            const result =JSON.stringify(res.data)
            const jsonDoc= JSON.parse(result)
            console.log(jsonDoc[0].LOC)
            setDept({
                DEPTNO:jsonDoc[0].DEPTNO,
                DNAME:jsonDoc[0].DNAME,
                LOC:jsonDoc[0].LOC,
                FILENAME:jsonDoc[0].FILENAME,
                FILEURL:jsonDoc[0].FILEURL,
            });
        }
        asyncDB()
        
        //읽어서 useState에 담아주기
    },[deptno])//deptno가 바뀔 때마다 함수 실행(=렌더링)해야하기 때문에 파라미터로 deptno가져와
    if(!dept.FILEURL){
        dept.FILEURL="http://via.placeholder.com/200X250"
    }
    //목록조회 이동
    const deptList=()=>{
        navigate('/dept/0')
    }

    return (
    <>
    <BlogHeader/>
        <div className='container'>
            <div className="page-header">
                <h2>부서관리&nbsp;<i className='fa-solid fa-angles-right'></i>&nbsp;<small>부서목록</small></h2>
                <hr />
	        </div>      
            <Card style={{width:'59rem'}}>
                <Card.Body>
                <Card.Img style={{width:'250px'}} src={`${dept.FILEURL}`} alt="Card image" />
                <DivDeptBody>
                    <Card.Text>{dept.DEPTNO}</Card.Text>
                    <Card.Title>{dept.DNAME}</Card.Title>
                    <Card.Text>{dept.LOC}</Card.Text>
                </DivDeptBody>
                </Card.Body>
                <div>
                    <Button onClick={handleShow}>수정</Button>
                    &nbsp;
                    <Button onClick={deptDelete}>삭제</Button>
                    &nbsp;
                    <Button onClick={deptList}>부서목록</Button>
                    &nbsp;
                </div>
            </Card>
        </div>
        {/* ========================== [[ 부서정보수정 Modal ]] ========================== */}
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
            <Modal.Title>부서정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style= {{display:'flex',flexWrap:"wrap",justifyContent:"center"}}>
            <div style={{display:"flex"}}>
                <MyLabel>부서번호<span style={{color:'red'}}>{star.deptno}</span>
                <MyInput type="text" id="deptno" placeholder="Enter 부서번호" value={deptno}/>           
                <MyLabelAb>{comment.deptno}</MyLabelAb>
                </MyLabel>
            </div>
            <div style={{display:"flex"}}>
                <MyLabel>부서명<span style={{color:'red'}}>{star.deptno}</span>
                <MyInput type="text" id="dname" placeholder="Enter 부서명"  onChange={(e)=>{handleDname(e.target.value);validate('dname',e);}}/>
                <MyLabelAb>{comment.dname}</MyLabelAb>
                </MyLabel>
            </div>
            <div style={{display:"flex"}}>
                <MyLabel>부서명<span style={{color:'red'}}>{star.deptno}</span>
                <MyInput type="text" name="loc" placeholder="Enter 지역"  onChange={(e)=>{handleLoc(e.target.value)}}/>
                <MyLabelAb>{comment.loc}</MyLabelAb>
                </MyLabel>
            </div>
          <Form.Group className="mb-3" controlId="formBasicOffice">
            <Form.Label>사진</Form.Label>
              <input className="form-control" type="file" accept='image/*' id="dimg" name="dimg" onChange={imgChange}/>
          </Form.Group>
          <DivUploadImg id="uploadImg">
            <Img src="http://via.placeholder.com/200X250" alt="미리보기" />
            
          </DivUploadImg>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={deptInsert}>{/* 함수는 소문자 컴포넌트는 대문자 */}
            저장
          </Button>
        </Modal.Footer>
      </Modal>     
      {/* ========================== [[ 부서정보수정 Modal 끝 ]] ========================== */}
    <BlogFooter/>
    </>
  )
}

export default DeptDetail
