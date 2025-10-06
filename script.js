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
