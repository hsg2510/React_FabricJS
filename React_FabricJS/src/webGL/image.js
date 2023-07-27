function main() {
  var image = new Image();
  image.src = "http://someimage/on/our/server"; 
  image.onload = function() {
    render(image);
  }
}
 
function render(image) {
  ...
  // 이전에 작성한 모든 코드
  ...
  // 텍스처 좌표가 필요한 곳을 탐색
  var texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
 
  // 사각형의 텍스처 좌표 제공
  var texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0
    ]),
    gl.STATIC_DRAW
  );
  gl.enableVertexAttribArray(texCoordLocation);
  gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
 
  // 텍스처 생성
  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
 
  // 어떤 크기의 이미지도 렌더링할 수 있도록 매개변수 설정
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
 
  // 텍스처에 이미지 업로드
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  ...
}


//// texture 좌표의 1 pixel을 shader 에서 사용.
// java script
var textureSizeLocation = gl.getUniformLocation(program, "u_textureSize"); 
gl.uniform2f(textureSizeLocation, image.width, image.height);

// shader
vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;

//// 하나의 texture만 사용할 경우. ////
// shader의 sampler2D 타입 uniform이 하나만 설정되어 있으면, 해당 uniform은 기본적으로
// texture unit 0번을 사용한다. 그리고 기본으로 active 되어있는 texture unit도 0번이기 때문에, 
// gl.activeTexture, gl.uniform1i 함수를 사용하지 않고, gl.bindTexture 함수만 사용해도 된다.
gl.bindTexture(gl.TEXTURE_2D, tex);

//// texture 갯수 ////
// 모든 WebGL 구현체들은 fragment shader에서 최소 8개의 texture unit을 지원해야 한다.
// 따라서, fragment shader에서 8개 이상을 사용하려면 gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)를 호출해서
// 몇개를 지원하는지 확인해야 한다. 
// 그리고 vertex shader에서는 최소 지원 개수가 명시되어 있지않다. 하여, vertex shader에서 texture를 사용하고 싶다면, 
// gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS)를 호출해서 몇 개를 사용할 수 있는지 체크해라. 
// 99% 이상의 기기들이 vertex shader에서 최소 4개 이상의 texture unit을 지원한다.


//// 여러 shader 적용 ////
// 이미지를 저장할 사용할 texture를 만든다. 
function createAndSetupTexture(gl) {
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
 
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
 
    return texture;
  }
 
    // 텍스처 2개를 만들고 프레임 버퍼에 첨부합니다.
  var textures = [];
  var framebuffers = [];
  for (var ii = 0; ii < 2; ++ii) {
    var texture = createAndSetupTexture(gl);
    textures.push(texture);
 
    // 이미지와 같은 크기로 텍스처 만들기
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
 
    var fbo = gl.createFramebuffer();
    framebuffers.push(fbo);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
 
    // framebuffer의 color attachment로 texture 첨부.
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  }

    // 원본 이미지로 시작
    // shader에서 사용할 texture가 하나기 때문에, bindTexture()만 호출해도 shader에 texture가 전달됨.
  gl.bindTexture(gl.TEXTURE_2D, originalImageTexture);
 
  // 텍스처에 그리는 동안 이미지 y축 뒤집지 않기
  // canvas에 그릴때는 canvas의 좌상단이 (0, 0) 이라 y축을 뒤집어서 그렸지만, texture buffer는 화면에 표시되지 않기 때문에,
  // 위, 아래 개념이 존재하지 않는다. 그래서 y 축을 굳이 뒤집어서 그리지 않아도 된다.
  gl.uniform1f(flipYLocation, 1);
 
  // 적용하고 싶은 각 효과를 반복합니다.
  for (var ii = 0; ii < effectsToApply.length; ++ii) {
    // 프레임 버퍼 중 하나에 그리도록 설정합니다.
    setFramebuffer(framebuffers[ii % 2], image.width, image.height);
 
    drawWithKernel(effectsToApply[ii]);
 
    // 다음 그리기를 위해, 방금 렌더링한 텍스처를 사용합니다. 
    // shader에서 사용할 texture가 하나기 때문에, bindTexture()만 호출해도 shader에 texture가 전달됨.
    gl.bindTexture(gl.TEXTURE_2D, textures[ii % 2]);
  }
 
  // 마지막으로 결과를 캔버스에 그립니다.
  gl.uniform1f(flipYLocation, -1);  // 캔버스 y축 뒤집기 필요
  // 첫번째 인자로 null을 전달해서, gl.bindFramebuffer(gl.FRAMEBUFFER, null);이 호출되면, canvas에 있는 fb가 바인딩 됨.
  setFramebuffer(null, canvas.width, canvas.height);
  drawWithKernel("normal");
 
  function setFramebuffer(fbo, width, height) {
    // 이걸 렌더링할 프레임 버퍼로 만듭니다.
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
 
    // 프레임 버퍼의 해상도를 셰이더에 알려줍니다.
    gl.uniform2f(resolutionLocation, width, height);
 
    // 렌더링할 fb는 canvas 크기와 다르기 때문에 fb의 texture에 렌더링할 때 viewport를 적절하게 설정하고 
    // 마지막으로 canvas를 렌더링할 때 viewport를 canvas 크기로 다시 설정해야 한다.
    gl.viewport(0, 0, width, height);
  }
 
  function drawWithKernel(name) {
    // 커널 설정
    gl.uniform1fv(kernelLocation, kernels[name]);
 
    // 사각형을 그립니다.
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }