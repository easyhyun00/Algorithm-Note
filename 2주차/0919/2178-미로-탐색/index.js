const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input[0].split(' ')[0]);
const M = Number(input[0].split(' ')[1]);

// 상하좌우
const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const map = input.slice(1, 1 + N).map((el) => el.split('').map(Number));

// BFS
function bfs() {
  const que = [[0, 0, 1]]; // 행, 열, 이동 거리
  map[0][0] = 0; // 방문 처리

  while (que.length) {
    const [row, col, distance] = que.shift(); // 큐에서 위치와 이동 거리 추출

    // 목표 지점에 도달하면 이동 거리 반환
    if (row === N - 1 && col === M - 1) {
      return distance;
    }

    // 상하좌우 이동
    for (let [r, c] of direction) {
      const newRow = row + r;
      const newCol = col + c;

      // 유효한 좌표인 경우
      // 새로운 위치와 이동 횟수를 큐에 추가, 방문 처리
      if (
        newRow >= 0 &&
        newRow < N &&
        newCol >= 0 &&
        newCol < M &&
        map[newRow][newCol] === 1
      ) {
        que.push([newRow, newCol, distance + 1]);
        map[newRow][newCol] = 0;
      }
    }
  }
}

console.log(bfs());
