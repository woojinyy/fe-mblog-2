import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import { deptInsertDB, deptListDB } from '../../service/dbLogic'
import { validateDName } from '../../service/validateLogic'
import '../css/style.css'
import DeptRow from '../dept/DeptRow'
import BlogHeader from '../include/BlogHeader'
import { MyInput, MyLabel,MyLabelAb } from '../styles/FormStyle'
import styled from 'styled-components'
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

const DeptPage = ({imageUploader}) => {

    
    const navigate = useNavigate()//화면 전환시 가급적 전체페이지 리로딩을 하지않아야 필요한것만 하자
    //Nvigate 훅을 사용하면 해결
    const gubun = useParams()//Route path = "/boarddetail/:bm_no"
    //디폴트는 없고 부서등록이 성공하면 1을 돌려준다
    const [deptList, setDeptList]=useState([])
    const [show,setShow]=useState(false)
    const handleClose=()=>setShow(false)
    const handleShow=()=>setShow(true)
    const [deptno,setDeptno]=useState(0)
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
    //유효성체크 함수 선언
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
    const handleDeptno = useCallback((value)=>{
      console.log(value)
      setDeptno(value)
    },[])
    const handleDname = useCallback((value)=>{
      console.log(value)
      setDname(value)
    },[])
    const handleLoc = useCallback((value)=>{
      console.log(value)
      setLoc(value)
    },[])
    
    //조건 검색 구현
    const reactSearch=()=>{
      //select 콤보에서 선택한 값을 담는 코드
      const gubun = document.querySelector('#gubun').value
      //조건검색에 필요한 문자열을 담아주는 변수
      const keyword = document.querySelector('#keyword').value//검색어를 입력하세요에 키워드에 들어가는 
      console.log(gubun+","+keyword)
      const asyncDB= async ()=>{
        const res = await deptListDB({gubun,keyword,deptno:0})//초기화
        console.log(res.data)
        if(res.data){
          //data 담기
          setDeptList(res.data)
        }
      }
      asyncDB()
    }
    //부서 목록 가져오기
  
    //부서목록 json포맷가져오기
    const jsonDeptList=async()=>{
      const res = await deptListDB({deptno:0})//초기화
      console.log(res.data)
      if(res.data){
        //data 담기
        setDeptList(res.data)
      }
      else{
        console.log("부서목록조회실패")
      }
    }
  
   //이미지 파일 첨부 구현
    const imgChange=async(event)=>{
     //비동기처리
      console.log(event.target.files[0])
      const uploaded = await imageUploader.upload(event.target.files[0])
      console.log(uploaded)
      //정보 호출
      setFiles({
      filename : uploaded.public_id+","+uploaded.format,
      fileurl : uploaded.url,
      })
    //input의 이미지 객체 얻어오기
      const upload =document.querySelector("#dimg")
      //이미지를 집어 넣을 곳의 부모태그
      const holder = document.querySelector("#uploadImg")
      const file = upload.files[0]
      const reader = new FileReader()
      reader.onload=(event)=>{
      const img = new Image()
      img.src = event.target.result
      if(img.width>150){
      img.width=150
      }
      holder.innerHTML="";
      holder.appendChild(img)
      }
      reader.readAsDataURL(file)
      return false
    }
   //부서 등록 구현//저장버튼 눌렀을 때 insert event처리
   //spring boot 와 리액트 연동하기 @RequestBody사용 JSON 포맷으로 넘기기
    const deptInsert=async()=>{
      const dept = {
        deptno:deptno,
        dname:dname,
        loc:loc,
        filename:files.filename,
        fileurl:files.fileurl
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
  }

  useEffect(()=>{
    jsonDeptList()
  },[gubun])//의존성 배열이 빈배열이면 최초 한번만 배열값(반드시 전역변수)이 변하면 변할 때 마다 요청을 새로 보냄


  return (
    <>
      <BlogHeader/>
      <div className='container'>
        <div className="page-header">
        <h2>부서관리&nbsp;<i className='fa-solid fa-angles-right'></i>&nbsp;<small>부서목록</small></h2>

        <hr />
	    </div>      
      <div className="row">
        <div className="col-3">
          <select id="gubun" className="form-select" aria-label="분류선택">
            <option defaultValue>분류선택</option>
            <option value="deptno">부서번호</option>
            <option value="dname">부서명</option>
            <option value="loc">지역</option>
          </select>			
        </div>
		    <div className="col-6">
			    <input type="text" id="keyword" className="form-control" placeholder="검색어를 입력하세요" 
                 aria-label="검색어를 입력하세요" aria-describedby="btn_search" />
		    </div>
		    <div className="col-3">
			    <Button variant='danger' id="btn_search" onClick={reactSearch}>검색</Button>
		    </div>
	     </div> 
      <div className='book-list'>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>부서번호</th>
              <th>부서명</th>
              <th>지역</th>
            </tr>
          </thead>
          <tbody>
          {deptList.map(dept => (
            <DeptRow key={dept.DEPTNO} dept={dept} />
          ))}
          </tbody>
        </Table> 
        <hr />    
        <div className='booklist-footer'>
          <Button variant="warning" onClick={jsonDeptList}>
            전체조회
          </Button>&nbsp; 
          <Button variant="success" onClick={handleShow}>
            부서등록
          </Button> 
        </div>
    </div>
    </div>
    {/* ========================== [[ 도서등록 Modal ]] ========================== */}
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>부서등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style= {{display:'flex',flexWrap:"wrap",justifyContent:"center"}}>
          
          <div style={{display:"flex"}}>
            <MyLabel>부서번호<span style={{color:'red'}}>{star.deptno}</span>
            <MyInput type="text" id="deptno" placeholder="Enter 부서번호" onChange={(e)=>{handleDeptno(e.target.value)}}/>           
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
    </>
  )
}

export default DeptPage
