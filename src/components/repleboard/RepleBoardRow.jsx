import React from 'react'
const RepleBoardRow = ({board}) => {
  return (
    <>
    <tr>
      <td>{board.QNA_NO}</td>
      <td><Link to={"/qnaList/"+board.QNA_NO}className="btn btn-primary">{board.BM_TITLE}</Link></td>
      <td>{board.BM_WRITER}</td>
    </tr>
  </>
  )
}

export default RepleBoardRow
