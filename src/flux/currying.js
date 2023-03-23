
const repeatWidth = (character, count)=>character.repeat(count);
console.log(repeatWidth('*',5))

const repeatWidth2 = (character)=> (count)=>character.repeat(count);

//repeatStar는 함수 repeatWidth2가 커링함수
const repeatStar= repeatWidth2('*')
console.log(repeatStar(3))