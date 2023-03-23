import axios from "axios";

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
export const jsonMemberListDB = (member) => {
    console.log("jsonMemberListDB호출")
  return new Promise((reslove, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/jsonMemberList",
        params: member,//쿼리스트링 header에 담김 get방식
      });
      console.log(response)
      reslove(response);
    } catch (error) {
      reject(error);
    }
  });
};
