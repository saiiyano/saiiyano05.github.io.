document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  if (!burger || !nav) return; // если вдруг селекторы не найдены — выходим

  burger.addEventListener('click', function(e) {
    burger.classList.toggle('active');
    nav.classList.toggle('active');

    const expanded = burger.classList.contains('active');
    burger.setAttribute('aria-expanded', expanded);
  });

  // опционально: закрывать меню при клике вне header__inner
  document.addEventListener('click', function(e) {
    if (!burger.classList.contains('active')) return;
    if (!e.target.closest('.header__inner')) {
      burger.classList.remove('active');
      nav.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

// --- Слайдер Swiper ---
// const swiper = new Swiper('.swiper', {
//   loop: true,
//   slidesPerView: 3,
//   spaceBetween: 50,
//   autoplay: {
//     delay: 2500,
//     disableOnInteraction: false,
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true,
//   },
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   breakpoints: {
//     1024: { slidesPerView: 3, spaceBetween: 50 },
//     768: { slidesPerView: 2, spaceBetween: 30 },
//     480: { slidesPerView: 1, spaceBetween: 20 },
//   },
// });

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.slider-track');
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector('.swiper-button-next');
  const prevBtn = document.querySelector('.swiper-button-prev');
  const pagination = document.querySelector('.swiper-pagination');
  const slideWidth = slides[0].getBoundingClientRect().width + 50; // ширина + gap
  let position = 0;
  let speed = 1;
  let animationId;

  function updatePagination() {
    pagination.innerHTML = '';
    for (let i = 0; i < slides.length / 2; i++) {
      const dot = document.createElement('span');
      dot.classList.add('swiper-pagination-bullet');
      if (i === Math.floor(Math.abs(position) / slideWidth) % (slides.length / 2)) {
        dot.classList.add('swiper-pagination-bullet-active');
      }
      pagination.appendChild(dot);
    }
  }

  function animate() {
    position -= speed;
    if (Math.abs(position) >= slideWidth * slides.length / 2) {
      position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
    updatePagination();
    animationId = requestAnimationFrame(animate);
  }

  animate();

  // пауза при наведении
  track.parentElement.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
  track.parentElement.addEventListener('mouseleave', () => animate());

  // кнопки
  nextBtn.addEventListener('click', () => {
    position -= slideWidth;
    if (Math.abs(position) >= slideWidth * slides.length / 2) position = 0;
    track.style.transform = `translateX(${position}px)`;
    updatePagination();
  });

  prevBtn.addEventListener('click', () => {
    position += slideWidth;
    if (position > 0) position = -slideWidth * (slides.length / 2);
    track.style.transform = `translateX(${position}px)`;
    updatePagination();
  });
});

// AJAX для формы "Заказать звонок"
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.callback-form');
    const messageDiv = document.getElementById('form-message');
    const btn = form.querySelector('button[type="submit"]');

    if (!form || !messageDiv) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Показываем загрузку
        btn.textContent = 'Отправка...';
        btn.disabled = true;
        messageDiv.textContent = '';
        messageDiv.style.color = '';

        const formData = new FormData(form);

        fetch('save_callback.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            messageDiv.textContent = data.message;
            messageDiv.style.color = data.status === 'success' ? 'green' : 'red';
            
            if (data.status === 'success') {
                form.reset();
            }
        })
        .catch(err => {
            console.error(err);
            messageDiv.textContent = 'Ошибка соединения. Попробуйте позже.';
            messageDiv.style.color = 'red';
        })
        .finally(() => {
            btn.textContent = 'Заказать звонок';
            btn.disabled = false;
        });
    });
});