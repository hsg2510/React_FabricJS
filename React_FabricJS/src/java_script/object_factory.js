function Person(name, first, second, third){
    this.name=name;
    this.first=first;
    this.second=second;
    this.sum = function(){
        return this.first+this.second;
    }
}

var d1 = new Date('2019-5-25');
console.log('d1.getFullYear()', d1.getFullYear());
console.log('Date', Date); // Date는 function 이었다!


var kim = new Person('kim', 10, 20);
var lee = new Person('lee', 10, 10);
console.log("kim.sum()", kim.sum());
console.log("lee.sum()", lee.sum());
console.log("Person", Person);
console.log("Person", new Person('aa', 1, 1)); // 함수 호출 앞에 new를 붙이면 이 함수는 생성자(constructor)라고 판단하고 객체(메모리)를 생성하고 return 한다.
