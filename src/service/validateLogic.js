export const validateDName=(e)=>{
    const name = e.target.value//input onChange
    const kor = /^[가-힣ㄱ-ㅎ]+$/;
    const eng = /^[a-zA-Z]+$/;
    if(name.length===0){
        return " ";
    }
    else if(kor.test(name)||eng.test(name)){//test의 리턴타입은 boolean 
        //name에 글자가 들어가있으면  true
        return "";
    }
    else{
        return "부서명은 한글 또는 영어만 가능합니다."
    }
}