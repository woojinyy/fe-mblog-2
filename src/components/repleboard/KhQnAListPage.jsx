import React from 'react'
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { qnaListDB } from '../../service/dbLogic';
import BlogFooter from '../include/BlogFooter';
import BlogHeader from '../include/BlogHeader';
import { BButton, ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle';
import KhMyFilter from './KhMyFilter';
import KhSearchBar from './KhSearchBar';
import MyPagination from './MyPagination';

const KhQnAListPage = ({authLogic}) => {
  // 페이징 처리 시에 현재 내가 바라보는 페이지 정보 담기
  let page = 1
  // 화면전환 시 필요한 훅
  const navigate = useNavigate();
  // URL주소에 한글이 있을 때
  const search = decodeURIComponent(useLocation().search);
  // 오라클 서버에서 받아온 정보 담기
  // {} : 객체리터럴이다 - 클래스
  const [listBody,setListBody] = useState([]);  // 배열 타입 [{},{},{}] -> List<Map>, List<VO>
  // qna_type구분 상수값 - 라벨
  const[types]= useState(['전체','일반','결제','양도','회원','수업']);
  // qna_type 상태관리 위해 선언
  const [tTitle, setTTitle] = useState('전체') 
  // 함수 메모이제이션 해준다 - useCallback -> useMemo는 값을 메모이제이션
  const handleTTitle = useCallback((element) => {
    // 파라미터로 받은 값을 저장 - tTitle
    setTTitle(element);
  },[]);  // 의존배열이 비었으므로 한 번 메모이제이션 된 함수값을 계속 기억해둔다

  // 일반함수 정의하는 것과 useEffect에서 정의하는 것 사이의 차이점에 대해 나는 설명할 수 있다
  // async 있고 없고는 고려대상이 아니다 await은 논외
  useEffect(() => {
    const qnaList = async() =>{
      // 콤보박스 내용 -> 제목, 내용, 작성자 중 하나
      // 사용자가 입력한 키워드
      // http://localhost:3000/qna/list?condition=제목%7C내용%7C작성자&content=입력한값
      // [0] : ?condition = 제목|내용|작성자
      // [1] : content = 입력한값
      const condition = search.split('&').filter((item) => { return item.match('condition') })[0]?.split('=')[1];
      const content = search.split('&').filter((item) => { return item.match('content') })[0]?.split('=')[1];
      const qna_type = search.split('&').filter((item) => { return item.match('qna_type') })[0]?.split('=')[1];
      console.log(qna_type);    // '수업' 저장된다
      console.log('condition: ' + condition + ', content: ' + content);

      // 쿼리스트링이 없으면 그냥 '전체'가 담긴다
      setTTitle(qna_type||'전체');

      // GET방식 조건검색 - params속성에 들어갈 변수
      const board = {
        page: page,
        qna_type: qna_type,     // 요소가 스프링엔 소문자이므로 동일하게 소문자
        condition: condition,
        content: content,
      }

      const res = await qnaListDB(board);
      console.log(res.data);

      const list = [];

      const datas = res.data;
      datas.forEach((item, index) => {
        console.log(item)   // 3번 출력

        const obj = {
          qna_bno: item.QNA_BNO,
          qna_type: item.QNA_TYPE,
          title: item.QNA_TITLE,
          mem_name: item.MEM_NAME,
          qna_date: item.QNA_DATE,
          qna_hit: item.QNA_HIT,
          qna_secret : JSON.parse(item.QNA_SECRET), // 문자열"false" -> false가 된다
          file: item.FILE_NAME,
          comment: item.COMM_NO,
        }

        list.push(obj);
      })
      // 데이터 셋에 변화에 따라 리렌더링 할 것과 기존에 DOM을 그냥 출력하는 것 - 비교 알고리즘
      setListBody(list);  // listBody[1] - 일반변수로 선언하는 것과 훅을 선언하는 것과의 차이점에 대해 설명 할 수 있다
    }

    qnaList();
  },[setListBody, setTTitle,  page, search]);

  //listItemsElements 클릭이벤트 처리시 사용
  const getAuth = (listItem) => {
    console.log(listItem);
    console.log(listItem.qna_bno)
    console.log(listItem.qna_secret)
    
    if (listItem.qna_secret === false) {
      navigate(`/qna/detail?qna_bno=${listItem.qna_bno}`)
    } else {
      console.log("권한이 없습니다. | 비공개입니다.")
    }
  }


  
  const listHeaders = ["글번호","분류","제목", "작성자", "등록일", "조회수"];
  const HeaderWd = ["8%","8%","50%", "12%", "12%", "10%"];

  // listBody는 상태 훅이다
  const listHeadersElements = listHeaders.map((listHeader, index) => 
  listHeader==='제목'?
    <th key={index} style={{width:HeaderWd[index], paddingLeft:"40px"}}>{listHeader}</th>
    :
    <th key={index} style={{width:HeaderWd[index], textAlign: 'center'}}>{listHeader}</th>
  )

  const listItemsElements = listBody.map((listItem, index) => {
    console.log(listItem);
    return (
      <tr key={index} onClick={()=>{getAuth(listItem)}}>
        { Object.keys(listItem).map((key, index) => (
          key==='secret'||key==='no'||key==='file'||key==='comment' ? null
          :
            key==='date' ?
              <td key={index} style={{fontSize:'15px', textAlign: 'center'}}>{listItem[key]}</td>
            :
              key==='title' ?
                <td key={index}>            
                  {isNaN(listItem.file)&&<span><i style={{width:"15px", height:"15px"}} className={"fas fa-file-lines"}></i></span>}
                  {!isNaN(listItem.file)&&<span><i style={{width:"15px", height:"15px"}} className={"fas fa-image"}></i></span>}
                  &nbsp;&nbsp;{listItem[key]}
                  {listItem.comment?<span style={{fontWeight:"bold"}}>&nbsp;&nbsp;[답변완료]</span>:<span>&nbsp;&nbsp;[미답변]</span>}
                  {listItem.qna_secret&&<span>&nbsp;&nbsp;<i className="fas fa-lock"></i></span>}
                </td>
              :
                <td key={index} style={{textAlign: 'center'}}>{listItem[key]}</td>
        ))}  
      </tr>
    )
  })



  return (
    <>
      <BlogHeader authLogic={authLogic}/>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>QnA 게시판</h3>
        </HeaderDiv>
        <FormDiv>
          <div>
            <div style={{display:"flex", justifyContent:"space-between", height:"40px"}}>
              <KhMyFilter types={types} type={true} id={"qna_type"} title={tTitle} handleTitle={handleTTitle}/>
              {
                // 사용자 권한이 'teacher'일 경우 글쓰기 버튼이 생성된다
                sessionStorage.getItem('auth')==='member'&&
                <BButton style={{width:"80px", height:"38px"}} onClick={()=>{navigate(`/qna/write`)}}>글쓰기</BButton>
              }
            </div>
            <Table responsive hover style={{minWidth:"800px"}}>
              <thead>
                <tr>
                  {listHeadersElements}
                </tr>
              </thead>
              <tbody>
                {listItemsElements}
              </tbody>
            </Table>
          </div>
          <div style={{margin:"10px", display:"flex",flexDirection:"column" ,alignItems:"center" , justifyContent:"center" , width:"100%"}}>
            <MyPagination page={page} path={'/qna/list'}/>
            <KhSearchBar />
          </div>
        </FormDiv>
      </ContainerDiv>
      <BlogFooter />	
    </>
  );
};

export default KhQnAListPage;