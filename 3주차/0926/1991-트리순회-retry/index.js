const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

const N = Number(input[0]);
let result = '';

const tree = {};
for (let i = 1; i <= N; i++) {
  const [node, left, right] = input[i].split(' ');
  tree[node] = [left, right];
}

// 전위 순회
// 현재 노드 → 왼쪽 자식 → 오른쪽 자식
function preOrder(node) {
  if (node === '.') return; // 자식 노드가 없는 경우 더 이상 순회 X
  const [left, right] = tree[node];
  result += node;
  preOrder(left);
  preOrder(right);
}

// 중위 순회
// 왼쪽 자식 → 현재 노드 → 오른쪽 자식
function inOrder(node) {
  if (node === '.') return;
  const [left, right] = tree[node];
  inOrder(left);
  result += node;
  inOrder(right);
}

// 후위 순회
// 왼쪽 자식 → 오른쪽 자식 → 현재 노드
function postOrder(node) {
  if (node === '.') return;
  const [left, right] = tree[node];
  postOrder(left);
  postOrder(right);
  result += node;
}

preOrder('A');
result += '\n';
inOrder('A');
result += '\n';
postOrder('A');

console.log(result);
