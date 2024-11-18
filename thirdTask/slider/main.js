const arrowLeft = document.querySelector(".arrow-left");
const arrowRight = document.querySelector(".arrow-right");
const slides = document.querySelectorAll(".slider-image");

let index = 0;

// Отображаем определенный слайд
function showSlide() {
  slides[index].classList.add("block");
}
// Удаляем определенный слайд
function hideSlide() {
  slides[index].classList.remove("block");
}

// Переключаемся на следующий сайт
function nextSlide() {
  hideSlide();
  index++;
  if (index > slides.length - 1) {
    index = 0;
  }
  showSlide();
}
// Переключаемся на предыдущий сайт
function previousSlide() {
  hideSlide();
  index--;
  if (index < 0) {
    index = slides.length - 1;
  }
  showSlide();
}

arrowLeft.addEventListener("click", previousSlide);
arrowRight.addEventListener("click", nextSlide);

const intervalId = setInterval(function () {
  nextSlide();
}, 3000);
