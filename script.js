// ═══════════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════════
(function initTheme() {
  const htmlEl = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');

  // Check for saved theme preference or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  if (currentTheme === 'dark') {
    htmlEl.setAttribute('data-theme', 'dark');
  }

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';

      if (newTheme === 'dark') {
        htmlEl.setAttribute('data-theme', 'dark');
      } else {
        htmlEl.removeAttribute('data-theme');
      }

      localStorage.setItem('theme', newTheme);
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        htmlEl.setAttribute('data-theme', 'dark');
      } else {
        htmlEl.removeAttribute('data-theme');
      }
    }
  });
})();

// ═══════════════════════════════════════════════════════════════
// MOBILE MENU TOGGLE
// ═══════════════════════════════════════════════════════════════
(function initMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', String(isActive));
    });

    // Close mobile menu when clicking on a link
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL & ACTIVE NAV HIGHLIGHTING
// ═══════════════════════════════════════════════════════════════
(function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks)
    .map(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        return document.querySelector(href);
      }
      return null;
    })
    .filter(Boolean);

  // Intersection Observer for active nav highlighting
  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          const activeLink = document.querySelector(`.nav-link[href="${id}"]`);

          // Remove active class from all links
          navLinks.forEach(link => link.classList.remove('active'));

          // Add active class to current link
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // Smooth scroll to anchor links (backup for browsers without CSS scroll-behavior)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.nav').offsetHeight;
          const targetPosition = target.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update URL hash
          history.pushState(null, '', href);
        }
      }
    });
  });
})();

// ═══════════════════════════════════════════════════════════════
// LAZY LOADING IMAGES (if you add images later)
// ═══════════════════════════════════════════════════════════════
(function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
})();

// ═══════════════════════════════════════════════════════════════
// KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════════
(function initKeyboardNav() {
  // ESC key to close mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const navLinks = document.querySelector('.nav-links');
      const mobileToggle = document.querySelector('.mobile-toggle');

      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.focus();
        }
      }
    }
  });
})();

// ═══════════════════════════════════════════════════════════════
// PAGE LOAD ANIMATION (Optional - adds fade-in effect)
// ═══════════════════════════════════════════════════════════════
(function initPageAnimation() {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';

    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
})();

// ═══════════════════════════════════════════════════════════════
// CONTACT FORM HANDLER
// ═══════════════════════════════════════════════════════════════
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Disable submit button while sending
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        // Using Formspree.io - a free form backend service
        // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
        // Sign up at https://formspree.io/ to get your form ID
        const response = await fetch('https://formspree.io/f/mpwygqqv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          formStatus.className = 'form-status success';
          form.reset();
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        formStatus.textContent = 'Oops! Something went wrong. Please try emailing me directly.';
        formStatus.className = 'form-status error';
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Hide status message after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
    });
  }
})();

console.log('Portfolio initialized ✓');
