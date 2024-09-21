const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map((el) => el.split(' ').map(Number));

for (let i = 0; i < input.length - 1; i++) {
  const K = input[i][0];
  const arr = input[i].slice(1, K + 1);

  function dfs(list, last) {
    // 리스트에 6개의 숫자가 있으면 출력
    if (list.length === 6) {
      console.log(list.join(' '));
      return;
    }

    // 현재 위치부터 가능한 숫자를 선택
    for (let i = last; i < arr.length; i++) {
      // 중복된 숫자는 선택하지 않음
      if (list.includes(arr[i])) continue;

      list.push(arr[i]); // 숫자를 리스트에 추가
      dfs([...list], i); // 추가한 숫자를 기반으로 재귀 호출
      list.pop(); // 백트래킹: 리스트에서 숫자를 다시 제거
    }
  }
  if (i !== 0) console.log('');

  // DFS 탐색 시작
  dfs([], 0);
}
