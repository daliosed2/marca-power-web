/* js/app.js — Reemplaza TODO este archivo por este contenido */

/* 🔧 Enciende/apaga secciones por id (sin tocar HTML) */
const FEATURES = {
  inicio: true,
  mision: true,
  contenidos: true,
  masterclass: true,
  comunidad: true,
  equipo: false,      // ← pon true para mostrar “Conoce a los fundadores”
  suscripcion: true,
  contacto: true,
};

document.addEventListener('DOMContentLoaded', () => {
  /* 🧪 Overrides rápidos por URL (opcional):
     ?preview        → muestra TODO
     ?show=equipo    → fuerza mostrar “equipo”
     ?hide=masterclass,comunidad → oculta esas dos
  */
  const qp = new URLSearchParams(location.search);
  if (qp.has('preview')) {
    Object.keys(FEATURES).forEach(k => FEATURES[k] = true);
  }
  if (qp.has('show')) {
    qp.get('show').split(',').map(s => s.trim()).forEach(k => {
      if (k in FEATURES) FEATURES[k] = true;
    });
  }
  if (qp.has('hide')) {
    qp.get('hide').split(',').map(s => s.trim()).forEach(k => {
      if (k in FEATURES) FEATURES[k] = false;
    });
  }

  /* 🪄 Aplica toggles: oculta sección y su enlace del menú */
  Object.entries(FEATURES).forEach(([id, on]) => {
    const section = document.getElementById(id);
    if (section) section.hidden = !on;
    document.querySelectorAll(`a[href="#${id}"]`).forEach(a => {
      if (!on) a.style.display = 'none';
    });
  });

  /* 🧭 Navegación suave (y evita saltar a secciones ocultas) */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      const key = href.slice(1);
      if (FEATURES[key] === false) { e.preventDefault(); return; }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', href);
      }
    });
  });

  /* 🔗 Si la URL apunta a una sección oculta, limpia el hash */
  const current = location.hash.slice(1);
  if (current && FEATURES[current] === false) {
    history.replaceState(null, '', location.pathname + location.search);
  }

  /* © Año automático en el footer */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
