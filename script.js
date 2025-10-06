// Toggle mobilmeny
const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

// Marker aktiv lenke mens du scroller
const links = document.querySelectorAll('.nav-link');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = '#' + entry.target.id;
    const link = document.querySelector(`.nav-link[href="${id}"]`);
    if (link) {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(sec => io.observe(sec));

// Lukk mobilmeny ved klikk på lenke
links.forEach(l => l.addEventListener('click', () => {
  nav.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
}));

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('type-title');
  if (!el) return;

  const full = el.getAttribute('data-text') || el.textContent.trim();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = full; return; }

  el.textContent = ''; // start tom

  let i = 0;
  const baseDelay = 55;       // grunnfart
  const jitter = 120;         // variasjon for “menneskelig” følelse

  function type() {
    if (i <= full.length) {
      el.textContent = full.slice(0, i);
      i++;

      // litt tilfeldig timing for retro/organisk rytme
      const delay = baseDelay + Math.random() * jitter;
      setTimeout(type, delay);
    } else {
      // valgfritt: lite “beep” eller pause — vi lar den bare stå ferdig
    }
  }

  type();
});

