import axios from "axios";

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
