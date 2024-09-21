const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

const T = input[0];
let idx = 1;

// 상, 하, 좌, 우
const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// BFS(너비 우선 탐색)
const bfs = (maps, startX, startY, M, N) => {
  const queue = [[startX, startY]]; // 시작 지점 큐에 넣음
  maps[startX][startY] = 0; // 방문 여부 표시

  while (queue.length > 0) {
    const [x, y] = queue.shift(); // 큐에서 좌표를 꺼냄

    // 상,하,좌,우 4방향 탐색
    for (const [dx, dy] of direction) {
      const newX = x + dx;
      const newY = y + dy;

      // 새로운 좌표가 유효한 범위 내에 있고, 배추가 심어져 있을 경우
      if (
        newX >= 0 &&
        newX < M &&
        newY >= 0 &&
        newY < N &&
        maps[newX][newY] === 1
      ) {
        maps[newX][newY] = 0; // 방문 처리
        queue.push([newX, newY]); // 새 좌표를 큐에 추가
      }
    }
  }
};

for (let t = 0; t < T; t++) {
  const M = input[idx][0]; // 가로
  const N = input[idx][1]; // 세로
  const K = input[idx][2]; // 심어진 개수

  // M x N 배열 초기화
  const maps = Array.from({ length: M }, () => Array(N).fill(0));

  // 배추의 위치를 입력 받아서 표시
  for (let i = 0; i < K; i++) {
    const x = input[idx + 1 + i][0];
    const y = input[idx + 1 + i][1];
    maps[x][y] = 1;
  }

  // 필요한 지렁이 수
  let wormCount = 0;

  // 배추가 심어진 곳을 발견하면 BFS로 연결된 배추를 모두 방문
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (maps[i][j] === 1) {
        bfs(maps, i, j, M, N);
        wormCount += 1; // 탐색이 끝날 때마다 지렁이 수 증가
      }
    }
  }

  console.log(wormCount);
  idx += K + 1; // 다음 테스트 케이스로 넘어감
}
