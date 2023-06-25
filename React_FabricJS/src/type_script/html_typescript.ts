let 제목 = document.querySelector('#title'); // 제목은 <h1> element라고 가정.
/*
    밑의 코드는 java script는 가능하다. But '제목'이 (Element | null) 타입이기 때문에 type narrowing을 해야함.
    type narrowing 하는 방법은 여러 가지가 있음.
*/
// 제목.innerHTML = '반가워요.' 
if (제목 != null) {
    제목.innerHTML = '반가워요.';
}
if (제목 instanceof Element) { // Element의 instance이냐, Element의 자식 클래스의 instance 이냐.
    제목.innerHTML = '반가워요.';
}
if (제목?.innerHTML != undefined) { // 제목이 null 이면 undefined를 return 해줌.
    제목.innerHTML = '반가워요.';
}

//링크는 <a> element 라고 가정.
let 링크 = document.querySelector('.link');
/*
    밑에 코드는 오류가 남.
    <a> 태그는 Element 클래스를 상속박은 HTMLAnchorElement 클래스의 instance이기 때문이다.
    그리고 href라는 property는 HTMLAnchorElement의 멤버 변수이다.
    고로, Element의 property에 맞는 정확한 Type으로 type narrowing을 해야함.
*/
// if (링크 instanceof Element) {
if (링크 instanceof HTMLAnchorElement) {
    링크.href = 'https://kakao.com';
}

//
let 버튼 = document.querySelector('#button');
// 아래코드도 type narrowing으로 인정해줌. 버튼의 멤버함수 중에 addEventListener가 있냐? 있으면 정상실행 해주고, 없으면 이 코드를 undefined으로 바꿔주세요.
버튼?.addEventListener('click', function(){ /* 내용 */ });