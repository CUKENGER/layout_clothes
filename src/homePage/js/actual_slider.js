

// actual slider
const titles = document.querySelectorAll('.actual_title')
const categories = document.querySelectorAll('.categories')
const categoriesActive = document.querySelector('.categories--active')

let currentIndex = 0

function actualSlider(index) {
  categories.forEach((category,i) => {
    category.classList.toggle(`categories--active${i}`, i===index)
    category.classList.toggle('categories', i!== index)
  })

  titles.forEach((title, i) => {
    title.classList.toggle('actual_title--active', i===index)
  })
}

titles.forEach((title, i) => {
  title.addEventListener('click', () => {
    currentIndex = i
    actualSlider(currentIndex)
  })
})


actualSlider(currentIndex)