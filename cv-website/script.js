const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const navShell = document.querySelector(".nav-shell");
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const topLinks = document.querySelectorAll('a[href="#top"]');

function applyTheme(theme, persist = true) {
  root.dataset.theme = theme;

  if (persist) {
    localStorage.setItem("theme", theme);
  }

  if (themeToggle) {
    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.querySelector(".theme-toggle-label").textContent = isDark ? "Dark" : "Light";
  }
}

function resolveInitialTheme() {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return "dark";
}

function getStickyOffset() {
  const navHeight = navShell ? navShell.getBoundingClientRect().height : 0;
  return navHeight + 12;
}

function setActiveLink(targetId) {
  navLinks.forEach((navLink) => {
    navLink.classList.toggle("active", navLink.getAttribute("href") === targetId);
  });
}

applyTheme(resolveInitialTheme(), false);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
}

systemTheme.addEventListener("change", (event) => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return;
  }

  applyTheme(event.matches ? "dark" : "light", false);
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId ? document.querySelector(targetId) : null;

    if (!target) {
      return;
    }

    event.preventDefault();
    setActiveLink(targetId);

    const top = target.getBoundingClientRect().top + window.scrollY - getStickyOffset();

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  });
});

topLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveLink("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

const observedSections = [...navLinks]
  .map((link) => {
    const selector = link.getAttribute("href");
    return selector ? document.querySelector(selector) : null;
  })
  .filter(Boolean);

function updateActiveSection() {
  const stickyOffset = getStickyOffset();
  const marker = stickyOffset + 28;
  const atTop = window.scrollY <= 24;
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;

  if (atTop) {
    setActiveLink("");
    return;
  }

  if (nearBottom && observedSections.length) {
    setActiveLink(`#${observedSections[observedSections.length - 1].id}`);
    return;
  }

  let activeSection = observedSections.find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= marker && rect.bottom > marker;
  });

  if (!activeSection) {
    activeSection = [...observedSections]
      .reverse()
      .find((section) => section.getBoundingClientRect().top <= marker);
  }

  if (!activeSection) {
    return;
  }

  setActiveLink(`#${activeSection.id}`);
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);
updateActiveSection();

const revealElements = document.querySelectorAll(".card, .section-heading");

revealElements.forEach((element) => element.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => observer.observe(element));
