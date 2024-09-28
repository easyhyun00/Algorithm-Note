const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .split('\n')
  .map((item) => item.split(' ').map(Number));

for (let c = 0; c < input[0][0]; c++) {
  const I = input[3 * c + 1][0]; // 체스판의 크기 I (I x I 크기)
  const current = input[3 * c + 2]; // 현재 나이트의 위치 (current)
  const target = input[3 * c + 3]; // 목표 위치 (target)

  // 방문 여부를 확인하는 2차원 배열
  const visited = Array.from(Array(I), () => Array(I).fill(false));

  // 나이트가 이동할 수 있는 8가지 방향을 정의
  const directions = [
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
    [-1, -2],
    [1, -2],
    [-1, 2],
    [1, 2],
  ];

  // BFS (너비 우선 탐색)
  function BFS(x, y, move) {
    const queue = [[x, y, move]]; // 큐에 현재 x, y 좌표와 이동 횟수를 저장
    visited[x][y] = true;

    // 시작 위치가 목표 위치와 같다면, 0 반환
    if (x === target[0] && y === target[1]) {
      return 0;
    }

    // BFS 탐색 시작
    while (queue.length) {
      const [i, j, mv] = queue.shift();

      // 이동
      for (let [a, b] of directions) {
        const newX = a + i;
        const newY = b + j;

        // 체스판 내부에 있고, 아직 방문하지 않았다면
        if (
          newX >= 0 &&
          newX < I &&
          newY >= 0 &&
          newY < I &&
          !visited[newX][newY]
        ) {
          // 목표 위치라면, 이동 횟수를 반환
          if (newX === target[0] && newY === target[1]) {
            return mv + 1;
          }
          visited[newX][newY] = true;
          queue.push([newX, newY, mv + 1]);
        }
      }
    }
    return -1; // 목표 위치에 도달할 수 없는 경우 -1 반환
  }

  const result = BFS(current[0], current[1], 0);
  console.log(result);
}
