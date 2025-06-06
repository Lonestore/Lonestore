// Función para hacer scroll suave hacia una sección
function scrollToSection(id) {
  const target = document.getElementById(id);
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000; // duración en milisegundos (ajustá si querés más lenta)
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percent = Math.min(progress / duration, 1);
    window.scrollTo(0, startPosition + distance * easeInOutQuad(percent));
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  // Función de suavizado (ease-in-out)
  function easeInOutQuad(t) {
    return t < 0.5
      ? 2 * t * t
      : -1 + (4 - 2 * t) * t;
  }

  window.requestAnimationFrame(step);
}

// Mostrar/ocultar flechas según el scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const alturaVentana = window.innerHeight;

  const quienes = document.getElementById('quienes');
  const contacto = document.getElementById('contacto');
  const flechaInicio = document.getElementById('flecha-abajo-inicio');
  const btnTop = document.getElementById('btn-top');

  const topQuienes = quienes.offsetTop;
  const topContacto = contacto.offsetTop;

  // Mostrar flecha hacia abajo solo si estamos en la sección "inicio"
  if (scrollY < topQuienes - alturaVentana / 2) {
  flechaInicio.style.display = 'block';
} else {
  flechaInicio.style.display = 'none';
}

  // Mostrar botón arriba solo si estamos en contacto
  if (scrollY >= topContacto - alturaVentana / 2) {
    btnTop.style.display = 'block';
  } else {
    btnTop.style.display = 'none';
  }
});

// Carrusel de portada
let indiceSlide = 0;
const slides = document.querySelectorAll('.slide');

function mostrarSlide(nuevoIndice) {
  slides[indiceSlide].classList.remove('activo');
  indiceSlide = (nuevoIndice + slides.length) % slides.length;
  slides[indiceSlide].classList.add('activo');
}

function cambiarSlide(direccion) {
  mostrarSlide(indiceSlide + direccion);
}

// Auto-cambio de imagen cada 6 segundos (opcional)
setInterval(() => {
  cambiarSlide(1);
}, 6000);