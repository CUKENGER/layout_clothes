const noveltyBox = document.querySelector('.slider');
let isNoveltyDown = false;
let startNoveltyX;
let scrollNoveltyLeft;
let isDragging = false;


noveltyBox.addEventListener('touchstart', (event) => {
  isNoveltyDown = true;
  startNoveltyX = event.touches[0].clientX;
  scrollNoveltyLeft = noveltyBox.scrollLeft;
});

noveltyBox.addEventListener('touchend', () => {
  isNoveltyDown = false;
});

noveltyBox.addEventListener('touchmove', (event) => {
  if (!isNoveltyDown) return;
  event.preventDefault();
  const x = event.touches[0].clientX;
  const walk = (x - startNoveltyX) * 2;
  noveltyBox.scrollLeft = scrollNoveltyLeft - walk;
});

let isNoveltyDragging = false;
let noveltyStartX;
let noveltyScrollLeft;
let velocity = 0;
let momentumID;

noveltyBox.addEventListener('mousedown', (event) => {
    if (event.button !== 0) return;
    isNoveltyDown = true; 
    startNoveltyX = event.pageX - noveltyBox.offsetLeft; 
    scrollNoveltyLeft = noveltyBox.scrollLeft; 
});

noveltyBox.addEventListener('mouseleave', () => {
    isNoveltyDown = false;         
});

noveltyBox.addEventListener('mouseup', () => {
    isNoveltyDown = false; 
});

noveltyBox.addEventListener('mousemove', (event) => {
    if (!isNoveltyDown) return; 
    event.preventDefault(); 
    const x = event.pageX - noveltyBox.offsetLeft; 
    const walk = (x - startNoveltyX) * 2; 
    noveltyBox.scrollLeft = scrollNoveltyLeft - walk; 
});
  
// wheel
noveltyBox.addEventListener('wheel', (e) => {
    e.preventDefault();
    velocity += e.deltaY * 0.1;
    beginMomentumTracking();
});

function beginMomentumTracking() {
    cancelMomentumTracking();
    momentumID = requestAnimationFrame(momentumLoop);
}

function cancelMomentumTracking() {
    cancelAnimationFrame(momentumID);
}

function momentumLoop() {
    noveltyBox.scrollLeft += velocity;
    velocity *= 0.95;
    if (Math.abs(velocity) > 0.5) {
        momentumID = requestAnimationFrame(momentumLoop);
    }
}

// 
function smoothScrollTo(element, target, duration) {
    const start = element.scrollLeft;
    const change = target - start;
    const startTime = performance.now();

    function animateScroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        element.scrollLeft = start + change * progress;
        if (progress < 1) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}



