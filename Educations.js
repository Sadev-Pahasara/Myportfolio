
/* ==========================================
   EDUCATION — GSAP + MOBILE FIX
========================================== */

(() => {
    function initEducationAnimations() {
        const section = document.querySelector(".education-section");

        if (!section) return;

        // Fail safely if GSAP or ScrollTrigger didn't load.
        if (!window.gsap || !window.ScrollTrigger) {
            section.querySelectorAll(".education-card").forEach(card => {
                card.style.opacity = "1";
                card.style.visibility = "visible";
                card.style.transform = "none";
            });

            if (section.querySelector(".education-header")) {
                section.querySelector(".education-header").style.opacity = "1";
                section.querySelector(".education-header").style.visibility = "visible";
            }

            return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        const header = section.querySelector(".education-header");
        const cards = gsap.utils.toArray(
            section.querySelectorAll(".education-card")
        );
        const progress = section.querySelector(".timeline-progress");
        const footer = section.querySelector(".education-bottom");

        const nodes = section.querySelectorAll(".timeline-node");

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        const isRealMobile = window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches;

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        /* ----------------------------------
           REDUCED MOTION
        ---------------------------------- */

        if (reduceMotion) {
            gsap.set([header, ...cards, footer].filter(Boolean), {
                autoAlpha: 1,
                clearProps: "transform"
            });

            if (progress) {
                gsap.set(progress, { height: "100%" });
            }

            return;
        }

        /* ----------------------------------
           HEADER REVEAL
        ---------------------------------- */

        if (header) {
            gsap.fromTo(
                header,
                {
                    autoAlpha: 0,
                    y: 35
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%",
                        once: true
                    }
                }
            );
        }

        /* ----------------------------------
           TIMELINE PROGRESS
        ---------------------------------- */

        if (progress) {
            gsap.fromTo(
                progress,
                {
                    height: "0%"
                },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: section.querySelector(
                            ".education-timeline"
                        ),
                        start: "top 65%",
                        end: "bottom 65%",
                        scrub: isMobile ? 0.2 : 0.8
                    }
                }
            );
        }

        /* ----------------------------------
           EDUCATION CARDS
        ---------------------------------- */

        cards.forEach((card, index) => {
            const fromX = isMobile
                ? 0
                : (index % 2 === 0 ? -55 : 55);

            gsap.fromTo(
                card,
                {
                    autoAlpha: 0,
                    x: fromX,
                    y: isMobile ? 25 : 35
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: isMobile ? 0.5 : 0.9,
                    delay: isMobile ? 0 : index * 0.05,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: isMobile ? "top 95%" : "top 84%",
                        once: true
                    }
                }
            );
        });

        /* ----------------------------------
           TIMELINE NODE ANIMATION
        ---------------------------------- */

        nodes.forEach(node => {
            const card = node.closest(".education-card");

            if (!card) return;

            ScrollTrigger.create({
                trigger: card,
                start: isMobile ? "top 95%" : "top 75%",
                once: true,

                onEnter: () => {
                    gsap.to(node, {
                        scale: 1.3,
                        duration: 0.3,
                        ease: "back.out(2)",
                        yoyo: true,
                        repeat: 1
                    });

                    gsap.to(node, {
                        boxShadow:
                            "0 0 22px rgba(118, 244, 255, 0.7)",
                        borderColor: "#76F4FF",
                        duration: 0.4
                    });
                }
            });
        });

        /* ----------------------------------
           BOTTOM STATEMENT
        ---------------------------------- */

        if (footer) {
            gsap.fromTo(
                footer,
                {
                    autoAlpha: 0,
                    y: 20
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 95%",
                        once: true
                    }
                }
            );
        }

        /* ----------------------------------
           MOBILE SCROLL FIX
        ---------------------------------- */

        if (isRealMobile) {
            let refreshFrame;

            const refreshEducation = () => {
                cancelAnimationFrame(refreshFrame);

                refreshFrame = requestAnimationFrame(() => {
                    ScrollTrigger.refresh();
                });
            };

            // Refresh after page load and browser history navigation.
            window.addEventListener("load", refreshEducation, {
                once: true
            });

            window.addEventListener("pageshow", refreshEducation);

            // Recalculate after rotating the phone.
            window.addEventListener("orientationchange", () => {
                setTimeout(refreshEducation, 250);
            });

            // Refresh when navigating directly to Education.
            document.querySelectorAll('a[href="#Education"]').forEach(link => {
                link.addEventListener("click", refreshEducation);
            });

            // Refresh when Education approaches the viewport.
            const observer = new IntersectionObserver(entries => {
                if (entries.some(entry => entry.isIntersecting)) {
                    refreshEducation();
                }
            }, {
                rootMargin: "150px 0px"
            });

            observer.observe(section);

            // Keep the observer alive for this section.
            section._educationObserver = observer;

            // Refresh after images or other assets change layout.
            section.querySelectorAll("img").forEach(img => {
                if (!img.complete) {
                    img.addEventListener("load", refreshEducation, {
                        once: true
                    });
                    img.addEventListener("error", refreshEducation, {
                        once: true
                    });
                }
            });

            // Clean up if this script is initialized again.
            section._refreshEducation = refreshEducation;
        }

        /* ----------------------------------
           INITIAL REFRESH
        ---------------------------------- */

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    }

    // Initialize once the document is ready.
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
