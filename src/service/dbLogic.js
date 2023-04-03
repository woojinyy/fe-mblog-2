import axios from "axios";
//Q 대소문자 구분?
//A 파라미터는 소문자 리턴값은 대문자 

export const qnaListDB = (board) => {
  console.log("qnaListDB호출")
return new Promise((reslove, reject) => {
  try {
    //비동기요청처리   ajax-fetch(브라우저 클라이언트사이드)-axios(NodeJs serverside)
    const response = axios({//3000서버에서 8000서버로 요청 네트워크(다른서버)서버가 다른 네트워크 cors이슈발생
      method: "get",
      url: process.env.REACT_APP_SPRING_IP + "reple/qnaList",
      params: board,//쿼리스트링 header에 담김 get방식
    });
    console.log(response)
    reslove(response);
  } catch (error) {
    reject(error);
  }
});
};

export const qnaInsertDB = (board) => {
  console.log("qnaInsertDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "post",//@RequestBody
      url: process.env.REACT_APP_SPRING_IP + "reple/qnaInsert",
      data: board, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
    });
    reslove(response);
    console.log(response)
  } catch (error) {
    reject(error);
  }
});
};

export const qnaUpdateDB = (board) => {
  console.log("qnaUpdateDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "post",//@RequestBody
      url: process.env.REACT_APP_SPRING_IP + "reple/qnaUpdate",
      data: board, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
    });
    console.log(""+response)//요청처리 성공
    reslove(response);
  } catch (error) {
    reject(error);//요청처리 실패
  }
});
};

export const qnaDeleteDB = (board) => {
  console.log("qnaDeleteDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "get",
      url: process.env.REACT_APP_SPRING_IP + "reple/qnaDelete",
      params: board, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
    });
    reslove(response);
    console.log(response)
  } catch (error) {
    reject(error);
  }
});
};

export const uploadFileDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "reple/fileUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadImageDB = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "reple/imageUpload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        processData: false,
        contentType: false,
        data: file,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}



export const memberInsertDB = (member) => {
  console.log("memberInsertDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "post",
      url: process.env.REACT_APP_SPRING_IP + "member/memberInsert",
      data: member, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
    });
    reslove(response);
    console.log(response)
  } catch (error) {
    reject(error);
  }
});
};

export const memberUpdateDB = (member) => {
  console.log("memberUpdateDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "post",//@RequestBody
      url: process.env.REACT_APP_SPRING_IP + "member/memberUpdate",
      data: member, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
    });
    console.log(""+response)//요청처리 성공
    reslove(response);
  } catch (error) {
    reject(error);//요청처리 실패
  }
});
};

export const memberDeleteDB = (member) => {
  console.log("memberDeleteDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "get",
      url: process.env.REACT_APP_SPRING_IP + "member/memberDelete",
      params: member, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
    });
    reslove(response);
    console.log(response)
  } catch (error) {
    reject(error);
  }
});
};



export const memberListDB = (board) => {
  console.log("memberListDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "get",
      url: process.env.REACT_APP_SPRING_IP + "member/memberList",
      params: board,//쿼리스트링 header에 담김 get방식
    });
    console.log(response)
    reslove(response);
  } catch (error) {
    reject(error);
  }
});
};

export const deptDeleteDB = (dept) => {
  console.log("deptDeleteDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "get",
      url: process.env.REACT_APP_SPRING_IP + "dept/deptDelete",
      params: dept, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
    });
    reslove(response);
    console.log(response)
  } catch (error) {
    reject(error);
  }
});
};

export const deptInsertDB = (dept) => {
  console.log("deptInsertDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "post",//@RequestBody
      url: process.env.REACT_APP_SPRING_IP + "dept/deptInsert",
      data: dept, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
    });
    console.log(response)
    reslove(response);
  } catch (error) {
    reject(error);
  }
});
};
export const deptUpdateDB = (dept) => {
  console.log("deptUpdateDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "post",//@RequestBody
      url: process.env.REACT_APP_SPRING_IP + "dept/deptUpdate",
      data: dept, //post방식 전송시 반드시 data속성으로 파라미터 넣을것
    });
    console.log(""+response)//요청처리 성공
    reslove(response);
  } catch (error) {
    reject(error);//요청처리 실패
  }
});
};
export const deptListDB = (dept) => {
  console.log("jsonMemberListDB호출")
return new Promise((reslove, reject) => {
  try {
    const response = axios({
      method: "get",
      url: process.env.REACT_APP_SPRING_IP + "dept/deptList",
      params: dept,
    });
    console.log(response)
    reslove(response);
  } catch (error) {
    reject(error);
  }
});
};

