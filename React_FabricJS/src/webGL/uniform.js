
// gl.uniformXXX로 uniform을 설정. 
// 다른 shader의 uniform을 설정하고 싶으면, gl.useProgram(다른프로그램); 으로 다른 프로그램을 
// 현재 프로그램으로 바꿔주고 gl.uniformXXX로 uniform을 설정. 

//// uniform 타입 종류 ////
gl.uniform1f (floatUniformLoc, v);                 // float
gl.uniform1fv(floatUniformLoc, [v]);               // float 또는 float 배열
gl.uniform2f (vec2UniformLoc, v0, v1);             // vec2
gl.uniform2fv(vec2UniformLoc, [v0, v1]);           // vec2 또는 vec2 배열
gl.uniform3f (vec3UniformLoc, v0, v1, v2);         // vec3
gl.uniform3fv(vec3UniformLoc, [v0, v1, v2]);       // vec3 또는 vec3 배열
gl.uniform4f (vec4UniformLoc, v0, v1, v2, v4);     // vec4
gl.uniform4fv(vec4UniformLoc, [v0, v1, v2, v4]);   // vec4 또는 vec4 배열
 
gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // mat2 또는 mat2 배열
gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // mat3 또는 mat3 배열
gl.uniformMatrix4fv(mat4UniformLoc, false, [ 16x element array ])  // mat4 또는 mat4 배열
 
gl.uniform1i (intUniformLoc, v);                   // int
gl.uniform1iv(intUniformLoc, [v]);                 // int 또는 int 배열
gl.uniform2i (ivec2UniformLoc, v0, v1);            // ivec2
gl.uniform2iv(ivec2UniformLoc, [v0, v1]);          // ivec2 또는 ivec2 배열
gl.uniform3i (ivec3UniformLoc, v0, v1, v2);        // ivec3
gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);      // ivec3 또는 ivec3 배열
gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);    // ivec4
gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // ivec4 또는 ivec4 배열
 
gl.uniform1i (sampler2DUniformLoc, v);             // sampler2D (texture)
gl.uniform1iv(sampler2DUniformLoc, [v]);           // sampler2D 또는 sampler2D 배열
 
gl.uniform1i (samplerCubeUniformLoc, v);           // samplerCube (texture)
gl.uniform1iv(samplerCubeUniformLoc, [v]);         // samplerCube 또는 samplerCube 배열

gl.uniform1i(someThingActiveLoc, true);  // bool
//// uniform 배열 ////
// shader
uniform vec2 u_someVec2[3];
// java script
var someVec2Loc = gl.getUniformLocation(someProgram, "u_someVec2");
gl.uniform2fv(someVec2Loc, [1, 2, 3, 4, 5, 6]);  // u_someVec2의 전체 배열 설정

//// uniform 구조체 ////
// shader
struct SomeStruct {
  bool active;
  vec2 someVec2;
};
uniform SomeStruct u_someThing;
// java script
var someThingActiveLoc = gl.getUniformLocation(someProgram, "u_someThing.active");
var someThingSomeVec2Loc = gl.getUniformLocation(someProgram, "u_someThing.someVec2");

//// uniform texture ////
var tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);
var level = 0;
var width = 2;
var height = 1;
var data = new Uint8Array([
  255, 0, 0, 255,   // 빨강 픽셀
  0, 255, 0, 255,   // 초록 픽셀
]);
// 현재 TEXTURE_2D에 바인딩 되어있는 texture buffer에 data를 전달. cpu -> gpu로 data전달.
gl.texImage2D(gl.TEXTURE_2D, level, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

var someSamplerLoc = gl.getUniformLocation(someProgram, "u_texture");

// 5번 유닛 활성화 뒤, 5번 유닛에 tex를 바인딩. someSamplerLoc이 5번 유닛을 사용하도록 함.
var unit = 5;  // 텍스처 유닛 선택
gl.activeTexture(gl.TEXTURE0 + unit); // bindTexture를 하기전에 불러줘야 함. 
gl.bindTexture(gl.TEXTURE_2D, tex); // active가 된 unit에 tex를 binding 시킴.
gl.uniform1i(someSamplerLoc, unit);