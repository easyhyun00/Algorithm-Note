const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

solution(input);

function solution(input) {
  let N = input[0][0]; // N일 동안의 상담 가능
  let result = 0; // 얻을 수 있는 최대 수익을 저장

  function dfs(index, money) {
    // 상담 날짜가 N일 이상이면 종료
    // 최대 수익 업데이트
    if (index >= N) {
      result = Math.max(result, money);
      return;
    }

    // T: 상담 걸리는 기간
    // P: 상담 시 얻는 수익
    let [T, P] = input[index + 1];

    // 상담을 진행할 수 있는 경우
    // 상담 진행 후 해당 상담의 수익을 더하고 재귀 호출
    if (index + T <= N) {
      dfs(index + T, money + P);
    }

    // 상담을 진행하지 않고 다음 날로 넘어감
    dfs(index + 1, money);
  }

  dfs(0, 0);

  console.log(result);
}
