const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

// M: 가로 크기, N: 세로 크기, H: 높이(층)
const M = input[0][0];
const N = input[0][1];
const H = input[0][2];

const Maps = [];
let index = 1;

// 3차원 배열로 만들기
for (let h = 0; h < H; h++) {
  const layer = [];
  for (let n = 0; n < N; n++) {
    layer.push(input[index++]);
  }
  Maps.push(layer);
}

// 상, 하, 좌, 우, 위, 아래 방향 설정
const direction = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
];

const queue = []; // BFS 탐색을 위한 큐
let result = 0; // 결과 값 (모든 토마토가 익는 데 걸리는 시간)
let unCount = 0; // 익지 않은 토마토의 개수

for (let k = 0; k < H; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (Maps[k][i][j] === 1) {
        queue.push([k, i, j, 0]); // 익은 토마토 큐에 넣기
      } else if (Maps[k][i][j] === 0) {
        unCount++; // 익지 않은 토마토 개수 세기
      }
    }
  }
}

// 익지 않은 토마토가 없으면 바로 0 출력 후 종료
if (unCount === 0) {
  console.log(0);
  process.exit();
}

let start = 0;
while (start < queue.length) {
  const [z, x, y, count] = queue[start++];
  result = count;

  // 6방향으로 이동
  for (let [k, i, j] of direction) {
    const newZ = z + k;
    const newX = x + i;
    const newY = y + j;

    // 유효한 범위 내에 있고, 익지 않은 토마토(값이 0)인 경우
    if (
      newZ >= 0 &&
      newZ < H &&
      newX >= 0 &&
      newX < N &&
      newY >= 0 &&
      newY < M &&
      Maps[newZ][newX][newY] === 0
    ) {
      Maps[newZ][newX][newY] = 1; // 토마토를 익게 함
      queue.push([newZ, newX, newY, count + 1]); // 큐에 새로운 좌표와 시간 추가
      unCount--; // 익지 않은 토마토 개수 감소
    }
  }
}

// 만약 익지 않은 토마토가 남아있다면 -1 출력, 그렇지 않다면 걸린 시간 출력
console.log(unCount > 0 ? -1 : result);
