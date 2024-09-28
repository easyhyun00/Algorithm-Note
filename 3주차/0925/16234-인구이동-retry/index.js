const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

const N = input[0][0];
const L = input[0][1];
const R = input[0][2];

const Maps = input.slice(1);

// 상하좌우
const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// 인구 이동 날짜
let days = 0;

// 탐색
function BFS(i, j, visited) {
  const queue = [[i, j]]; // 탐색을 위한 큐
  const union = [[i, j]]; // 연합에 포함된 나라들
  let person_count = Maps[i][j]; // 연합 내 총 인구 수

  visited[i][j] = true;

  while (queue.length) {
    const [ii, jj] = queue.shift();

    // 상하좌우 이동
    direction.forEach(([x, y]) => {
      const newX = x + ii;
      const newY = y + jj;

      // 새로운 좌표가 범위 안에 있고, 아직 방문하지 않았다면
      if (
        newX >= 0 &&
        newX < N &&
        newY >= 0 &&
        newY < N &&
        !visited[newX][newY]
      ) {
        // 인접한 나라와의 인구 차이 계산
        const diff = Math.abs(Maps[ii][jj] - Maps[newX][newY]);

        // 조건을 만족하면 방문 처리하고 연합에 추가
        if (diff >= L && diff <= R) {
          visited[newX][newY] = true;
          queue.push([newX, newY]);
          union.push([newX, newY]);
          person_count += Maps[newX][newY];
        }
      }
    });
  }

  // [인구 이동 계산]
  // 연합 내 나라의 인구 수를 평균으로 나누고, 새로운 인구 수로 갱신
  const newPerson = Math.floor(person_count / union.length);
  union.forEach(([x, y]) => {
    Maps[x][y] = newPerson;
  });

  // 연합이 2개 이상의 나라를 포함했다면 인구 이동이 발생했음을 의미
  return union.length > 1;
}

// 인구 이동이 더 이상 일어나지 않을 때까지 반복
while (1) {
  // 방문 여부 배열 (날짜가 지날 때마다 새로 초기화)
  const visited = Array.from(Array(N), () => Array(N).fill(false));
  // 인구 이동이 일어났는지 여부
  let isMove = false;

  // 모든 나라를 순회하며 BFS로 연합을 찾음
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 아직 방문하지 않은 나라라면
      if (!visited[i][j]) {
        // 인구 이동이 일어났다면 true
        if (BFS(i, j, visited)) {
          isMove = true;
        }
      }
    }
  }

  // 인구 이동이 더 이상 일어나지 않으면 종료
  if (!isMove) break;
  // 인구 이동이 일어났다면 날짜 증가
  days++;
}

console.log(days);
