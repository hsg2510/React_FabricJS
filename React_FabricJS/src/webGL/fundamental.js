////// 초기화 코드 //////
//// canvas, gl context ///
 var canvas = document.querySelector("#c");
  var gl = canvas.getContext("webgl");
 if (!gl) {
   // webgl이 없어요!
 }

//// shader ////
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
 
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
 
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

var vertexShaderSource = document.querySelector("#vertex-shader-2d").text;
var fragmentShaderSource = document.querySelector("#fragment-shader-2d").text;
 
var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
var program = createProgram(gl, vertexShader, fragmentShader);

// attribute
var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
var positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// uniform 
var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
// 2D 포인트 3개
var positions = [
    0, 0,
    0, 0.5,
  0.7, 0,
];
// cpu의 data -> gpu의 buffer로 복사.
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(positions),
  gl.STATIC_DRAW
);

////// 랜더링 코드 //////
// 그리기전에 canvas 크기를 화면 크기에 맞게 조절하는 함수
resizeCanvasToDisplaySize(gl.canvas);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
// canvas 지우기
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);

gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// positionBuffer(ARRAY_BUFFER)의 데이터를 꺼내오는 방법을 속성에 지시
// vertexAttribPointer의 숨겨진 동작은 현재 ARRAY_BUFFER에 바인딩된 버퍼에서 데이터를 가져온다는 것이다.
// vertex shader에서 a_position가 'attribute vec4 a_position;' 라면,
// 밑에서 size를 2로 하였으니 x, y만 ARRAY_BUFFER에서 가져와 채우고, 나머지 z, w에는 0, 1로 채운다.
// 왜냐하면 attribute의 기본값이 (0, 0, 0, 1) 이기 때문이다.
var size = 2;          // 반복마다 2개의 컴포넌트
var type = gl.FLOAT;   // 데이터는 32비트 부동 소수점
var normalize = false; // 데이터 정규화 안 함
var stride = 0;        // 0 = 다음 위치를 가져오기 위해 반복마다 size * sizeof(type) 만큼 앞으로 이동
var offset = 0;        // 버퍼의 처음부터 시작
gl.vertexAttribPointer(
  positionAttributeLocation,
  size,
  type,
  normalize,
  stride,
  offset
);

var offset = 0;
var count = 3;
gl.drawArrays(gl.TRIANGLES, offset, count);
