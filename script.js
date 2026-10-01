document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-button");
  const menuClose = document.querySelector(".mobile-menu-close");
  const menuBackdrop = document.getElementById("menuBackdrop");
  const nav = document.querySelector(".nav");

  const toggleMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
  };

  menuButton?.addEventListener("click", () => toggleMenu(true));
  menuClose?.addEventListener("click", () => toggleMenu(false));
  menuBackdrop?.addEventListener("click", () => toggleMenu(false));

  if (window.AOS) {
    AOS.init({
      once: true,
      offset: 80,
      duration: 800,
      easing: "ease-in-out",
    });
    setTimeout(() => AOS.refreshHard(), 600);
  }
});

const initAOS = () => {
  if (window.AOS) {
    AOS.init({
      once: true,
      offset: 80,
      duration: 800,
      easing: "ease-in-out",
    });
    setTimeout(() => AOS.refreshHard(), 600);
  }
};

const addDefaultAOSAttributes = () => {
  document.querySelectorAll(".portfolio-card, .service-card, .skills-card, .school-card").forEach((element, index) => {
    if (!element.hasAttribute("data-aos")) {
      element.setAttribute("data-aos", index % 2 === 0 ? "zoom-in-up" : "fade-up");
      element.setAttribute("data-aos-delay", `${(index + 1) * 100}`);
    }
  });
};

document.addEventListener("DOMContentLoaded", addDefaultAOSAttributes);

// ================= LOADING ANIMATION =================
gsap.fromTo(
  ".loading-page",
  { opacity: 1 },
  {
    opacity: 0,
    display: "none",
    duration: 2,
    delay: 3.5,
    onComplete: () => {

      document.body.classList.remove("no-scroll");
      document.body.classList.add("loaded");

      // ================= AOS INIT (FIXED PROPERLY) =================
      initAOS();

      // Play background video if exists
      const bgVideo = document.querySelector(".bg-video");
      if (bgVideo) {
        bgVideo.play().catch(() => {});
      }
    },
  }
);

// ================= LOGO ANIMATION =================
gsap.fromTo(
  ".logo-name",
  {
    y: 50,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 3,
    delay: 1,
  }
);

// ================= SAFETY: AOS REFRESH ON RESIZE =================
window.addEventListener("resize", () => {
  if (window.AOS) {
    AOS.refresh();
  }
});


//svg2

document.addEventListener("DOMContentLoaded", () => {

  const sec2 = document.querySelector(".sec2");
  const cover = document.querySelector(".svg-cover");

  if (!sec2 || !cover) {
    console.error("Missing elements");
    return;
  }

  window.addEventListener("scroll", () => {

    const rect = sec2.getBoundingClientRect();

    const windowHeight = window.innerHeight;
    const sectionHeight = sec2.offsetHeight;

    // 🔥 REAL sticky-safe progress
    let progress = (windowHeight - rect.top) / (windowHeight + sectionHeight);

    progress = Math.min(Math.max(progress, 0), 1);

    // smooth feel
    progress = progress * progress;

    // fill / drain
    cover.style.transform = `translateY(${-progress * 100}%)`;

  });

});

const navLinks = document.querySelectorAll(".nav-link");

const sectionIds = [
    "top",
    "Portfolio",
    "About",
    "Services",
    "Skills",
    "Approach",
    "Contact"
];

const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);


function updateActiveNav() {

    const navHeight = 100;
    const scrollPosition = window.scrollY + navHeight;

    let current = "top";

    sections.forEach(section => {

        const sectionTop =
            section.getBoundingClientRect().top + window.scrollY;

        if (scrollPosition >= sectionTop) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === `#${current}`
        );

    });
}


window.addEventListener("scroll", updateActiveNav, {
    passive: true
});

window.addEventListener("load", () => {
    updateActiveNav();

    setTimeout(updateActiveNav, 500);
    setTimeout(updateActiveNav, 1000);
});

// service card animation

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);

    });

    card.addEventListener("mouseleave", () => {

        card.style.setProperty("--mouse-x", "50%");
        card.style.setProperty("--mouse-y", "50%");

    });

});