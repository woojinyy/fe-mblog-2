import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Profile = () => {
    const navigate = useNavigate()
    console.log('Profile')
    //카카오에서 부여해준 아이디값
    const [user_id,setUserid]=useState()
    //카카오에 등록된 사용자 명
    const [nickName,setNickName]=useState()
    //카카오에 등록된 프로필사진 URL
    const [profileImage,setProfileImage]=useState()
    const getProfile = async ()=>{
        try {
            let data = await window.Kakao.API.request({
                url:"/v2/user/me",

            })
            console.log(data.id)
            console.log(data.properties.nickname)
            console.log(data.properties.profile_image)
            //사용자 정보 변수에 저장
            setUserid(data.id)
            window.localStorage.setItem("userId",user_id)
            setNickName(data.properties.nickname)
            window.localStorage.setItem("nickname",nickName)
            setProfileImage(data.properties.profile_image)
            window.localStorage.setItem("profile_image",profileImage)
            navigate("/home")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect( ()=>{
        getProfile()
    })
    const kakaoLogout=async()=>{
        //로그아웃처리
        await axios({
            method :"GET",
            url:`https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&logout_redirect_uri=http://localhost:3000`
        }).then(res=>{
            console.log(res)
            window.localStorage.removeItem("userId")
            window.localStorage.removeItem("nickname")
            window.localStorage.removeItem("profileImage")
            navigate("/")
        }).catch(error=> {//콜백에서 에러발생시 실행
            console.log(error)
        })
        }

    return(
        <>
            <h3>{user_id}</h3>
            <h3>{nickName}</h3>
            <h3>{profileImage}</h3>
            <br />
            <button onClick ={kakaoLogout}>카카오 로 그아웃</button>
        </>
  )

    }



export default Profile
