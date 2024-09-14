const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

solution(input);

function solution(input) {
  console.log(sum(input[0][0], input[0][1], input[1]));
}

function sum(len, max, card) {
  let result = 0;

  // 첫번째 카드 선택
  for (i = 0; i < len - 2; i++) {
    if (card[i] > max) continue; // 첫 번째 카드가 max보다 크면 다음 반복으로 건너뜀
    for (j = i + 1; j < len - 1; j++) {
      if (card[i] + card[j] > max) continue; // 첫 번째와 두 번째 카드의 합이 max보다 크면 건너뜀
      for (k = j + 1; k < len; k++) {
        let sum = card[i] + card[j] + card[k]; // 세 카드의 합 계산

        if (sum === max) return sum; // 합이 max와 같으면 바로 반환
        if (sum < max && sum > result) result = sum; // 합이 max보다 작고, 현재 결과보다 크면 결과값 업데이트
      }
    }
  }
  return result;
}
