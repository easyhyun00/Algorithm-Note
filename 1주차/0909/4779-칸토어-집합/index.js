const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

solution(input);

function solution(input) {
  for (let i = 0; i < input.length; i++) {
    console.log(cantor(input[i]));
  }
}

function cantor(line) {
  // line이 0이면 '_'를 반환하고 재귀 종료
  if (line == 0) return '_';

  // 이전 단계 결과를 재귀적으로 얻음
  let previous = cantor(line - 1);

  // 이전 단계의 결과을 가지고 문자열 생성
  return `${previous}${' '.repeat(previous.length)}${previous}`;
}
