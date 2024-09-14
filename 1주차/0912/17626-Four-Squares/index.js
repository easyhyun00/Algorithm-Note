const fs = require('fs');
let input = fs.readFileSync('./input.txt').toString().trim();

solution(Number(input));

function solution(N) {
  let result = 4; // 최악의 경우 4개의 제곱근으로 표현

  let sqrt = parseInt(Math.sqrt(N)); // N의 제곱근

  // 1부터 N의 제곱근까지 모든 제곱수를 배열에 저장
  let arr = [];
  for (let i = 1; i <= sqrt; i++) {
    arr.push(i * i);
  }

  // 큰 수부터 처리하기 위해 내림차순 정렬
  arr.sort((a, b) => b - a);

  //
  let memo = new Map();

  function bfs(remain, count) {
    // count가 4면 더 이상 탐색X
    if (count >= 4) return;

    // 남음 값이 0이면 최소값 업데이트
    if (remain === 0) {
      result = Math.min(result, count);
      return;
    }

    // remain값에 대해 더 적은 count로 계산된 경우가 있으면 탐색X
    if (memo.has(remain) && memo.get(remain) <= count) {
      return;
    }

    // map에 현재 상태 저장
    memo.set(remain, count);

    for (let i = 0; i < arr.length; i++) {
      // 제곱수를 뺀 다음의 남은 값을 계산
      let nextRemain = remain - arr[i];
      // 남은 값이 0 이상이면 재귀호출
      if (nextRemain >= 0) {
        bfs(nextRemain, count + 1);
      }
    }
  }

  // 처음에는 남은 값 N과 count 0으로 시작
  bfs(N, 0);

  console.log(result);
}
