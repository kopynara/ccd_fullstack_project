// js/script.js

// HTML 문서가 완전히 로드되고 파싱되었을 때 JavaScript 코드를 실행합니다.
document.addEventListener('DOMContentLoaded', function() {

    // 1. 스크롤에 따른 헤더 배경 변경 기능
    const header = document.getElementById('main-header'); // 'main-header' ID를 가진 요소를 가져옵니다.

    // 헤더 요소가 존재하는지 확인하여, 없는 페이지에서는 이 기능을 실행하지 않도록 합니다.
    if (header) {
        window.addEventListener('scroll', function() {
            // 사용자가 스크롤할 때마다 이 함수가 실행됩니다.
            // window.scrollY는 현재 스크롤 위치(세로 스크롤)를 나타냅니다.
            // 스크롤 위치가 50px보다 크면 (즉, 스크롤을 어느 정도 내리면)
            if (window.scrollY > 50) {
                // 헤더의 배경색을 불투명하게 변경하는 'scrolled' 클래스를 추가합니다.
                header.classList.add('scrolled');
            } else {
                // 스크롤 위치가 50px 이하면 (맨 위로 다시 올라오면)
                // 'scrolled' 클래스를 제거하여 원래 투명한 배경으로 되돌립니다.
                header.classList.remove('scrolled');
            }
        });
    }


    // 2. 고객 후기 슬라이더 기능
    const testimonialSlider = document.querySelector('.testimonial-slider'); // 슬라이더 컨테이너
    const testimonialItems = document.querySelectorAll('.testimonial-item'); // 각 후기 아이템들

    // 슬라이더 컨테이너와 아이템들이 모두 존재하고, 아이템 개수가 0보다 클 때만 슬라이더 기능을 실행합니다.
    if (testimonialSlider && testimonialItems.length > 0) {
        let currentIndex = 0; // 현재 보여지는 슬라이드의 인덱스
        const slideInterval = 5000; // 슬라이드 전환 간격 (5초 = 5000밀리초)

        // 슬라이더의 너비를 계산하여 각 슬라이드 아이템의 너비를 설정합니다.
        // 이렇게 해야 슬라이드 전환 시 부드럽게 움직일 수 있습니다.
        function setSliderWidth() {
            const sliderContainerWidth = testimonialSlider.offsetWidth; // 슬라이더 컨테이너의 현재 너비 (가로 크기)

            // 각 슬라이드 아이템의 너비를 슬라이더 컨테이너의 너비와 동일하게 설정합니다.
            testimonialItems.forEach(item => {
                item.style.width = sliderContainerWidth + 'px';
            });

            // 모든 슬라이드 아이템이 가로로 나열될 수 있도록 슬라이더 컨테이너의 총 너비를 설정합니다.
            // (각 아이템 너비 * 아이템 개수)
            testimonialSlider.style.width = (testimonialItems.length * sliderContainerWidth) + 'px';

            // 슬라이더 너비가 변경되면 현재 슬라이드의 위치도 다시 조정합니다.
            // (창 크기 조절 등으로 인해 위치가 어긋날 수 있으므로)
            const offset = -currentIndex * sliderContainerWidth;
            testimonialSlider.style.transform = `translateX(${offset}px)`;
        }

        // 초기 로드 시 슬라이더 너비를 설정하고 첫 슬라이드 위치를 조정합니다.
        setSliderWidth();

        // 윈도우 크기가 변경될 때마다 (예: 사용자가 브라우저 창 크기 조절 시)
        // 슬라이더 너비를 재설정하여 반응형으로 대응하도록 합니다.
        window.addEventListener('resize', setSliderWidth);

        // 다음 슬라이드를 보여주는 함수
        function showNextSlide() {
            currentIndex++; // 현재 슬라이드 인덱스를 1 증가시킵니다.

            // 만약 마지막 슬라이드를 넘어가면 다시 첫 번째 슬라이드(인덱스 0)로 돌아갑니다.
            if (currentIndex >= testimonialItems.length) {
                currentIndex = 0;
            }

            // 슬라이드 아이템의 너비는 `setSliderWidth` 함수에서 이미 설정되었으므로,
            // 여기서 다시 계산할 필요 없이 `testimonialSlider.offsetWidth` (슬라이더 컨테이너의 너비 = 한 슬라이드의 너비)를 사용합니다.
            const offset = -currentIndex * testimonialSlider.offsetWidth; // 이동할 거리 계산
            testimonialSlider.style.transform = `translateX(${offset}px)`; // X축으로 이동
            testimonialSlider.style.transition = 'transform 0.5s ease-in-out'; // 부드러운 전환 효과
        }

        // `setInterval`을 사용하여 `slideInterval` (5초)마다 `showNextSlide` 함수를 자동으로 호출합니다.
        setInterval(showNextSlide, slideInterval);
    }


    // 3. '맨 위로' 버튼 기능
    const scrollToTopBtn = document.getElementById('scrollToTopBtn'); // 'scrollToTopBtn' ID를 가진 버튼 요소를 가져옵니다.

    // 버튼 요소가 존재하는지 확인하여, 없는 페이지에서는 이 기능을 실행하지 않도록 합니다.
    if (scrollToTopBtn) {
        // 사용자가 스크롤할 때마다 버튼을 보여주거나 숨기는 함수를 실행합니다.
        window.addEventListener('scroll', function() {
            // 현재 스크롤 위치가 300px보다 크면 (즉, 페이지를 어느 정도 아래로 스크롤하면)
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'block'; // 버튼을 보이게 합니다.
                scrollToTopBtn.style.opacity = '1'; // 완전히 불투명하게 만듭니다. (CSS transition과 함께 부드럽게 나타남)
            } else {
                scrollToTopBtn.style.opacity = '0'; // 버튼을 투명하게 만듭니다. (CSS transition과 함께 부드럽게 사라짐)
                // 투명하게 만든 후 0.3초 뒤에 완전히 숨깁니다.
                // 이 `setTimeout`은 CSS의 `transition` 시간(0.3초)과 맞춰주면 자연스럽습니다.
                setTimeout(() => {
                    scrollToTopBtn.style.display = 'none';
                }, 300);
            }
        });

        // '맨 위로' 버튼 클릭 시 페이지 상단으로 부드럽게 스크롤하는 기능
        scrollToTopBtn.addEventListener('click', function() {
            // `window.scrollTo()`는 특정 좌표로 스크롤합니다.
            // `top: 0`은 페이지의 맨 위로 스크롤하라는 의미입니다.
            // `behavior: 'smooth'`는 스크롤을 부드럽게 애니메이션화 해주는 효과를 추가합니다 (최신 브라우저 지원).
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});