// =========================================================
// REGISTRO DEL SERVICE WORKER (PWA)
// =========================================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service_worker.js')
      .then((reg) => console.log('Service Worker Registrado:', reg.scope))
      .catch((err) => console.error('Error Registrando SW:', err));
  });
}

// =========================================================
// CAMBIO DE PESTAÑAS DEL MAPA CURRICULAR
// =========================================================
function switchCycle(index) {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab, i) => {
    if (i === index) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  contents.forEach((content, i) => {
    if (i === index) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });
}

// =========================================================
// CAROUSEL 3D INTERACTIVO
// =========================================================
const carousel = document.getElementById('carousel3d');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let currentAngle = 0;

function updateCarousel() {
  if (!carousel || totalItems === 0) return;
  const angleStep = 360 / totalItems;
  const radius = 220;

  items.forEach((item, index) => {
    const itemAngle = angleStep * index + currentAngle;
    item.style.transform = `rotateY(${itemAngle}deg) translateZ(${radius}px)`;
  });
}

setInterval(() => {
  currentAngle -= 0.5;
  updateCarousel();
}, 50);

updateCarousel();

// =========================================================
// BANNER DE INSTALACIÓN PWA
// =========================================================
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBanner) {
    installBanner.style.display = 'flex';
  }
});

if (installBtn) {
  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('App Instalada');
        }
        deferredPrompt = null;
        installBanner.style.display = 'none';
      });
    }
  });
}