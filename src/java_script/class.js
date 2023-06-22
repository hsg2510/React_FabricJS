/* Java Script */
// 함수로 클래스 만들기(예전 문법)
function Machine(param1, param2) {
    this.q = param1;
    this.w = param2;
}
let 기계instance = new Machine('consume', 'abs');

// 클래스
class Here {
    constructor(param1, param2) {
        this.q = param1;
        this.w = param2;
    }
}
let hereInstance = new Here('consume', 'abs');