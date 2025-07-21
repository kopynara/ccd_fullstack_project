// js/script.js

// HTML 문서가 완전히 로드되고 파싱되었을 때 JavaScript 코드를 실행합니다.
document.addEventListener('DOMContentLoaded', function() {

    // 오디오 파일들을 미리 로드하여 재생 지연을 줄입니다.
    // HTML의 data-audio-src 속성에 지정된 모든 오디오 파일을 찾아서 미리 로드합니다.
    const audioElements = {}; // 오디오 객체를 저장할 맵
    document.querySelectorAll('[data-audio-src]').forEach(element => {
        const audioSrc = element.dataset.audioSrc;
        if (audioSrc && !audioElements[audioSrc]) { // 중복 로드 방지
            audioElements[audioSrc] = new Audio(audioSrc);
            audioElements[audioSrc].preload = 'auto'; // 미리 로드하도록 설정
            // 로드 에러 방지 (경로 오류 등)
            audioElements[audioSrc].onerror = function() {
                console.warn('오디오 로드 실패:', audioSrc);
            };
        }
    });

    // 오디오 재생 함수: 특정 오디오 파일을 재생합니다.
    function playAudio(src) {
        if (audioElements[src]) {
            audioElements[src].currentTime = 0; // 항상 처음부터 재생
            audioElements[src].play().catch(e => console.log("오디오 재생 오류:", e)); // Promise 반환 시 오류 처리
        }
    }


    // 1. 스크롤에 따른 헤더 배경 변경 기능
    const header = document.getElementById('main-header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. 고객 후기 슬라이더 기능
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    if (testimonialSlider && testimonialItems.length > 0) {
        let currentIndex = 0;
        const slideInterval = 5000;

        // 슬라이더의 너비를 계산하여 각 슬라이드 아이템의 너비를 설정하고 위치를 조정합니다.
        function setSliderWidth() {
            const sliderContainerWidth = testimonialSlider.parentElement.offsetWidth; // 부모 컨테이너의 너비
            testimonialItems.forEach(item => {
                item.style.width = sliderContainerWidth + 'px';
            });
            testimonialSlider.style.width = (testimonialItems.length * sliderContainerWidth) + 'px';

            // 현재 슬라이드의 위치를 즉시 조정 (리사이즈 시 깜빡임 방지)
            const offset = -currentIndex * sliderContainerWidth;
            testimonialSlider.style.transform = `translateX(${offset}px)`;
            testimonialSlider.style.transition = 'none'; // 위치 조정 시에는 전환 효과 없이 즉시 이동
            // 다음 이벤트 루프에서 다시 전환 효과 활성화
            requestAnimationFrame(() => {
                testimonialSlider.style.transition = 'transform 0.5s ease-in-out';
            });
        }

        setSliderWidth(); // 초기 로드 시 설정
        window.addEventListener('resize', setSliderWidth); // 윈도우 크기 변경 시 재설정

        // 다음 슬라이드를 보여주는 함수
        function showNextSlide() {
            currentIndex++;
            if (currentIndex >= testimonialItems.length) {
                currentIndex = 0; // 마지막 슬라이드에서 첫 번째로
            }

            // 한 슬라이드의 너비 = 부모 컨테이너의 너비
            const offset = -currentIndex * testimonialSlider.parentElement.offsetWidth;
            testimonialSlider.style.transform = `translateX(${offset}px)`;
            testimonialSlider.style.transition = 'transform 0.5s ease-in-out';
        }

        setInterval(showNextSlide, slideInterval);
    }


    // 3. '맨 위로' 버튼 기능
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block';
                scrollToTopBtn.style.opacity = '1';
            } else {
                scrollToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    scrollToTopBtn.style.display = 'none';
                }, 300); // CSS transition 시간과 일치시킵니다.
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            playAudio(scrollToTopBtn.dataset.audioSrc); // 버튼 클릭 시 오디오 재생
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. 모든 버튼 및 링크에 사운드 효과 및 픽셀 애니메이션 추가
    // data-audio-src 속성을 가진 모든 요소를 선택합니다.
    const interactiveElements = document.querySelectorAll('[data-audio-src]');

    interactiveElements.forEach(element => {
        const audioSrc = element.dataset.audioSrc; // HTML에서 설정한 오디오 소스 경로

        // 'click' 이벤트에 오디오 재생 추가
        // 버튼과 링크는 클릭 시 사운드 재생
        if (element.tagName === 'A' || element.tagName === 'BUTTON') {
            element.addEventListener('click', function(event) {
                // 'A' 태그의 경우 기본 링크 이동을 막지 않고 사운드만 재생
                // 단, 'hero-section'의 '장작 구경하기' 버튼처럼 내부 앵커 링크는 smooth scroll과 함께 작동
                // 'btn-order'처럼 실제 주문 기능이 없는 버튼은 `event.preventDefault()`로 페이지 이동 방지 고려
                if (element.classList.contains('btn-order')) {
                     // 실제 주문 로직이 없으므로 일단 preventDefault()로 페이지 이동을 막음
                    event.preventDefault(); 
                    alert('픽셀 장작 주문 시스템은 아직 개발 중입니다! 😅');
                }
                
                if (audioSrc) {
                    playAudio(audioSrc);
                }
            });
        }

        // 'mouseover' (마우스 오버) 이벤트에 오디오 재생 및 애니메이션 추가 (일부 요소)
        // 제품 아이템이나 특정 강조 요소에 마우스 오버 시 사운드 재생
        if (element.classList.contains('product-item')) {
            // product-item에 마우스 오버 시 사운드
            element.addEventListener('mouseover', function() {
                if (audioSrc) {
                    playAudio(audioSrc);
                }
                // CSS에서 transform/box-shadow transition이 이미 처리되므로 추가 JS 애니메이션은 불필요
            });
        }
        
        // 메뉴 링크 호버 시 사운드 (선택 사항)
        if (element.closest('#nav-menu') && element.tagName === 'A') {
            element.addEventListener('mouseover', function() {
                // 중복 재생 방지를 위해 잠시 딜레이를 주거나, 이전 사운드가 끝나면 재생하도록 설정
                if (audioSrc && audioElements[audioSrc] && audioElements[audioSrc].paused) {
                    playAudio(audioSrc);
                }
            });
            // 메뉴 링크 클릭 시에도 별도 사운드를 원하면 여기에 추가 (현재는 click 이벤트에 통합)
        }
    });

    // 5. Hero 섹션 텍스트 타이핑 효과 (선택 사항)
    // 픽셀 테마에 어울리는 옛날 게임 대사창 같은 효과
    const heroTitle = document.querySelector('#hero-section .section-title');
    const heroParagraph = document.querySelector('#hero-section p');

    if (heroTitle && heroParagraph) {
        const originalTitle = heroTitle.textContent;
        const originalParagraph = heroParagraph.textContent;
        heroTitle.textContent = ''; // 초기화
        heroParagraph.textContent = ''; // 초기화

        function typeWriter(element, text, delay = 100, callback) {
            let i = 0;
            function type() {
                if (i < text.length) {
                    // 글자 추가 시 픽셀 소리 (선택 사항, 너무 많으면 시끄러울 수 있음)
                    // if (text[i] !== ' ' && (i % 2 === 0)) playAudio('audios/type_effect.mp3');
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, delay);
                } else if (callback) {
                    callback();
                }
            }
            type();
        }

        // 페이지 로드 후 1초 뒤에 타이핑 시작
        setTimeout(() => {
            typeWriter(heroTitle, originalTitle, 80, () => { // 제목 타이핑 속도
                setTimeout(() => {
                    typeWriter(heroParagraph, originalParagraph, 50); // 문단 타이핑 속도
                }, 500); // 제목 타이핑 후 문단 타이핑까지 딜레이
            });
        }, 1000);
    }
});