// type 종류 : number, boolean, bigint, [], {}, null, undefined 등등 
var 이름 = 'abc';
var 이름들 = ['홍', '김'];
var 이름object = { name: 'kim' };
// { name?: string } 으로 type을 지정하면, object 속성에 name이 안들어와도 error를 안냄.
var 회원들 = { name: 'hong', age: 15 };
var 복수타입 = 123; // string or number 타입이 들어올 수 있음 
//복수타입의 충돌
var 복수var = ['a', 'b'];
복수var = 3;
var 복수var2 = ['a', 1, 'c']; // 배열안에 element가 number, string 둘다 가능.
/* any | unknown */
var 애니var = 123;
애니var = '213';
애니var = true;
애니var = 애니var - 1; // 사칙연산도 가능.
var 언노운var = 'hong';
언노운var = 213;
언노운var = true;
언노운var = 'stdd';
var 변수변수 = 애니var;
// 변수변수 = 언노운var; 불가능
var unknownVar = 언노운var; // 언노운 변수는 언노운 변수끼리만 대입 가능.
var unknownNum = 1;
// unknownNum = unknownNum + 1; 안됨. 에러남. +연산은 number, string만 가능.
//Type 문법 생략 가능
var 회원이름 = 'hong'; // 자동으로 string type이 지정됨.
var 내타입변수 = 12;
function 함수(x) {
    return x * 2;
}
var john = [32, true];
var memberObjVar = {
    name: 'hong',
};
var johnVar = {
    2: 'kim'
};
var 널널 = null; // 변수가 텅 비었다.
var 언디파인 = undefined; // 변수는 만들었지만 정의가 되지 않았다. 
