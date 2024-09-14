const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

solution(input);

function solution(input) {
  let card_count = Number(input[0]);
  let select_count = Number(input[1]);

  let set = new Set();

  function bfs(number, index) {
    // 선택한 카드의 개수가 선택할 개수가 되면
    // 문자열로 만들어 set에 추가
    if (number.length === select_count) {
      set.add(number.join(''));
      return;
    }

    for (let i = 0; i < card_count; i++) {
      // 이미 선택한 카드는 건너뜀
      if (index.includes(i)) continue;
      // 선택한 카드에 인덱스를 배열에 넣음
      index.push(i);
      // 선택한 카드 값을 배열에 넣음
      number.push(input[i + 2]);
      // 선택한 카드와 인덱스를 사용해 재귀 호출
      bfs([...number], [...index]);
      // 백트래킹: 선택한 카드를 다시 원상태로 돌림
      index.pop();
      // 백트래킹: 인덱스도 원상태로 돌림
      number.pop();
    }
  }

  bfs([], []);

  console.log(set.size);
}
