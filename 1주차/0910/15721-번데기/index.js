const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

solution(input);

function solution(input) {
  let gameArr = game(Number(input[1]));
  console.log(
    findIndex(gameArr, Number(input[1]), Number(input[2])) % input[0]
  );
}

function game(count) {
  let arr = [];

  let b_cnt = 0; // 뻔 개수
  let d_cnt = 0; // 데기 개수

  let cnt = 1;

  // 무한루프
  while (1) {
    cnt++;

    // 뻔 데기 뻔 데기 추가
    for (let i = 0; i < 2; i++) {
      b_cnt++;
      d_cnt++;
      arr.push([b_cnt, 0]);
      arr.push([d_cnt, 1]);
    }

    // 게임 라운드에 따라 뻔 추가
    for (let i = 0; i < cnt; i++) {
      b_cnt++;
      arr.push([b_cnt, 0]);
    }

    // 게임 라운드에 따라 데기 추가
    for (let i = 0; i < cnt; i++) {
      d_cnt++;
      arr.push([d_cnt, 1]);
    }

    // 뻔 개수가 구하고자하는 라운드 번째보다 크면 루프 종료
    if (b_cnt >= count) break;
  }

  return arr;
}

function findIndex(arr, count, find) {
  for (let i = 0; i < arr.length; i++) {
    // 찾고자하는 라우든 번째와 같고, 구호가 같으면 인덱스 반환
    if (arr[i][0] === count && arr[i][1] === find) {
      return i;
    }
  }
  // 못찾으면 -1 반환
  return -1;
}
