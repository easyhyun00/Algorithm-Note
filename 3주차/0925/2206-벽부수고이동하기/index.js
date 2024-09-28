const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input[0].split(' ').map(Number);
const Maps = input.slice(1).map((el) => el.split('').map(Number));

// visited[x][y][broke]: x, y 위치에서 벽을 부쉈는지 여부에 따라 방문 여부를 기록
const visited = Array.from(Array(N), () =>
  Array.from(Array(M), () => Array(2).fill(false))
);

// 상하좌우
const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function BFS() {
  // 큐 초기화: [x좌표, y좌표, 벽을 부쉈는지 여부(0 또는 1), 현재까지 이동 거리]
  const queue = [[0, 0, 0, 1]];
  visited[0][0][0] = true;

  let front = 0;
  while (front < queue.length) {
    const [a, b, broke, length] = queue[front++];

    // 목적지 (N-1, M-1)에 도착한 경우 현재까지의 이동 거리 반환
    if (a === N - 1 && b === M - 1) {
      return length;
    }

    // 상하좌우로 이동
    direction.forEach(([i, j]) => {
      const newX = a + i;
      const newY = b + j;

      // 유효한 범위 안에 있는지 확인
      if (newX >= 0 && newX < N && newY >= 0 && newY < M) {
        // 벽이 아닌 경우 (0)이고, 아직 방문하지 않았다면 이동
        if (Maps[newX][newY] === 0 && !visited[newX][newY][broke]) {
          queue.push([newX, newY, broke, length + 1]);
          visited[newX][newY][broke] = true;
        }
        // 벽인 경우 (1)이고, 아직 벽을 부수지 않은 상태라면 벽을 부수고 이동
        if (Maps[newX][newY] === 1 && broke === 0 && !visited[newX][newY][0]) {
          queue.push([newX, newY, 1, length + 1]);
          visited[newX][newY][1] = true;
        }
      }
    });
  }
  return -1;
}

console.log(BFS());
