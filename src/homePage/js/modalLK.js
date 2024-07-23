

const accountBtn = document.getElementById('openReg')
const header = document.getElementById('header')

accountBtn.addEventListener('click', () => {
  document.getElementById('modal').style.display = 'flex'; 
  document.body.classList.add('no-scroll');
})

document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'none';
  document.body.classList.remove('no-scroll');
});

// passwordLook
document.getElementById('togglePassword').addEventListener('click', function() {
  const passwordInput = document.getElementById('password');
  const toggleButton = this;
  const toggleIcon = document.getElementById('toggle_icon')

  // Проверяем, скрыт ли текущий пароль
  if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleIcon.src = 'assets/visibility.svg'
      toggleButton.style.top = '25%'
  } else {
      passwordInput.type = 'password';
      toggleIcon.src = "assets/pass_visibility.svg"
      toggleButton.style.top = '35%'

  }
});


// validateEMail
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем отправку формы

  const emailInput = document.getElementById('email');
  const email = emailInput.value;
  const emailErrorText = document.querySelector('.email_error')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    emailInput.style.color = 'red';
    emailErrorText.style.display = 'flex'
    emailErrorText.style.color = 'red'
    return;
  } else {
    emailInput.style.color = 'black'; // Возвращаем цвет текста в нормальное состояние, если email валиден
    emailErrorText.style.display = 'none'
  }
});