const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input[0]);
const map = input.slice(1, 1 + N).map((el) => el.split('').map(Number));

// 상하좌우
const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// BFS
function bfs(i, j) {
  let count = 1; // 집의 개수 카운트
  const que = [[i, j]]; // 행, 열
  map[i][j] = 0; // 방문 처리

  while (que.length) {
    const [row, col] = que.shift(); // 큐에서 현재 위치 추출

    // 상하좌우 이동
    for (let [r, c] of direction) {
      const newRow = row + r;
      const newCol = col + c;

      // 유효한 좌표인 경우
      // 집의 개수 증가, 새로운 위치와 이동 횟수를 큐에 추가, 방문 처리
      if (
        newRow >= 0 &&
        newRow < N &&
        newCol >= 0 &&
        newCol < N &&
        map[newRow][newCol] === 1
      ) {
        count += 1;
        que.push([newRow, newCol]);
        map[newRow][newCol] = 0;
      }
    }
  }
  return count; // 단지 내 집의 개수 반환
}

let totalCount = 0; // 단지의 수
let result = []; // 각 단지 내 집의 수

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 1) {
      const houseCount = bfs(i, j);
      result.push(houseCount); // 각 단지의 집 수 저장
      totalCount += 1; // 단지 수 증가
    }
  }
}

console.log(totalCount);
console.log(result.sort((a, b) => a - b).join('\n'));
