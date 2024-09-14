const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split(' ');

solution(input);

function solution(input) {
  let A = Number(input[0]);
  let B = Number(input[1]);
  let C = Number(input[2]);
  let M = Number(input[3]);

  let time = 0; // 총 시간을 저장할 변수
  let heal = 0; // 현재 피로도를 저장할 변수
  let result = 0; // 처리한 일의 양을 저장할 변수

  // 하루 24시간
  while (time < 24) {
    // 현재 피로도에 A를 더해도 최대 피로도를 넘지 않으면
    // 1시간 일하고, 처리량을 더하고, 피로도 더함
    if (heal + A <= M) {
      time++;
      result += B;
      heal += A;
    }
    // 피로도가 넘으면 휴식
    // 1시간 쉬고, 피로도 감소
    else {
      time++;
      heal -= C;
      // 피로도가 음수가 되지 않게 조정
      if (heal < 0) heal = 0;
    }
  }

  console.log(result);
}