document.addEventListener('DOMContentLoaded', () => {
    const noveltyBox = document.querySelector('.slider');
    const arrows = document.querySelectorAll('.arrow');
    const dotsContainer = document.querySelector('.dots');
    const dotsMobileContainer = document.querySelector('.dots--mobile');
    const dotsSmallMobileContainer = document.querySelector('.dots--small-mobile');
    const dotTemplate = '<img class="dot" src="assets/unfill_dot.svg" alt="dot">';
    const dotMobileTemplate = '<img class="dot--mobile" src="assets/unfill_dot.svg" alt="dot">';
    const dotSmallMobileTemplate = '<img class="dot--small-mobile" src="assets/unfill_dot.svg" alt="dot">';
    let dotCount = 3; // Начальное количество точек
    let viewportWidth;

    function createDots(count, container, template) {
        container.innerHTML = ''; // Очистить предыдущие точки
        for (let i = 0; i < count; i++) {
            container.innerHTML += template;
        }
    }

    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        const dotsMobile = document.querySelectorAll('.dot--mobile');
        const dotsSmallMobile = document.querySelectorAll('.dot--small-mobile');
        console.log('Updating dots...');
        let slideWidth;

        if (viewportWidth > 720) {
            slideWidth = document.querySelector('.slider_item').clientWidth * 4 + 20;
            const currentIndex = Math.round(noveltyBox.scrollLeft / slideWidth);
            dots.forEach((dot, index) => {
                dot.src = index === currentIndex ? 'assets/fill_dot.svg' : 'assets/unfill_dot.svg';
            });
        } else if (viewportWidth > 500) {
            slideWidth = document.querySelector('.slider_item').clientWidth * 4 - 140;
            const currentIndex = Math.round(noveltyBox.scrollLeft / slideWidth);
            dotsMobile.forEach((dot, index) => {
                dot.src = index === currentIndex ? 'assets/fill_dot.svg' : 'assets/unfill_dot.svg';
            });
        } else {
            slideWidth = document.querySelector('.slider_item').clientWidth * 4 - 315;
            const currentIndex = Math.round(noveltyBox.scrollLeft / slideWidth);
            dotsSmallMobile.forEach((dot, index) => {
                dot.src = index === currentIndex ? 'assets/fill_dot.svg' : 'assets/unfill_dot.svg';
            });
        }
    }

    function updateDotCount() {
        viewportWidth = window.innerWidth;
        console.log(`Viewport width: ${viewportWidth}`);
        if (viewportWidth > 720) {
            dotCount = 3;
            createDots(dotCount, dotsContainer, dotTemplate);
            dotsContainer.style.display = 'flex';
            dotsMobileContainer.style.display = 'none';
            dotsSmallMobileContainer.style.display = 'none';
        } else if (viewportWidth > 525) {
            dotCount = 4;
            createDots(dotCount, dotsMobileContainer, dotMobileTemplate);
            dotsContainer.style.display = 'none';
            dotsMobileContainer.style.display = 'flex';
            dotsSmallMobileContainer.style.display = 'none';
        } else {
            dotCount = 6;
            createDots(dotCount, dotsSmallMobileContainer, dotSmallMobileTemplate);
            dotsContainer.style.display = 'none';
            dotsMobileContainer.style.display = 'none';
            dotsSmallMobileContainer.style.display = 'flex';
        }
        updateDots(); // Обновляем точки
    }

    // Обработчик для стрелок
    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const direction = arrow.classList.contains('arrow--left') ? -1 : 1;
            let slideWidth;

            if (viewportWidth > 720) {
                slideWidth = document.querySelector('.slider_item').clientWidth * 4 + 20;
            } else if (viewportWidth > 500) {
                slideWidth = document.querySelector('.slider_item').clientWidth * 4 - 140;
            } else {
                slideWidth = document.querySelector('.slider_item').clientWidth * 4 - 315;
            }

            const targetScrollLeft = noveltyBox.scrollLeft + direction * slideWidth;
            smoothScrollTo(noveltyBox, targetScrollLeft, 600);
            updateDots();
        });
    });

    // Обработчик для точек
    dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot')) {
            const index = Array.from(dotsContainer.children).indexOf(e.target);
            const slideWidth = document.querySelector('.slider_item').clientWidth * 4 + 20;
            const targetScrollLeft = index * slideWidth;
            smoothScrollTo(noveltyBox, targetScrollLeft, 600);
            updateDots();
        }
    });

    dotsMobileContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot--mobile')) {
            const index = Array.from(dotsMobileContainer.children).indexOf(e.target);
            const slideWidth = document.querySelector('.slider_item').clientWidth * 4 - 140;
            const targetScrollLeft = index * slideWidth;
            smoothScrollTo(noveltyBox, targetScrollLeft, 600);
            updateDots();
        }
    });

    dotsSmallMobileContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('dot--small-mobile')) {
            const index = Array.from(dotsSmallMobileContainer.children).indexOf(e.target);
            const slideWidth = document.querySelector('.slider_item').clientWidth * 4 - 315;
            const targetScrollLeft = index * slideWidth;
            smoothScrollTo(noveltyBox, targetScrollLeft, 600);
            updateDots();
        }
    });

    function smoothScrollTo(element, target, duration) {
        const start = element.scrollLeft;
        const change = target - start;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            element.scrollLeft = start + change * progress;
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    // Обновляем точки при изменении размера окна
    window.addEventListener('resize', updateDotCount);

    // Первоначальная установка точек
    updateDotCount();

    // Обновляем точки при прокрутке
    noveltyBox.addEventListener('scroll', updateDots);
});

