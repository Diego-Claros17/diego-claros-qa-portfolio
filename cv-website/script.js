const cards = document.querySelectorAll('.card');

cards.forEach((card) => card.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

cards.forEach((card) => observer.observe(card));
