import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ContainerDiv, FormDiv, HeaderDiv } from '../styles/FormStyle';
import RepleBoardHeader from './RepleBoardHeader';
import RepleBoardFileDetail from './RepleBoardFileDetail';
import { qnaDetailDB, qnaListDB } from '../../service/dbLogic';
import BlogHeader from '../include/BlogHeader';
import BlogFooter from '../include/BlogFooter';

const KhQnADetailPage = ({authLogic}) => {
  const search = window.location.search;
  console.log(search);
  const page = search.split('&').filter((item)=>{return item.match('page')})[0]?.split('=')[1];
  console.log(page);
  const bno = search.split('&').filter((item)=>{return item.match('bno')})[0]?.split('=')[1];
  console.log(bno);
  const [detail, setDetail] = useState({});
  const[files, setFiles]= useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const boardDetail = async() => {
      const board = {
        qna_bno : bno
      }
      //상세보기 페이지에서는 첨부파일이 있는 경우에 fileList호출해야함
      //왜qnaListDBB에서는 못 가져오느느냐?? qna_bno를 결정 지을 수 없다
      //상세페이지는 한건만 가져온다 한건일때 qna_bno가 결정되는 게 맞아?
      //qna_bno가 있어야 file이들어있는 mblog_file클래스에서 조건검색이 가능
      //getAuth가 호출 됐을 때 
      
      const res = await qnaDetailDB(board);
      console.log(res.data);//빈배열만 출력됨
      //shift는 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환합니다
      const temp =JSON.stringify(res.data)//
      const jsonDoc = JSON.parse(temp)//배열로 바꿔주기
      console.log(jsonDoc[0])//qna-1row
      console.log(jsonDoc[1])//1.png
      console.log(jsonDoc[2])//2.png
      console.log(jsonDoc[3])//3.png
      console.log(jsonDoc[0].QNA_TITLE);
      console.log(jsonDoc[0].QNA_CONTENT);
      console.log(jsonDoc[0].MEM_NAME);
      console.log(jsonDoc[0].MEM_NO);
      console.log(jsonDoc[0].QNA_DATE);
      console.log(jsonDoc[0].QNA_HIT);
      console.log(JSON.parse(jsonDoc[0].QNA_SECRET));
      if(JSON.parse(jsonDoc[0].QNA_SECRET)){//boolean false이면
        if(sessionStorage.getItem('auth')!=='3'&&sessionStorage.getItem('no')!==JSON.stringify(jsonDoc[0].MEM_NO)) {
          //navigate(`/qna/list?page=1`);
          //return dispatch(setToastMsg("권한이 없습니다.")); 
        }
      }
      //이미지 파일을 담을 배열 선언
      const list=[]
      if(jsonDoc.length>1){
        for(let i=1;jsonDoc.length;i++){//0번자리에는 qna정보 들어있다 따라서 1 번부터다
          const obj = {
            FILE_NAME:jsonDoc[i].FILE_NAME
          }
          list.push(obj)
        }
      }
      setFiles(list)//list정보를 Files에 넣기
      setDetail({
        QNA_TITLE : jsonDoc[0].QNA_TITLE,
        QNA_CONTENT : jsonDoc[0].QNA_CONTENT,
        MEM_NAME : jsonDoc[0].MEM_NAME,
        MEM_NO : jsonDoc[0].MEM_NO,
        QNA_DATE : jsonDoc[0].QNA_DATE,
        QNA_HIT : jsonDoc[0].QNA_HIT,
        QNA_SECRET : JSON.parse(jsonDoc[0].QNA_SECRET),
        QNA_TYPE : jsonDoc[0].QNA_TYPE,
      });
    }
    boardDetail();
  },[setDetail,  setFiles , bno, dispatch, navigate])

  
  return (
    <>
      <BlogHeader authLogic={authLogic}/>
      <ContainerDiv>
        <HeaderDiv>
          <h3 style={{marginLeft:"10px"}}>QnA 게시글</h3>
        </HeaderDiv>
        <FormDiv>
          <RepleBoardHeader detail={detail} bno={bno}/>
          <section style={{minHeight: '400px'}}>
            <div dangerouslySetInnerHTML={{__html:detail.QNA_CONTENT}}></div>
          </section>
          <RepleBoardFileDetail files={files}/>
          <hr style={{height:"2px"}}/>
        </FormDiv>
        
      </ContainerDiv>
      <BlogFooter />
    </>
  );
};

export default KhQnADetailPage;