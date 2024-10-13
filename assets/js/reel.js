document.addEventListener('DOMContentLoaded', function () {
    fetch('../DB/Movie/commends.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.reel');
            let currentIndex = 0; // 当前显示的图片索引
            const itemsPerPage = 10; // 每页显示的图片数量
            const totalItems = data.Movie.length; // 总图片数量
            const path = ".." + data.src;

            function createItem(movie) {
                const item = document.createElement('div');
                item.className = 'item';
                const title = document.createElement('h2');
                title.textContent = movie.title;
                item.appendChild(title);
                const img = document.createElement('img');
                img.src = path + movie.title + ".jpg"; // 假设 video_url 是图片地址
                item.appendChild(img);

                item.addEventListener('click', function () {
                    showOverlay(movie);
                });
                return item;
            }

            function displayItems(startIndex) {
                for (let i = startIndex; i < totalItems; i++) {
                    const item = createItem(data.Movie[i]);
                    container.appendChild(item);
                }
                container.style.width = "calc(10 * 200px + 9 * 10px)";
                container.style.left = "0px"
            }

            function slideItems(direction) {
                const oldLeftValue = container.style.left;
                let newLeftValue;
                let width = parseInt(container.style.width.match(/\d+/)[0], 10);
                let liftWidth = document.body.clientWidth - 100;
                if (direction === 'right') {
                    newLeftValue = parseInt(oldLeftValue, 10) - liftWidth;
                    if ((document.body.clientWidth - newLeftValue - 100) > width) {

                        newLeftValue = document.body.clientWidth - width - 100;
                    }
                    console.log((document.body.clientWidth - newLeftValue));
                    console.log((container.style.width));
                } else if (direction === 'left') {

                    newLeftValue = parseInt(oldLeftValue, 10) + liftWidth;
                    if (newLeftValue > 0) {
                        newLeftValue = 0;
                    }
                }
                container.style.left = newLeftValue + "px";
                container.style.transition = '0.5s ease-out'; // 添加动画效果
            }

            displayItems(currentIndex); // load items

            const rightChangeBtn = document.querySelector('.right_change');
            rightChangeBtn.addEventListener('click', function () {
                slideItems('right');
            });

            const leftChangeBtn = document.querySelector('.left_change');
            leftChangeBtn.addEventListener('click', function () {
                slideItems('left');
            });

            let startX = 0;

            container.addEventListener('touchstart', function (event) {
                const touch = event.targetTouches[0];
                startX = touch.pageX;
                console.log(container.offsetLeft);
            }, false);
            container.addEventListener('touchmove', function (event) {
                const touch = event.targetTouches[0];
                let endX = touch.pageX;
                let deltaX = endX - startX;
                let newleft = (container.offsetLeft - 50 + deltaX);
                if (newleft > 0) {
                    newleft = 0;
                }
                if (newleft < document.body.clientWidth - container.offsetWidth - 100) {
                    newleft = document.body.clientWidth - container.offsetWidth - 100;
                }
                container.style.left = newleft + "px";
                console.log(container.offsetLeft);
                console.log(deltaX);
                console.log(newleft);
                startX = endX;
            }, false);

            // item overlay
            function showOverlay(movie) {
                const overlay = document.querySelector('.overlay');
                const imgElement = overlay.querySelector('img');
                // imgElement.src = movie.video_url.slice(0, -4) + ".jpg";
                const titleElement = overlay.querySelector('h1');
                titleElement.textContent = movie.title;
                const descriptionElement = overlay.querySelector('.flexcontent p');
                descriptionElement.textContent = movie.commend;
                overlay.classList.add("fadeIn");
                overlay.classList.remove("fadeOut");
            }

            const backBtn = document.querySelector('.updates-back');
            const overlay = document.querySelector('.overlay');
            backBtn.addEventListener('click', function () {
                overlay.classList.remove("fadeIn");
                overlay.classList.add("fadeOut");
            });
            overlay.addEventListener('dblclick', function () {
                overlay.classList.remove("fadeIn");
                overlay.classList.add("fadeOut");
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});