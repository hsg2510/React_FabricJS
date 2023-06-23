function Person(name, first, second){
    this.name = name;
    this.first = first;
    this.second = second;
}
Person.prototype.sum = function(){
    return this.first + this.second;
}

function PersonPlus(name, first, second, third){
    Person.call(this, name,first,second);
    this.third = third;
}

/* 
    이 코드는 JS 표준이 아니기 때문에, 아랫줄(2줄)로 대체한다. PersonPlus가 정의될 때, 기본적으로 prototype이 생성되고 prototype.custructor는 PersonPlus를 가리키도록 만들어 지기 때문에, 
    밑에줄 하나로 표준코드 2줄을 한번에 해결할 수 있다. 
*/
// PersonPlus.prototype.__proto__ = Person.prototype; 
PersonPlus.prototype = Object.create(Person.prototype);
PersonPlus.prototype.constructor = PersonPlus;

PersonPlus.prototype.avg = function(){
    return (this.first+this.second+this.third)/3;
}

var kim = new PersonPlus('kim', 10, 20, 30);
console.log("kim.sum()", kim.sum());
console.log("kim.avg()", kim.avg());
console.log('kim.constructor', kim.constructor);