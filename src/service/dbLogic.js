import axios from "axios";

export const jsonMemberListDB = (member) => {
    console.log("jsonMemberListDB호출")
  return new Promise((reslove, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "member/jsonMemberList",
        params: member,
      });
      console.log(response)
      reslove(response);
    } catch (error) {
      reject(error);
    }
  });
};
