const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

solution(input);

function solution(input) {
  let N = input[0][0];
  let KList = input[1];
  let result = 0; // 만들 수 있는 가장 큰 수를 저장할 변수

  function dfs(number) {
    // 현재 만든 수가 N을 넘으면 종료
    if (Number(number) > N) return;

    // 현재 수와 기존 result 중 더 큰 값을 저장
    result = Math.max(result, Number(number));

    // 숫자의 길이가 N의 자릿수와 같으면 더 이상 진행하지 않음
    if (number.length === N.toString().length) return;

    // KList의 각 숫자를 이어붙여 재귀 호출
    for (let k of KList) {
      dfs(number + k.toString());
    }
  }

  for (let k of KList) {
    dfs(k.toString());
  }

  console.log(result);
}
