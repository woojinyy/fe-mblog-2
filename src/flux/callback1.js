function first(param){
    console.log(param)//[Function second]
    param()//param을 통해 호출 할 수 있다

}
function second(){

    console.log(2)
}


first(second)
//앞에 있는 결과가 뒤에있는 함수에 영향이 있을 때
//= 순서대로 처리할 필요가 있을 때 사용한다
function func1(){//outter함수 클로저
    let num = 0//변수 선언
    return function func2(){//반환형이 함수
        return num++//여기서 사용 가능
    }
}
function func2(){
    console.log(2)
}

let account=func1()//함수가 일급객체 시민이기 때문에 모든걸 다 가질 수 있다.
console.log(account())//1증가 했는데 왜 0찍혀? 
//전위 연산자 대입이 먼저 그다음 증가
console.log(account)//account로 작성하면 값이 안찍히지 그냥 함수가 나오지

function one(){
    console.log(1)
}
function two(){
    console.log(2)
}
one()
two()//이렇게 하면 편한데 이렇게 안함?

