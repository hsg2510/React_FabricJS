var kim = {name:'kim', first:10, second:20}
var lee = {name:'lee', first:10, second:10}
function sum(prefix){
    return prefix+(this.first+this.second);
}
// sum();
console.log("sum.call(kim)", sum.call(kim, '=> ')); //'apply'는 'call'과 동일한 기능을 가짐. 사용하는 방식만 call과 약간 다를 뿐.
console.log("lee.call(kim)", sum.call(lee, ': '));
var kimSum = sum.bind(kim, '-> ');
console.log('kimSum()', kimSum());