import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';


const KhMyFilter = ({types, type, id, title, handleTitle}) => {
  console.log(id);//qna_type
  const navigate = useNavigate();
  const location = useLocation();//url정보 가져오기

  const setPath = (oldItem, newItem, key) => {
    //파라미터 값 확인하기
    console.log(location.pathname)// qna/list
    console.log(oldItem)//전체
    console.log(newItem)//양도
    console.log(key)//qna_type
    let path='';
    return path;
  }
  const [filter,setFilter]=useState()
  useEffect(()=>{

  },[filter])
  


  return (
    <DropdownButton variant="" title={title} style={{border: '1px solid lightgray', borderRadius:'5px', height:'38px'}}>
      { 
        types.map((element, index)=>(
          <Dropdown.Item as="button" key={index} onClick={()=>{
            if(type){ 
              navigate(setPath(title,element,id)); 
            }
            handleTitle(element); 
          }}>
            {element}
          </Dropdown.Item>
        )) 
      }
    </DropdownButton>
  );
};

export default KhMyFilter;