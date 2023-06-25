class Person {
    name: string;
    age: number;

    constructor(){
        this.name = 'Mark';
        this.age = 39;
    }
}
let 사람1 = new Person();
let 사람2 = new Person();


// interface
interface Square { 
    color : string;
    width : number;
};
let 네모 :Square = { color : 'red', width : 100 };

// interface 상속
interface Student {
    name: string;
}
interface Teacher extends Student {
    age: number;
}
let 학생: Student = { name: 'hong' };
let 선생: Teacher = { name: 'kim', age: 30 }; 

// 교차 타입
type Animal = { name : string }
type Cat = { age : number } & Animal; // Cat type도 만족하고 Animal type도 만족하는 type을 만들어 주세요.
let 고양이 :Cat = { name : '야옹이', age : 3 };

// interface VS type
// interface는 중복선언 가능, type은 중복선언 불가능
interface Student2 {
    name: string;
}
interface Student2 {
    score: number;
}
// Student = { name: string, score: number } 이렇게 합쳐짐.
let student = { name: 'hong', score: 100 }; 
//typescript로 만들어진 외부 라이브러리에는 interface가 많이 사용됨. 여기다가 우리가 속성을 쉽게 추가할 수 있음.

