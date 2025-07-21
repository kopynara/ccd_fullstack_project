// // 1. ID로 요소 선택하기 (ID는 #을 붙여요)
// const mainTitle = document.querySelector('#mainTitle');
// console.log('ID로 찾은 제목:', mainTitle.textContent); // "안녕하세요, querySelector!"

// // 2. 클래스로 요소 선택하기 (클래스는 .을 붙여요. 첫 번째 요소만 선택)
// const firstParagraph = document.querySelector('.intro-text');
// console.log('클래스로 찾은 첫 단락:', firstParagraph.textContent); // "이것은 첫 번째 단락입니다."

// // 3. 태그 이름으로 요소 선택하기 (태그 이름 그대로 사용. 첫 번째 요소만 선택)
// const firstDiv = document.querySelector('div');
// console.log('태그로 찾은 첫 div:', firstDiv.tagName); // "DIV"

// // 4. 버튼 클릭 시 ID로 찾은 제목의 텍스트 변경
// const changeButton = document.querySelector('#changeButton');
// changeButton.addEventListener('click', function() {
//     mainTitle.textContent = 'querySelector로 제목을 바꿨습니다!';
// });


const mainTitle = document.querySelector('#mainTitle');
console.log('ID로 찾은 제목:', mainTitle.textContent);

const firstParagraph = document.querySelector('.intro-text');
console.log('클래스로 찾은 첫 단락:', firstParagraph.textContent);

const firstDiv = document.querySelector('div');
console.log('태그로 찾은 첫 div:', firstDiv.tagName);

const changeButton = document.querySelector('#changeButton');
changeButton.addEventListener('click', function() {
    mainTitle.textContent = 'querySelector로 제목을 바꿨습니다!'
});

