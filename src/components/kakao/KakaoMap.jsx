/* global kakao */
import React, { useEffect, useRef ,useState} from 'react'
import { BButton } from '../styles/FormStyle';

const KakaoMap = () => {
    //정보를 계속 유지하고 싶을 때 사용하는 Hook Ref
    const kakaomap = useRef();
    const [map,setMap]=useState();
    //현재위치 마커
    const [positions,setPositions]=useState([
        {
            content:"<div>터짐블로그</div>",
            latlng:new kakao.maps.LatLng(37.5094354, 127.0669578)
        }
    ]);
useEffect( ()=>{
    const container = document.getElementById("map");
    const options = {
        center:positions[0].latlng,
        level:4,
    };
    if(!map){
        setMap(new kakao.maps.Map(container,options))
    }
    else{
        if(positions[1]){//자바스크립트에서는 0이 아닌 모든 것은 참
            map.setCenter(positions[1].latlng)
        }
        //마커 표시하기
    for(let i=0;i<positions.length;i++){
        //마커 생성
        const marker = new kakao.maps.Marker({
            map:map,//마커를 표시할 지도
            position:positions[i].latlng,//마커위치
        })
        //마커에 표시할 인포윈도우 생성하기
        const infowindow = new kakao.maps.InfoWindow({
            content : positions[i].content
        });
        //마커에 이벤트등록하는 함수 생성 &즉시 호출되도록 클로저 만들기
        //클로저 추가하지 않으면 마커가 여러개 있을 때 마지막에만 이벤트 적용
        (function(marker,infowindow){
            //마커에 mouseover 이벤트 등록 //마우스 오버시 infowindow표시
            kakao.maps.event.addListener(marker,'mouseover',function(){
                infowindow.open(map,marker)
            });
            //마커에 mouseout 이벤트 등록 마우스 아웃시 인포윈도우 닫기처리
            kakao.maps.event.addListener(marker,'mouseout',function(){
                infowindow.close()
            });
        })(marker,infowindow);
    }
    }//end of if
},[positions,map])
  return (

    <>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column',}}>
        <div id="map" ref={kakaomap} style={{width:"700px", height:"500px",marginBottom:"20px",border:"2px solid lightgray",borderRadius:"20px"}}></div>
        <BButton type='button'>현재위치</BButton>
    </div>
    </>
  )
}

export default KakaoMap
