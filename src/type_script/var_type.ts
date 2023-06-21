

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

/* Type 지정*/
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

// object의 key로는 number type만 와야 된다. 
type MemberObjType = { 
    [key :number] : string,
}
let johnVar: MemberObjType = {
    2: 'kim'
}

let 널널 :null = null; // 변수가 텅 비었다.
let 언디파인 :undefined = undefined; // 변수는 만들었지만 정의가 되지 않았다. 