var memberArray = ['egoing', 'graphittie', 'leezhce'];
console.log("memberArray[2]", memberArray[2]);

var memberObject = {
    manager:'egoing',
    developer:'graphittie', 
    designer:'leezhce'
}
memberObject.designer = 'leezche';
console.log("memberObject.designer", memberObject.designer);
console.log("memberObject['designer']", memberObject['designer']);
delete memberObject.manager
console.log('after delete memberObject.manager', memberObject.manager);

/* Object copy */ 
var o1 = { name : 'kim' };
var o2 = Object.assign({}, o1); // deep copy
var score = [1, 2, 3];
var score2 = score.concat(4); // score = [1, 2, 3], score2 = [1, 2, 3, 4]​
// nested object
var ob1 = { name : 'kim', score:[1, 2]}
var ob2 = Object.assign({}, o1); // score는 여전히 shallow copy
ob2.score = o2.score.concat(); // score도 deep copy

/* Object immutable */
var o1 = { name : 'kim', score:[1, 2]}
Object.freeze(o1);
o1.name = 'lee'; // freeze 했기 때문에 이 코드는 무시됨. 
o1.score.push(3); // 가능. 
Object.freeze(o1.score);
o1.score.push(4); // 무시됨.

//const vs Object.freeze()
const o3 = { name : 'kim' }
var o4 = { name : 'hong' }
o3 = o4; // error, const이기 때문에 재할당 불가
o3.name = 'lee'; // 가능. const지만, Object.freeze()를 사용하지 않았기 때문에 가능.