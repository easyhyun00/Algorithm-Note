const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

const N = input[0][0];
const node = input.slice(1, N);

// 그래프를 N + 1 크기로 초기화
const graph = Array.from(Array(N + 1), () => []);

// 그래프 양방향 연결
node.forEach(([a, b]) => {
  graph[a].push(b);
  graph[b].push(a);
});

const queue = [];
const parents = [];

function bfs() {
  parents[1] = 1; // 루트노드

  for (let next of graph[1]) {
    parents[next] = 1;
    queue.push(next);
  }

  while (queue.length) {
    const current = queue.shift(); // 큐에서 현재 노드를 꺼냄

    // 부모가 없는 노드일 경우, 부모로 설정하고 큐에 노드 추가
    for (let next of graph[current]) {
      if (!parents[next]) {
        parents[next] = current;
        queue.push(next);
      }
    }
  }
}

bfs(); // BFS 실행

for (let i = 2; i < parents.length; i++) {
  console.log(parents[i]);
}
