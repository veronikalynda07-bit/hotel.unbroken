document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  // Відкриття/закриття мобільного меню
  menuBtn.addEventListener('click', function() {
    this.classList.toggle('active'); // додає/знімає клас для анімації кнопки
    mobileMenu.classList.toggle('active'); // показує або ховає меню
    body.classList.toggle('no-scroll'); // блокує скрол сторінки при відкритому меню
  });

  // Закриває меню при кліку на будь-яке посилання
  const links = mobileMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function() {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      body.classList.remove('no-scroll');
    });
  });
});

// Анімація появи/зникнення хедера при скролі
let lastScrollTop = 0;
const headerNav = document.querySelector('.header__nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScrollTop && currentScroll > 100) {
    // Скролимо вниз — ховаємо хедер
    headerNav.classList.add('hidden');
  } else {
    // Скролимо вгору — показуємо хедер
    headerNav.classList.remove('hidden');
  }

  // Додаємо тінь при будь-якому скролі
  if (currentScroll > 50) {
    headerNav.classList.add('scrolled');
  } else {
    headerNav.classList.remove('scrolled');
  }

  lastScrollTop = currentScroll;
});























// розрахунк ціни
function calculatePrice(pricePerNight, checkin, checkout) {
    const oneDay = 24 * 60 * 60 * 1000; // мілісекунди в добі
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    
    // Різниця в днях
    const nights = Math.round(Math.abs((checkoutDate - checkinDate) / oneDay));
    
    return {
        nights: nights,
        total: nights * pricePerNight
    };
}

// Фільтрація номерів за кількістю гостей
function filterRoomsByGuests() {
    const guestsCount = parseInt(document.getElementById('guests-count').value);
    const rooms = document.querySelectorAll('.room-card');
    
    rooms.forEach(room => {
        const maxGuests = parseInt(room.dataset.maxGuests);
        
        if (maxGuests >= guestsCount) {
            room.style.display = 'flex';
            room.classList.add('available');
        } else {
            room.style.display = 'none';
            room.classList.remove('available');
        }
    });
}

// Обрати номер
function selectRoom(roomElement) {
    // Видалимо виділення з усіх номерів
    document.querySelectorAll('.room-card').forEach(room => {
        room.style.border = '2px solid transparent';
    });
    
    // Виділимо обраний номер
    roomElement.style.border = '2px solid brown';
    
    const roomType = roomElement.dataset.type;
    const roomPrice = parseInt(roomElement.dataset.price);
    
    // Оновимо інформацію про обраний номер
    document.getElementById('selected-room-info').textContent = 
        roomElement.querySelector('h3').textContent;
    
    // Розрахуємо ціну, якщо дати обрані
    updatePriceCalculation(roomPrice);
}

// Оновлення розрахунку ціни
function updatePriceCalculation(roomPrice) {
    const checkin = document.getElementById('checkin-date').value;
    const checkout = document.getElementById('checkout-date').value;
    
    if (checkin && checkout) {
        const calculation = calculatePrice(roomPrice, checkin, checkout);
        document.getElementById('price-calculation').innerHTML = `
            ${calculation.nights} ночей × ${roomPrice} грн = <strong>${calculation.total} грн</strong>
        `;
    }
}

// Бронювання номера
function bookRoom() {
    const checkin = document.getElementById('checkin-date').value;
    const checkout = document.getElementById('checkout-date').value;
    const guests = document.getElementById('guests-count').value;
    const selectedRoom = document.getElementById('selected-room-info').textContent;
    
    // Проста валідація
    if (!checkin || !checkout) {
        alert('Будь ласка, оберіть дати заїзду та виїзду');
        return;
    }
    
    if (selectedRoom === 'Не обрано') {
        alert('Будь ласка, оберіть номер');
        return;
    }
    
    // Показуємо спливаюче повідомлення
    document.getElementById('booking-modal').style.display = 'flex';
    
    // Тут буде код для відправки даних на сервер
    console.log('Бронювання:', {
        checkin: checkin,
        checkout: checkout,
        guests: guests,
        room: selectedRoom
    });
}

// Закриття модального вікна
function closeModal() {
    document.getElementById('booking-modal').style.display = 'none';
}

// Ініціалізація при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    // Додаємо обробники подій до номерів
    document.querySelectorAll('.room-card').forEach(room => {
        room.addEventListener('click', function() {
            selectRoom(this);
        });
    });
    
    
    
    document.getElementById('checkout-date').addEventListener('change', function() {
        updatePriceIfRoomSelected();
    });
    
    document.getElementById('guests-count').addEventListener('change', filterRoomsByGuests);
    
    
});

function updatePriceIfRoomSelected() {
    const selectedRoom = document.querySelector('.room-card[style*="border: 2px solid brown"]');
    if (selectedRoom) {
        const roomPrice = parseInt(selectedRoom.dataset.price);
        updatePriceCalculation(roomPrice);
    }
}







// погодп
!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src='https://weatherwidget.io/js/widget.min.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','weatherwidget-io-js');


