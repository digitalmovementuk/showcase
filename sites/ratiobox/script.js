const body = document.body;
const root = document.documentElement;
const menu = document.querySelector("#offcanvas");
const openMenu = document.querySelector(".menu-button");
const closeMenu = document.querySelector(".menu-close");
const cookieBanner = document.querySelector(".cookie-banner");

requestAnimationFrame(() => {
  body.classList.add("motion-ready");
});

function setMenu(open) {
  if (!menu || !openMenu) return;
  body.classList.toggle("menu-open", open);
  menu.classList.toggle("active", open);
  menu.setAttribute("aria-hidden", String(!open));
  openMenu.setAttribute("aria-expanded", String(open));
}

openMenu?.addEventListener("click", () => setMenu(true));
closeMenu?.addEventListener("click", () => setMenu(false));

menu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    setMenu(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

document.querySelectorAll("[data-cookie-close]").forEach((button) => {
  button.addEventListener("click", () => {
    cookieBanner?.classList.add("hidden");
  });
});

document.querySelectorAll(".footer-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest(".footer-menu")?.classList.toggle("open");
  });
});

const revealTargets = [
  ".question .subheading",
  ".question h2",
  ".welcome-copy h2",
  ".welcome-copy p",
  ".welcome-copy .button-row",
  ".chameleon",
  ".service-card",
  ".process-card > div:last-child",
  ".footer-cta h2",
  ".footer-cta .button",
  ".footer-grid > section",
  ".footer-final > *",
];

const revealItems = document.querySelectorAll(revealTargets.join(","));

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));

let ticking = false;

function updateScrollEffects() {
  const scrollY = window.scrollY;
  const heroShift = Math.min(scrollY * 0.1, 110);
  const planeShift = Math.min(scrollY * 0.12, 130);
  const marqueeShift = -14 + Math.min(scrollY * 0.015, 24);

  root.style.setProperty("--hero-shift", `${heroShift}px`);
  root.style.setProperty("--plane-scroll-y", `${planeShift}px`);
  root.style.setProperty("--marquee-x", `${marqueeShift}vw`);
  ticking = false;
}

function requestScrollUpdate() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateScrollEffects);
}

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateScrollEffects();
