// logos slide
const container = document.querySelector('.logos');
let isDown = false; 
let startX; 
let scrollLeft; 

container.addEventListener('touchstart', (event) => {
  isDown = true;
  startX = event.touches[0].clientX;
  scrollLeft = container.scrollLeft;
});

container.addEventListener('touchend', () => {
  isDown = false;
});

container.addEventListener('touchmove', (event) => {
  if (!isDown) return; 
  event.preventDefault(); 
  const x = event.touches[0].clientX; 
  const walk = (x - startX) * 2; 
  container.scrollLeft = scrollLeft - walk; 
});

// container.addEventListener('mousedown', (event) => {
//   isDown = true; 
//   startX = event.pageX - container.offsetLeft; 
//   scrollLeft = container.scrollLeft; 
// });

// container.addEventListener('mouseleave', () => {
//   isDown = false; 
// });

// container.addEventListener('mouseup', () => {
//   isDown = false; 
// });

// container.addEventListener('mousemove', (event) => {
//   if (!isDown) return; 
//   event.preventDefault(); 
//   const x = event.pageX - container.offsetLeft; 
//   const walk = (x - startX) * 2; 
//   container.scrollLeft = scrollLeft - walk; 
// });

container.addEventListener('wheel', (event) => {
  event.preventDefault();
  container.scrollLeft += event.deltaY;
});



// novelty_slider
const dots = document.querySelectorAll('.dot')
const dotsMobile = document.querySelectorAll('.dot--mobile')
const arrows = document.querySelectorAll('.arrow')
const slides = document.querySelectorAll('.slide')
const activeSlide = document.querySelector('.slide--active')

let currentSlide = 0

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('slide--active', i===index)
    slide.classList.toggle('slide', i!==index)
  })

  dots.forEach((dot, i) => {
    dot.src = i === index ? "assets/fill_dot.svg" : "assets/unfill_dot.svg"
  })

  dotsMobile.forEach((dot, i) => {
    dot.src = i === index ? "assets/fill_dot.svg" : "assets/unfill_dot.svg"
  })
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentSlide = i
    showSlide(currentSlide)
  })
})

dotsMobile.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentSlide = i
    showSlide(currentSlide)
  })
})

arrows.forEach((arrow, i) => {
  arrow.addEventListener('click', () => {
    if(arrow.classList.contains('arrow--left')) {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
    } else {
      currentSlide = (currentSlide + 1) % slides.length
    }
    showSlide(currentSlide)
  })
})

showSlide(currentSlide)



// actual show more btn
const btn = document.querySelector('.actual_btn')
const cat = document.querySelector('.category--disabled')

btn.addEventListener('click', () => {
  if(cat.classList.contains('category--disabled')) {
    cat.classList.remove('category--disabled')
    cat.classList.add('category')
    btn.textContent = 'Свернуть'
  } else {
    cat.classList.add('category--disabled')
    cat.classList.remove('category')
    btn.textContent = 'Смотреть все'
  }
})



// showInput
const inp = document.querySelector('.input_box')
const searchIcon = document.querySelector('.searchIcon')

searchIcon.addEventListener('click', () => {
  if(inp.classList.contains('input_box')) {
    inp.classList.add('input_box--active')
    inp.classList.remove('input_box')
  } else {
    inp.classList.add('input_box')
    inp.classList.remove('input_box--active')
  }
})


// inputEmpty
document.getElementById('clearIcon').addEventListener('click', function() {
  document.getElementById('searchInput').value = '';
});


// scrollBtn
document.getElementById('scrollButton').addEventListener('click', function() {
  const scrollDistance = 2000; 
  const scrollY = window.scrollY; 

  if (scrollY + window.innerHeight >= document.body.offsetHeight - 10) {
    window.scrollBy({
      top: -scrollDistance,
      behavior: 'smooth'
    });
  } else {
    window.scrollBy({
      top: scrollDistance,
      behavior: 'smooth'
    });
  }
});



// headerScroll
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  if (window.scrollY > 0) {
      header.classList.add('scrolled');
  } else {
      header.classList.remove('scrolled');
  }
});



// menuBtn
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu_box');

menuBtn.addEventListener('click', function() {
    menu.classList.toggle('show'); // Используем toggle для добавления/удаления класса
    this.classList.toggle('open'); // Используем this для ссылки на кнопку меню
});



