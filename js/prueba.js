let lastScroll = 0;
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll hacia abajo → ocultar
        header.classList.add("hidden");
    } else {
        // Scroll hacia arriba → mostrar
        header.classList.remove("hidden");
    }

    lastScroll = currentScroll;
});


// === Detectar página actual y marcar el link activo ===
document.addEventListener("DOMContentLoaded", () => {
    // Obtiene la ruta actual del archivo (ej: /nosotros.html)
    const currentPath = window.location.pathname;

    // Selecciona todos los links del nav
    const navLinks = document.querySelectorAll(".main-nav a");

    navLinks.forEach(link => {
        // Si el href del link coincide con la ruta actual, agrega la clase active
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
});


const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    currentIndex = index;
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto play
setInterval(() => {
    let nextIndex = (currentIndex + 1) % dots.length;
    showSlide(nextIndex);
}, 5000);

// JS para lightbox (prueba.js)
document.querySelectorAll('.galeria img').forEach(img => {
    img.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `<img src="${img.src}" alt="">`;
        document.body.appendChild(lightbox);

        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});