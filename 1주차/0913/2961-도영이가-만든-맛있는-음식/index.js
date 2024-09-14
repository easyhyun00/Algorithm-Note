const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

solution(input);

function solution(input) {
  let count = input[0][0];
  let result = Infinity;

  function dfs(index, S, B) {
    if (index === count) {
      // 아무 재료도 선택하지 않은 경우를 제외
      // 신맛과 쓴맛 차이의 절대값을 구해 결과 업데이트
      if (S !== 1 || B !== 0) {
        let diff = Math.abs(S - B);
        result = Math.min(result, diff);
      }
      return;
    }

    // 현재 재료를 선택하는 경우: 신맛 곱하고, 쓴맛 더함
    dfs(index + 1, S * input[index + 1][0], B + input[index + 1][1]);
    // 현재 재료를 선택하지 않은 경우
    dfs(index + 1, S, B);
  }

  // 초기값: 신맛은 곱해야하기 때문에 1, 쓴맛은 더해야하기 때문에 0
  dfs(0, 1, 0);

  console.log(result);
}
