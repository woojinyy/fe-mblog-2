let global=-99//전역변수

//아무런 변화 없다
function func1(){//직접 바꾸지 않는다
    let num=0;//지역변수
    return num//변수가 갖고있는 값 그대로 반환
}
console.log(func1)
console.log(func1())

//파라미터로 넘어온 값과 나가는 값이 다르다 =변했다
function func2(num){//직접 바꾸지 않는다 외부에서 결정된다  외부에서 파라미터를 바꿀 수 있다
    num=num+1
    return num//변수가 갖고있는 값 그대로 반환
}
console.log(func1())
console.log(func2(2))


//관점 : num의 값이 바뀌지 않는다  불변성 리액트 컨벤션
function func3(){//직접 바꾸지 않는다
    let num=0//지역변수 불변성
    //불변성 지키기 위해 지역변수로 치환해서 대입
    global =num+1//전역변수 치환
    return global//변수가 갖고있는 값 그대로 반환
}

console.log(func1())
console.log(func2(2))
console.log(global)//-99
console.log(func3())
console.log(global)//1