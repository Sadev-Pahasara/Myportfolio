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

 
});

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
      if (window.AOS) {
        AOS.init({
          once: true,
          offset: 80,
          duration: 800,
          easing: "ease-in-out",
        });

        // IMPORTANT: wait for layout settle
        setTimeout(() => {
          AOS.refreshHard();
        }, 600);
      }

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

const sections = [
    document.getElementById("top"),
    document.getElementById("Portfolio"),
    document.getElementById("About"),
    document.getElementById("Services"),
    document.getElementById("Skills"),
    document.getElementById("Feedback"),
    document.getElementById("Contact")
].filter(Boolean);


function updateActiveNav() {

    let current = "top";

    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {

        if (scrollPosition >= section.offsetTop) {
            current = section.id;
        }

    });


    navLinks.forEach(link => {

        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );

    });
}


// Update while scrolling
window.addEventListener("scroll", updateActiveNav);


// IMPORTANT: update when page initially loads
window.addEventListener("load", () => {

    updateActiveNav();

    // Run again after loader/animations finish
    setTimeout(updateActiveNav, 500);
    setTimeout(updateActiveNav, 1000);
});