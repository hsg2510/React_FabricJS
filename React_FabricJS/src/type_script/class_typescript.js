var Person = /** @class */ (function () {
    function Person() {
        this.name = 'Mark';
        this.age = 39;
    }
    return Person;
}());
var 사람1 = new Person();
var 사람2 = new Person();
;
var 네모 = { color: 'red', width: 100 };
var 학생 = { name: 'hong' };
var 선생 = { name: 'kim', age: 30 };
var 고양이 = { name: '야옹이', age: 3 };
// Student = { name: string, score: number } 이렇게 합쳐짐.
var student = { name: 'hong', score: 100 };
//typescript로 만들어진 외부 라이브러리에는 interface가 많이 사용됨. 여기다가 우리가 속성을 쉽게 추가할 수 있음.
