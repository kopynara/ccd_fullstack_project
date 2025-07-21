document.addEventListener('DOMContentLoaded', () => {
    const introPage = document.getElementById('intro-page');
    const overlay = document.getElementById('overlay');
    const typingText = document.getElementById('typing-text');
    const textToType = "방준석"; // 타이핑될 텍스트
    let charIndex = 0;

    // 1. 페이지 로드 시 배경 이미지 서서히 나타나기 (기존 유지)
    setTimeout(() => {
        introPage.style.opacity = 1;
    }, 100);

    // 2. 마우스 오버 효과 (기존 유지)
    // 이 리스너들은 계속 활성 상태로 유지합니다.
    introPage.addEventListener('mouseenter', () => {
        introPage.style.filter = 'blur(2px) brightness(90%)';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    });

    introPage.addEventListener('mouseleave', () => {
        introPage.style.filter = 'blur(5px) brightness(70%)';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    });

    // 3. 클릭 시 동작 변경: 이미지 사라짐 + 텍스트 타이핑 + 메인 페이지 전환
    // { once: true } 옵션을 사용하여 클릭 이벤트가 한 번만 실행되도록 합니다.
    introPage.addEventListener('click', () => {
        // 텍스트를 화면 중앙으로 크게 설정
        typingText.style.fontSize = '20vw'; // 원하는 만큼 더 크게 설정 가능
        typingText.style.opacity = 1; // 텍스트 보이게 설정 (초기에는 0)
        
        // 배경 이미지 서서히 사라지게 하기
        introPage.style.filter = 'blur(0px) brightness(0%)'; // 이미지를 완전히 어둡고 선명하게 (사라지는 과정)
        introPage.style.opacity = 0; // 이미지를 완전히 투명하게
        introPage.style.transition = 'filter 1s ease-in-out, opacity 1s ease-in-out'; // 사라지는 시간 조절

        // 타이핑 시작
        typeWriter();

    }, { once: true }); // 이 부분이 중요합니다! 클릭 이벤트를 단 한 번만 처리합니다.

    function typeWriter() {
        if (charIndex < textToType.length) {
            typingText.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100); // 글자 하나당 타이핑 속도 조절 (ms)
        } else {
            // 타이핑 완료 후 잠시 대기하다가 텍스트 번쩍 사라지고 페이지 전환
            setTimeout(() => {
                // '번쩍' 사라지는 효과를 위해 opacity를 0으로 즉시 변경
                typingText.style.transition = 'opacity 0.1s ease-out'; // 빠른 전환
                typingText.style.opacity = 0;

                // 텍스트가 사라진 직후 메인 페이지로 전환
                setTimeout(() => {
                    window.location.href = 'index.html'; // 메인 페이지 경로
                }, 100); // 텍스트 사라짐 + 짧은 대기 시간
            }, 1000); // 타이핑이 모두 완료된 후 '방준석' 글자가 유지되는 시간 (ms)
        }
    }
});