const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split(' ');

solution(input);

function solution(input) {
  const N = parseInt(input[0]); // 시간 범위
  const K = input[1]; // 찾고자 하는 숫자
  let count = 0; // K가 포함된 시각의 개수

  // 0시부터 N시, 0분부터 59분까지, 0초부터 59초까지 반복
  for (let hour = 0; hour <= N; hour++) {
    for (let minute = 0; minute < 60; minute++) {
      for (let second = 0; second < 60; second++) {
        // 시간, 분, 초를 두 자릿수 형식으로 이어붙여 문자열로 만듦
        const time = `${String(hour).padStart(2, '0')}${String(minute).padStart(
          2,
          '0'
        )}${String(second).padStart(2, '0')}`;

        // 문자열 time에 K가 포함되어 있으면 count 증가
        if (time.includes(K)) {
          count++;
        }
      }
    }
  }

  console.log(count);
}
