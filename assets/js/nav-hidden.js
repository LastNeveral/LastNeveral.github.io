let lastScrollY = window.scrollY;
const navbar = document.getElementById('header');

function handleScroll() {
    if (window.scrollY > lastScrollY) {
        navbar.style.top = '-100px';
    } else {
        navbar.style.top = '0';
    }
    lastScrollY = window.scrollY;
}

window.addEventListener('scroll', handleScroll);