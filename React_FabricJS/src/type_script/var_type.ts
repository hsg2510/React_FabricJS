

// type 종류 : number, boolean, bigint, [], {}, null, undefined 등등 
let 이름 :string = 'abc';
let 이름들 :string[] = ['홍', '김'];
let 이름object :{ name :string } = { name : 'kim' };
// { name?: string } 으로 type을 지정하면, object 속성에 name이 안들어와도 error를 안냄.
let 회원들 :{ name :string, age :number } = { name : 'hong', age : 15 };
let 복수타입 :string | number = 123; // string or number 타입이 들어올 수 있음 

//복수타입의 충돌
let 복수var :number | string[] = ['a', 'b'];
복수var = 3; 
let 복수var2 :(number | string)[] = ['a', 1, 'c']; // 배열안에 element가 number, string 둘다 가능.

/* any | unknown */
let 애니var :any = 123;
애니var = '213';
애니var = true;
애니var = 애니var - 1; // 사칙연산도 가능.

let 언노운var :unknown = 'hong';
언노운var = 213;
언노운var = true;
언노운var = 'stdd';

let 변수변수 :string = 애니var;
// 변수변수 = 언노운var; 불가능
let unknownVar :unknown = 언노운var; // 언노운 변수는 언노운 변수끼리만 대입 가능.
let unknownNum :unknown = 1;
// unknownNum = unknownNum + 1; 안됨. 에러남. +연산은 number, string만 가능.

//Type 문법 생략 가능
let 회원이름 = 'hong'; // 자동으로 string type이 지정됨.
// 회원이름 = 3; 에러남.

/* Type 변수*/
type Typename = string | number; // type명은 보통 맨앞에 대문자를 사용함.
let 내타입변수: Typename = 12;

function 함수(x: number) :number {
    return x * 2;
}

type Member = [number, boolean]; // tuple type
let john:Member = [32, true];

type MemberObj = {
    name : string,  
}
let memberObjVar: MemberObj = {
    name : 'hong',
}

//Type 변수 합치기
type StringNumType = string | number 
type BoolType = boolean
type StrBoolNumType = StringNumType | BoolType

//Object Type 변수 합치기
type PositionX = { x :number }
type PositionY = { y :number }
type Position = PositionX & PositionY

// object의 key로는 number type만 와야 된다. 
type MemberObjType = { 
    [key :number] : string,
}
let johnVar: MemberObjType = {
    2: 'kim'
}

let 널널 :null = null; // 변수가 텅 비었다.
let 언디파인 :undefined = undefined; // 변수는 만들었지만 정의가 되지 않았다. 

//const && readonly
const 여친 = {
    name : '엠버'
}
여친.name = '유라' // const지만 안에 멤버변수는 변경 가능.
type Girlfriend = {
    readonly name :string
}
const 여친2 :Girlfriend = {
    name : '엠버'
}
// 여친2.name = '유라' 에러남.

/*Literl Types -> enum처럼 사용 가능.*/
let 이름리터럴타입 :"kim" | "hong" | "park";
// 이름리터럴타입 = "lee"; 오류

/* Literal Types & Assertion */ 
var 자료 = {
    name : 'kim'
}
function 내함수(a :'kim') {

}
// 내함수(자료.name) 오류 남. 자료.name은 type은 string이기 때문.

// as const의 의미 
// 1. object의 멤버변수의 type을 value로 바꿔버림. name은 string type이 아니라, 'kim' type 인것임.
// 2. object의 멤버변수들을 readonly로 바꿔버림.
var 자료2 = {
    name : 'kim'
} as const
내함수(자료2.name) 
// 자료2.name = 'hong'

// array, object의 property들을 쉽게 변수로 빼내오기. (destructuring)
let [변수1, 변수2] = ['안녕', 100]; // 변수1 = '안녕', 변수2 = 100 이 들어감
let { student2 : student2, age : age } = { student2 : true, age : 20 } // student2 = true, age = 20 이 들어감
// let { student2, age } = { student2 : true, age : 20 } // 변수명과 property명이 같으면 이렇게 생략 가능.
