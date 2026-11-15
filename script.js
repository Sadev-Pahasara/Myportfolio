document.addEventListener("DOMContentLoaded", () => {
  const cursorMedia = window.matchMedia(
    "(hover: hover) and (pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)"
  );

  if (cursorMedia.matches) {
    const cursorDot = document.createElement("div");
    const cursorRing = document.createElement("div");
    cursorDot.className = "custom-cursor-dot";
    cursorRing.className = "custom-cursor-ring";
    cursorDot.setAttribute("aria-hidden", "true");
    cursorRing.setAttribute("aria-hidden", "true");
    document.body.append(cursorRing, cursorDot);

    let pointerX = 0;
    let pointerY = 0;
    let ringX = 0;
    let ringY = 0;
    let lastFrameTime = 0;
    let animationFrame = 0;
    let hasPointerPosition = false;

    const setInteractiveState = (target) => {
      const isInteractive =
        target instanceof Element &&
        target.closest(
          "a, button, [role='button'], input, select, textarea, summary, [data-cursor-hover]"
        );
      cursorRing.classList.toggle("is-hovering", Boolean(isInteractive));
    };

    const animateCursor = (time) => {
      const easing = 1 - Math.exp(-Math.min(time - lastFrameTime || 16, 32) / 70);
      lastFrameTime = time;
      ringX += (pointerX - ringX) * easing;
      ringY += (pointerY - ringY) * easing;

      cursorDot.style.setProperty("--cursor-x", `${pointerX}px`);
      cursorDot.style.setProperty("--cursor-y", `${pointerY}px`);
      cursorRing.style.setProperty("--cursor-x", `${ringX}px`);
      cursorRing.style.setProperty("--cursor-y", `${ringY}px`);

      if (Math.abs(pointerX - ringX) < 0.1 && Math.abs(pointerY - ringY) < 0.1) {
        ringX = pointerX;
        ringY = pointerY;
        cursorRing.style.setProperty("--cursor-x", `${ringX}px`);
        cursorRing.style.setProperty("--cursor-y", `${ringY}px`);
        animationFrame = 0;
        return;
      }

      animationFrame = window.requestAnimationFrame(animateCursor);
    };

    const showCursor = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!hasPointerPosition) {
        ringX = pointerX;
        ringY = pointerY;
        hasPointerPosition = true;
      }

      cursorDot.classList.add("is-visible");
      cursorRing.classList.add("is-visible");
      setInteractiveState(event.target);

      if (!animationFrame) {
        lastFrameTime = 0;
        animationFrame = window.requestAnimationFrame(animateCursor);
      }
    };

    const hideCursor = () => {
      cursorDot.classList.remove("is-visible", "is-pressed");
      cursorRing.classList.remove("is-visible", "is-hovering", "is-pressed");
      hasPointerPosition = false;
    };

    document.addEventListener("pointermove", showCursor);
    document.addEventListener("pointerdown", (event) => {
      if (!event.pointerType || event.pointerType === "mouse") {
        cursorDot.classList.add("is-pressed");
        cursorRing.classList.add("is-pressed");
      }
    });
    document.addEventListener("pointerup", () => {
      cursorDot.classList.remove("is-pressed");
      cursorRing.classList.remove("is-pressed");
    });
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);
  }

  const contactForm = document.getElementById("contactForm");
  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const subject = String(formData.get("subject") ?? "");
    const message = String(formData.get("message") ?? "");
    const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\n${message}`;
    const mailto = new URL("mailto:sadevpahasara49@gmail.com");

    mailto.searchParams.set("subject", subject);
    mailto.searchParams.set("body", body);
    window.location.href = mailto.toString();
  });

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

  const progressBars = document.querySelectorAll(".progress-bar");
  if (!("IntersectionObserver" in window)) {
    progressBars.forEach((bar) => bar.classList.add("is-visible"));
  } else {
    const progressObserver = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    progressBars.forEach((bar) => progressObserver.observe(bar));
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

let lenisInstance = null;

// ================= TERMINAL BOOT SEQUENCE =================
(() => {
  const overlay = document.querySelector(".loading-page");
  const output = document.getElementById("terminalOutput");
  const root = document.documentElement;
  const shouldRun = root.classList.contains("boot-pending");
  const reducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lines = [
    "INITIALIZING SADEV.SYSTEM...",
    "LOADING DEVELOPER PROFILE...",
    "MOUNTING CREATIVE ENVIRONMENT...",
    "COMPILING DIGITAL EXPERIENCES...",
    "CHECKING SYSTEM INTEGRITY... OK",
    "ESTABLISHING CONNECTION...",
    "PORTFOLIO ENVIRONMENT READY",
    "ACCESS GRANTED // WELCOME",
  ];
  let completed = false;
  let watchdogId;

  const wait = (milliseconds) =>
    new Promise((resolve) => window.setTimeout(resolve, milliseconds));

  const revealPage = () => {
    overlay?.remove();
    root.classList.remove("boot-pending");
    document.body.classList.remove("no-scroll");
    document.body.classList.add("loaded");
    lenisInstance?.start();

    try {
      initAOS();
    } catch (error) {
      console.error("Could not refresh page animations after the boot sequence.", error);
    }

    const bgVideo = document.querySelector(".bg-video");
    if (bgVideo) {
      bgVideo.play().catch(() => {});
    }
  };

  const finishLoading = () => {
    if (completed) {
      return;
    }

    completed = true;
    window.clearTimeout(watchdogId);

    if (shouldRun && overlay) {
      overlay.classList.add("is-closing");
      window.setTimeout(revealPage, reducedMotion ? 180 : 950);
    } else {
      revealPage();
    }
  };

  const runSequence = async () => {
    if (!shouldRun || !overlay) {
      finishLoading();
      return;
    }

    watchdogId = window.setTimeout(finishLoading, 15000);

    try {
      if (!output) {
        throw new Error("Terminal output element is missing.");
      }

      const cursor = document.createElement("span");
      cursor.className = "terminal-cursor";
      cursor.setAttribute("aria-hidden", "true");

      const cursorRow = document.createElement("div");
      cursorRow.className = "terminal-cursor-row";
      cursorRow.appendChild(cursor);

      for (let index = 0; index < lines.length; index += 1) {
        const row = document.createElement("div");
        row.className = "terminal-line";

        const number = document.createElement("span");
        number.className = "terminal-number";
        number.textContent = `>${String(index + 1).padStart(2, "0")}`;

        const message = document.createElement("span");
        message.className = "terminal-message";
        row.append(number, message);
        output.appendChild(row);
        output.appendChild(cursorRow);

        if (reducedMotion) {
          message.textContent = lines[index];
        } else {
          let typedMessage = "";
          for (const character of lines[index]) {
            typedMessage += character;
            message.textContent = typedMessage;
            await wait(24);
          }

          if (index < lines.length - 1) {
            await wait(180);
          }
        }
      }

      await wait(reducedMotion ? 0 : 900);
      finishLoading();
    } catch (error) {
      console.error("Terminal boot sequence failed; revealing the portfolio.", error);
      finishLoading();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runSequence, { once: true });
  } else {
    runSequence();
  }
})();

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

if (typeof Lenis !== "undefined") {
    lenisInstance = new Lenis({
        duration: 1.4,

        // Ease out slowly when fingers leave the touchpad
        easing: (t) => 1 - Math.pow(1 - t, 4),

        // Trackpad / mouse wheel
        smoothWheel: true,

        // Keep touch scrolling smooth on mobile devices
        syncTouch: true,

        // Slightly slower, smoother movement
        wheelMultiplier: 0.8,

        touchMultiplier: 1,

        infinite: false
    });

    if (document.documentElement.classList.contains("boot-pending")) {
        lenisInstance.stop();
    }

    function smoothScroll(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(smoothScroll);
    }

    requestAnimationFrame(smoothScroll);
} else {
    console.error("Lenis did not load; using native scrolling.");
}


/* ================= DISABLE IMAGE DRAGGING ================= */

document.addEventListener("DOMContentLoaded", () => {

    // Disable dragging for all images
    document.querySelectorAll("img").forEach((img) => {
        img.setAttribute("draggable", "false");

        img.addEventListener("dragstart", (event) => {
            event.preventDefault();
        });
    });

    // Also prevent dragging images added later
    document.addEventListener("dragstart", (event) => {
        if (event.target.closest("img")) {
            event.preventDefault();
        }
    }, true);

});


// ================= DISABLE IMAGE SAVING =================

document.addEventListener("contextmenu", function (event) {
    if (event.target.closest("img")) {
        event.preventDefault();
        event.stopPropagation();
    }
}, true);

// Prevent dragging images
document.addEventListener("dragstart", function (event) {
    if (event.target.closest("img")) {
        event.preventDefault();
    }
}, true);

// Disable image dragging
document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
});
