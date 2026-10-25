const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');

// Mobile navigation — only runs when the elements exist
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.textContent = isOpen ? '✕' : '☰';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = '☰';
    });
  });
}

// Active navigation section — homepage only
const sections = document.querySelectorAll('main section[id]');

if (sections.length && navItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, {
    rootMargin: '-25% 0px -60% 0px'
  });

  sections.forEach((section) => observer.observe(section));
}

// Reveal animations — homepage only
const revealElements = document.querySelectorAll(
  '.section-heading, .project-card, .about, .contact'
);

if (revealElements.length) {
  revealElements.forEach((element) => {
    element.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

const workFilterButtons = document.querySelectorAll('[data-work-filter]');
const workFilterCards = document.querySelectorAll('.project-card[data-category]');

if (workFilterButtons.length && workFilterCards.length) {
  workFilterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.workFilter;

      workFilterButtons.forEach((filterButton) => {
        filterButton.classList.toggle('active', filterButton === button);
      });

      workFilterCards.forEach((card) => {
        const matches =
          selectedCategory === 'all' ||
          card.dataset.category === selectedCategory;

        card.classList.toggle('is-filtered-out', !matches);
      });
    });
  });
}
