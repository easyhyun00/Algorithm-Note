const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

const N = input[0][0];
const M = input[0][1];

const map = input.slice(1, 1 + N);

// 상하좌우
const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// 목표 지점
let goal = null;

// 목표 지점 찾음
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (map[i][j] === 2) {
      goal = [i, j];
    }
  }
}

// 거리 배열을 초기화 (-1: 방문 안 함, 0: 이동 불가)
const distance = Array.from({ length: N }, (_, i) =>
  map[i].map((val) => (val === 0 ? 0 : -1))
);

// 목표 지점부터 시작
const queue = [goal];
distance[goal[0]][goal[1]] = 0;

// BFS
while (queue.length > 0) {
  const [row, col] = queue.shift(); // 현재 위치

  // 상하좌우 이동
  for (let [r, c] of direction) {
    const newRow = row + r;
    const newCol = col + c;

    // 유효한 좌표
    if (
      newRow >= 0 &&
      newRow < N &&
      newCol >= 0 &&
      newCol < M &&
      map[newRow][newCol] === 1 &&
      distance[newRow][newCol] === -1
    ) {
      distance[newRow][newCol] = distance[row][col] + 1; // 거리 계산
      queue.push([newRow, newCol]); // 큐에 넣음
    }
  }
}

distance.forEach((row) => {
  console.log(row.join(' '));
});
