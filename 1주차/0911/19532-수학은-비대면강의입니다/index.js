const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split(' ');

solution(input);

function solution(input) {
  let A = Number(input[0]);
  let B = Number(input[1]);
  let C = Number(input[2]);
  let D = Number(input[3]);
  let E = Number(input[4]);
  let F = Number(input[5]);

  // 범위는 -999부터 999까지 반복
  for (let i = -999; i <= 999; i++) {
    for (let j = -999; j <= 999; j++) {
      // 두 개의 방정식이 모두 성립하면 출력하고 루프 종료
      if (A * i + B * j == C && D * i + E * j == F) {
        console.log(i, j);
        break;
      }
    }
  }
}
