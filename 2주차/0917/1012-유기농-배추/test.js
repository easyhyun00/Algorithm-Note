// 정점의 수
const n = 6;

// 간선 정보
const edge = [
  [1, 2],
  [2, 6],
  [2, 4],
  [4, 3],
  [3, 2],
  [3, 5],
];

// n+1 크기의 리스트 생성 (인덱스 0을 비워둠)
const graph = Array.from(Array(n + 1), () => []);

edge.forEach(([x, y]) => {
  graph[x].push(y);
  graph[y].push(x);
});

for (let i = 1; i <= n; i++) {
  console.log(`${i}: [${graph[i].join(', ')}]`);
}
