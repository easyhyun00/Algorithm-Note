const fs = require('fs');
const input = fs.readFileSync('./input.txt').toString().trim().split('\n');

solution(input);

function solution(input) {
  for (let i = 1; i <= input[0]; i++) {
    const [result, count] = isPalindrome(input[i]);
    console.log(`${result} ${count}`);
  }
}

function isPalindrome(string) {
  // 비교 횟수를 세기 위한 변수
  let cnt = 0;
  // 팰린드롬 여부 결과를 저장할 변수
  let result;
  let len = string.length;

  // 문자열의 절반까지만 순회 (양 끝에서 비교하기 때문)
  for (let i = 0; i <= len / 2; i++) {
    // 비교 횟수 증가
    cnt++;
    // 왼쪽과 오른쪽 문자를 비교
    result = recursion(string[i], string[string.length - 1 - i]);
    // 팰린드롬이 아니면 반복을 종료
    if (result === 0) break;
  }
  // 팰린드롬 여부와 호출 횟수 반환
  return [result, cnt];
}

function recursion(left, right) {
  // 양 끝 문자가 같으면 1, 다르면 0반환
  return left === right ? 1 : 0;
}
