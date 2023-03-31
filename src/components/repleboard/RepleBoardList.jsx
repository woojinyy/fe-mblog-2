import React, { useState } from 'react'
import { qnaListDB } from '../../service/dbLogic'

const RepleBoardList = () => {
  const [board,setBoard]=useState({
    cb_gubun:'qna_title',
    keyword:'언제끝나나요'
  })
  //useeffect
  //의존성 배열을 통해 랜더링 되는 시간을 정할 수 있다 
  /* 고려사항 상위 컴포넌트에서 하위컴포넌트로만  props전달이 가능한점
  일반적으로는 가급적 상위 컴포넌트에 두는 것을 추천
  리렌더링 1props,2state,3부모  미묘한 문제 useEffect useMemo(값) useCallback(함수) 의존성 배열을 갖는다
  [] 빈배열 처음 한번만 실행 
   의존성배열이 없으면 코딩 할 때마다 호출된다 렌더링 된다 
   의존성 배열에 입력한 변수가 바뀔 떄마다 호출 다중처리 가능
   주의 : 전역변수만 가능하다*/
   const [boards,setBoards ]=useState([{}])
  useEffect(()=>{
    const qnaList=async()=>{//비동기처리
        console.log("qnaList")

        const res=await qnaListDB(board)//async가 있을 때만 await사용가능
        console.log(res.data)
        setBoards(res.data)
    }
    qnaList()//호출
},[board])
  return (
    <>
      {boards.map((item,index)=>(
          <tr key={index}>
          <td>{item.QNA_BNO}</td>
          <td>{item.QNA_TITLE}</td>
          <td>{item.MEM_NAME}</td>
          <td>{item.QNA_DATE}</td>
          <td>{item.QNA_HIT}</td>
          </tr>
        ))
      }
    </>
  )
}

export default RepleBoardList
