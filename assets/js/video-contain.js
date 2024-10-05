document.addEventListener('DOMContentLoaded', function () {
    let currentContentId = { Ani: 1, Game: 1, Movie: 1 }; // 存储当前内容 ID 的对象
    fetch('./DB/data.json')
        .then(response => response.json())
        .then(data => {
            const contents = data;
            const rootpath = contents.src;
            document.querySelectorAll('.left_change, .right_change').forEach(button => {
                button.addEventListener('click', function () {
                    const sectionId = button.parentNode.parentNode.id;
                    const direction = button.classList.contains('left_change') ? -1 : 1;

                    currentContentId[sectionId] = (currentContentId[sectionId] + direction + contents[sectionId].length - 1) % contents[sectionId].length + 1;
                    loadContent(sectionId, currentContentId[sectionId]);
                });
            });
            function loadContent(sectionId, contentId) {
                const content = contents[sectionId].find(item => item.id === contentId);
                const section = document.getElementById(sectionId);
                const path = "." + rootpath + sectionId + "/";

                const video = section.querySelector('video');
                video.classList.add('fadeout');
                video.addEventListener('transitionend', function () {
                    if (!video.classList.contains('fadeout')) return; // 如果不是淡出状态则不执行
                    section.querySelector('.overlay-text h1').textContent = content.title;
                    section.querySelector('.overlay-text p').textContent = content.description;
                    video.poster = path + content.title + ".jpg";
                    section.querySelector('video source').src = path + content.title + ".mp4";
                    video.load();
                    video.classList.remove('fadeout');
                    video.play().catch((error) => {
                        console.error('Error playing video:', error);
                    });
                    video.removeEventListener('transitionend', arguments.callee);
                }, { once: true });
                section.querySelector('.overlay-text a').href = content.link_url;
            }
        });
});

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


document.addEventListener('scroll', function () {
    const overlayTexts = document.querySelectorAll('.overlay-text');
    const details = document.querySelectorAll('.detail');
    overlayTexts.forEach(overlayText => {
        const overlayText_rect = overlayText.getBoundingClientRect();

        // 检查每个元素是否进入视口
        if (overlayText_rect.top <= window.innerHeight && overlayText_rect.bottom >= 0) {
            overlayText.classList.add('active');
        }
    });
    details.forEach(detail => {
        const detail_rect = detail.getBoundingClientRect();

        // 检查每个元素是否进入视口
        if (detail_rect.top <= window.innerHeight && detail_rect.bottom >= 0) {
            detail.classList.add('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.background-video');
    const viewportHeight = window.innerHeight;

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const video = entry.target; // 当前的目标视频
            if (entry.isIntersecting && entry.intersectionRect.height > viewportHeight / 2) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, {
        threshold: [0, 0.2, 0.3, 0.4, 0.45, 0.55, 0.6, 0.7, 0.8, 1]
    });
    videos.forEach((video) => {
        if (video.tagName === 'VIDEO') { // 确保是 VIDEO 元素
            videoObserver.observe(video);
        }
    });
});