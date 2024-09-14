const fs = require('fs');
let input = fs.readFileSync('./input.txt');

solution(parseInt(input));

function solution(input) {
  console.log(Fibonacci(input));
}

function Fibonacci(index) {
  // index가 0이면 0를 반환하여 재귀 종료
  if (index === 0) return 0;
  // Index가 1이면 1을 반환하여 재귀 종료
  if (index === 1) return 1;

  // 이전 두 항의 합을 재귀적으로 계산하여 반환
  return Fibonacci(index - 2) + Fibonacci(index - 1);
}
