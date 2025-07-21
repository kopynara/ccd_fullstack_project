document.addEventListener('DOMContentLoaded', () => {
    // 모든 메인 카드 내의 이미지를 선택합니다.
    const cardImages = document.querySelectorAll('.main-card img');

    // 각 이미지에 클릭 이벤트 리스너를 추가합니다.
    cardImages.forEach(img => {
        img.addEventListener('click', () => {
            // data-href 속성에서 이동할 URL을 가져옵니다.
            const targetUrl = img.dataset.href;
            if (targetUrl) {
                // 해당 URL로 페이지를 이동합니다.
                window.location.href = targetUrl;
            }
        });
    });

    // 만약 '자세히 보기' 버튼이 있다면 (index.html의 hero-section - 기존 코드)
    // 이 부분은 현재 index.html에서 hero-section을 제거했기 때문에 필요 없을 수 있습니다.
    // 만약 다시 hero-section을 추가하고 이 버튼이 필요하다면 유지하세요.
    const exploreButton = document.getElementById('explore-button');
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            // 솔로 앨범 섹션으로 스크롤 (또는 bjs_solo_album.html로 이동하도록 변경 가능)
            const soloAlbumSection = document.getElementById('solo-album');
            if (soloAlbumSection) {
                soloAlbumSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});