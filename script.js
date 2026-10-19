// ═══════════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════════
(function initTheme() {
  const htmlEl = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');

  // Dark mode is the default (matches the terminal aesthetic); only an
  // explicit saved choice of 'light' overrides it.
  const savedTheme = localStorage.getItem('theme');
  const currentTheme = savedTheme || 'dark';

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
    // Rate limiting: Prevent spam by limiting submissions
    let lastSubmitTime = 0;
    const MIN_SUBMIT_INTERVAL = 5000; // 5 seconds between submissions

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Rate limiting check
      const now = Date.now();
      if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
        formStatus.textContent = 'Please wait a moment before sending another message.';
        formStatus.className = 'form-status error';
        return;
      }

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      // Basic validation
      if (!data.name || !data.email || !data.message) {
        formStatus.textContent = 'Please fill in all fields.';
        formStatus.className = 'form-status error';
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.className = 'form-status error';
        return;
      }

      // Length validation to prevent abuse
      if (data.message.length < 10) {
        formStatus.textContent = 'Message is too short. Please provide more details.';
        formStatus.className = 'form-status error';
        return;
      }

      if (data.message.length > 5000) {
        formStatus.textContent = 'Message is too long. Please keep it under 5000 characters.';
        formStatus.className = 'form-status error';
        return;
      }

      // Disable submit button while sending
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        // Using Formspree.io - form ID is public but protected by:
        // 1. Formspree's built-in spam protection
        // 2. Rate limiting implemented above
        // 3. Domain restrictions (set in Formspree dashboard)
        // 4. reCAPTCHA (enable in Formspree settings for extra protection)
        const response = await fetch('https://formspree.io/f/mpwygqqv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          lastSubmitTime = now; // Update last submit time
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

// ═══════════════════════════════════════════════════════════════
// SKILLS TICKER (fills the row width so there's no empty gap,
// regardless of viewport size or how many tags a category has)
// ═══════════════════════════════════════════════════════════════
(function initSkillsTicker() {
  const tracks = document.querySelectorAll('.ticker-track');
  if (!tracks.length) return;

  const PIXELS_PER_SECOND = 40;

  function buildTicker(track) {
    // Capture the original, single set of tags once, so repeated
    // builds (e.g. on resize) always start from the real content.
    if (!track.dataset.baseHtml) {
      track.dataset.baseHtml = track.innerHTML;
    }

    track.innerHTML = track.dataset.baseHtml;

    const viewportWidth = track.parentElement.clientWidth;
    let unitWidth = track.scrollWidth;
    if (unitWidth === 0) return;

    // Repeat the base set until it's at least as wide as the row,
    // so there's never empty space before the loop restarts.
    while (unitWidth < viewportWidth) {
      track.innerHTML += track.dataset.baseHtml;
      unitWidth = track.scrollWidth;
    }

    // Duplicate that whole (now wide-enough) unit once more so the
    // 0% -> -50% animation loops seamlessly.
    const unitHtml = track.innerHTML;
    track.innerHTML = unitHtml + unitHtml;

    // Hide the duplicated half from assistive tech.
    const children = Array.from(track.children);
    children.slice(children.length / 2).forEach((el) => el.setAttribute('aria-hidden', 'true'));

    track.style.animationDuration = `${unitWidth / PIXELS_PER_SECOND}s`;
  }

  function buildAll() {
    tracks.forEach(buildTicker);
  }

  buildAll();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(buildAll, 200);
  });
})();

// ═══════════════════════════════════════════════════════════════
// PROJECTS HORIZONTAL SCROLL HINT
// ═══════════════════════════════════════════════════════════════
(function initProjectsScrollHint() {
  const wrapper = document.getElementById('projectsWrapper');
  const grid = document.getElementById('projectsGrid');
  const hint = document.getElementById('scrollHint');

  if (!wrapper || !grid) return;

  function updateScrollState() {
    const maxScroll = grid.scrollWidth - grid.clientWidth;
    const atStart = grid.scrollLeft <= 8;
    const atEnd = grid.scrollLeft >= maxScroll - 8;

    wrapper.classList.toggle('scrolled-start', !atStart);
    wrapper.classList.toggle('scrolled-end', atEnd);

    if (hint) {
      hint.style.opacity = atStart ? '1' : '0';
    }
  }

  grid.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('resize', updateScrollState);
  updateScrollState();
})();

// ═══════════════════════════════════════════════════════════════
// FOOTER COPYRIGHT YEAR
// ═══════════════════════════════════════════════════════════════
(function initCopyrightYear() {
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

console.log('Portfolio initialized ✓');
