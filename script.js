document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(
    ".portfolio-header, .portfolio-card, .sec31, .services-header, .service-card, " +
      ".skills-heading, .skills-subtitle, .skill-subtitles, .skills-card, .skill-card, " +
      ".approach-heading, .approach-card, .contact-heading, .contact-info, " +
      ".contact-form-wrapper, .footer-brand, .footer-column, .footerimage"
  );

  revealTargets.forEach((element) => element.classList.add("reveal"));

  const revealElements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));
  }

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
    if (!element.hasAttribute("data-aos") && !element.classList.contains("reveal")) {
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

//scroll

/* =========================================
   SMOOTH MOMENTUM SCROLL
========================================= */

const lenis = new Lenis({
    duration: 1.4,

    // Ease out slowly when fingers leave the touchpad
    easing: (t) => 1 - Math.pow(1 - t, 4),

    // Trackpad / mouse wheel
    smoothWheel: true,

    // Touch scrolling
    smoothTouch: true,

    // Slightly slower, smoother movement
    wheelMultiplier: 0.8,

    touchMultiplier: 1,

    infinite: false
});


/* Animation loop */

function smoothScroll(time) {

    lenis.raf(time);

    requestAnimationFrame(smoothScroll);

}

requestAnimationFrame(smoothScroll);