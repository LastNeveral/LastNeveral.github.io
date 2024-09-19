let currentContentId = { Ani: 1, Game: 1, Movie: 1 };
// 加载 JSON 数据

let contents;
fetch('./DB/data.json')
    .then(response => response.json())
    .then(data => {
        contents = data;
        loadContent('Ani', currentContentId['Ani']); // 初始化时加载默认内容
    });


// 处理左右按钮点击事件
document.querySelectorAll('.left_change, .right_change').forEach(button => {
    button.addEventListener('click', (event) => {
        const sectionId = event.target.id;
        const direction = event.target.classList.contains('left_change') ? -1 : 1;

        currentContentId[sectionId] = (currentContentId[sectionId] + direction + contents[sectionId].length - 1) % contents[sectionId].length + 1;
        loadContent(sectionId, currentContentId[sectionId]);
    });
});

function loadContent(sectionId, contentId) {
    const content = contents[sectionId].find(item => item.id === contentId);

    const section = document.getElementById(sectionId);
    section.querySelector('.overlay-text h1').textContent = content.title;
    section.querySelector('.overlay-text p').textContent = content.description;
    section.querySelector('video').poster = content.video_url.slice(0, -4) + ".jpg";
    section.querySelector('video source').src = content.video_url;
    section.querySelector('video').load();
    section.querySelector('.overlay-text a').href = content.link_url;
}