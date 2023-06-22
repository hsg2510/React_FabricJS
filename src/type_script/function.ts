
function 함수1(x: number) :number {
    return x * 2;
}

// 밑에서 "x? : number"는 "x :number | undefined" 랑 같음.
// x가 number type이면 2 리텅, undefined이면 3 리턴.
function 파라미터옵션함수(x? : number) :number {
    return x? 2 : 3;
}

// type narrowing
function 복수타입함수(x: number|string) {
    /* 
        아래 return 문은 오류가 난다. number, string 타입 각각은 + 연산이 가능하지만, 
        number | string은 그 자체로 다른 타입이기 때문에, +연산이 불가능하다. 
    */
    // return x + 1; 

    if (typeof x === 'string') {
        return x + 1;
    } else {
        return x + 1;
    }

    //instanceof 도 type narrowing으로 인정을 해줌.
}
    
//assertion으로 type narrowing 사용하기
function 타입어썰션함수(x: number|string) {
    let array :number[] = [];
    // array[0] = x; 오류 발생
    array[0] = x as number; // type script 컴파일러가 x를 number type으로 만들어 버림.(타입 덮어쓰기)

    /* 
        그러나 타입어썰션함수('123') 이렇게 호출해도 오류가 발생하지 않는다. assertion은 
        string을 대입했는지 number를 대입했는지 상관없이 type을 number로 만들어 버리기 때문이다.
        따라서 type narrowing은 typeof if문으로 하는것을 추천.
    */
}

//함수타입을 Type 변수로 만들기
type 함수타입 = () => {}; // 기본
type 함수타입2 = (a :string) => number;
let 함수변수 :함수타입2 = function (a){
    return 10;
};
함수변수('hong');

//이름없는 함수 만들기
() => {
    return 10;
}
() => 10; // 내용에 return 10을 하는 코드 한줄만 있으면 다음으로 대체 가능.

//멤버함수(메서드) & 멤버함수의 Type 지정.
type MemberType = {
    name : string,
    plusOne : (x : number) => number,
    changeName : () => void
}
let 회원정보 : MemberType = {
    name :'kim',
    plusOne(x){
        return x + 1;
    },
    changeName : () => {
        
    }
}
회원정보.plusOne(10)
회원정보.changeName()


