const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

const count = input[0][0];
const pair = input[1][0];

const array = input.slice(2, 2 + pair);

// 컴퓨터 간 연결을 나타낼 그래프 초기화
const graph = Array.from(Array(count + 1), () => []);

// 그래프 구성 (양방향 연결)
array.forEach(([a, b]) => {
  graph[a].push(b);
  graph[b].push(a);
});

// 노드의 방문 여부를 저장하는 배열 초기화
const visited = Array(count + 1).fill(0);

// 시작 1번
const queue = [1];
visited[1] = 1;

while (queue.length) {
  // 현재 노드를 큐에서 꺼냄
  const current = queue.shift();

  // 현재 노드와 연결된 노드들을 탐색
  // 아직 방문하지 않을 경우 큐에 추가하여 계속 탐색
  graph[current].forEach((next) => {
    if (!visited[next]) {
      visited[next] = 1;
      queue.push(next);
    }
  });
}

// 1번 컴퓨터를 제외한 연결된 컴퓨터의 수를 출력
console.log(visited.filter((item) => item).length - 1);
