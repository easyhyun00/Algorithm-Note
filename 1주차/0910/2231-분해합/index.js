const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().trim();

solution(Number(input));

function solution(input) {
  console.log(decomposition(input));
}

function decomposition(input) {
  let len = input.toString().length;

  // 입력값에서 각 자리수를 뺀 값의 최소값부터 시작(각 자리가 9일때)
  for (let i = input - len * 9; i < input; i++) {
    let sum = i;

    // i의 각 자리수를 sum에 더함
    for (let j = 0; j < i.toString().length; j++) {
      sum += Number(i.toString()[j]);
    }
    // 만약 sum이 입력값과 같다면 i를 반환 (분해합을 찾음)
    if (sum === input) return i;
  }
  // 해당하는 결과가 없으면 0을 반환
  return 0;
}
