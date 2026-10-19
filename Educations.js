
/* ==========================================
   EDUCATION — MOBILE-FRIENDLY GSAP
========================================== */

(() => {
    function initEducationAnimations() {
        const section = document.querySelector(".education-section");

        if (!section || !window.gsap || !window.ScrollTrigger) {
            // Keep the content visible if GSAP fails to load.
            if (section) {
                section.querySelectorAll(".education-card").forEach(card => {
                    card.style.opacity = "1";
                    card.style.visibility = "visible";
                    card.style.transform = "none";
                });
            }
            return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray(
            section.querySelectorAll(".education-card")
        );

        const header = section.querySelector(".education-header");
        const progress = section.querySelector(".timeline-progress");
        const footer = section.querySelector(".education-bottom");

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // Never leave content hidden when motion is reduced.
        if (reduceMotion) {
            gsap.set([header, ...cards, footer].filter(Boolean), {
                autoAlpha: 1,
                clearProps: "transform"
            });

            if (progress) gsap.set(progress, { height: "100%" });
            return;
        }

        // Make sure the section starts in a predictable state.
        gsap.set([header, ...cards, footer].filter(Boolean), {
            autoAlpha: 1
        });

        // HEADER — short reveal.
        if (header) {
            gsap.from(header, {
                y: 20,
                autoAlpha: 0,
                duration: 0.55,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: header,
                    start: "top 95%",
                    toggleActions: "play none none none",
                    once: true
                }
            });
        }

        // CARDS — reveal as each card approaches the viewport.
        cards.forEach((card, index) => {
            gsap.from(card, {
                y: isMobile ? 22 : 35,
                x: isMobile ? 0 : (index % 2 === 0 ? -25 : 25),
                autoAlpha: 0,
                duration: isMobile ? 0.45 : 0.7,
                delay: isMobile ? 0 : index * 0.04,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: card,
                    start: isMobile ? "top 98%" : "top 88%",
                    toggleActions: "play none none none",
                    once: true
                }
            });
        });

        // TIMELINE — retain the scroll-linked glow.
        if (progress) {
            gsap.fromTo(
                progress,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section.querySelector(".education-timeline"),
                        start: "top 85%",
                        end: "bottom 75%",
                        scrub: isMobile ? 0.2 : 0.6
                    }
                }
            );
        }

        // FOOTER — subtle reveal.
        if (footer) {
            gsap.from(footer, {
                y: 15,
                autoAlpha: 0,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: footer,
                    start: "top 98%",
                    once: true
                }
            });
        }

        // Recalculate after images, fonts and layout settle.
        requestAnimationFrame(() => ScrollTrigger.refresh());

        window.addEventListener("load", () => {
            ScrollTrigger.refresh();
        }, { once: true });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initEducationAnimations,
            { once: true }
        );
    } else {
        initEducationAnimations();
    }
})();
