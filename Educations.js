
/* =========================================
   EDUCATION — GSAP SCROLL ANIMATIONS
========================================= */

(() => {
    function initEducationAnimations() {
        const section = document.querySelector(".education-section");

        if (!section || !window.gsap || !window.ScrollTrigger) {
            return;
        }

        const gsap = window.gsap;
        gsap.registerPlugin(window.ScrollTrigger);

        const header = section.querySelector(".education-header");
        const cards = section.querySelectorAll(".education-card");
        const progress = section.querySelector(".timeline-progress");
        const nodes = section.querySelectorAll(".timeline-node");

        // Respect reduced-motion accessibility preferences.
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.set([header, ...cards], {
                autoAlpha: 1,
                clearProps: "transform"
            });

            if (progress) {
                gsap.set(progress, { height: "100%" });
            }

            return;
        }

        // HEADER REVEAL
        if (header) {
            gsap.fromTo(
                header,
                {
                    autoAlpha: 0,
                    y: 45
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%",
                        once: true
                    }
                }
            );
        }

        // TIMELINE GLOW PROGRESS
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
                        trigger: section.querySelector(".education-timeline"),
                        start: "top 65%",
                        end: "bottom 65%",
                        scrub: 0.8
                    }
                }
            );
        }

        // INDIVIDUAL QUALIFICATION REVEALS
        cards.forEach((card, index) => {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            const fromX = isMobile ? 0 : (index % 2 === 0 ? -55 : 55);

            gsap.fromTo(
                card,
                {
                    autoAlpha: 0,
                    x: fromX,
                    y: 35
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 0.9,
                    delay: 0.05,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 84%",
                        once: true
                    }
                }
            );
        });

        // TIMELINE NODE GLOW
        nodes.forEach((node) => {
            ScrollTrigger.create({
                trigger: node.closest(".education-card"),
                start: "top 75%",
                once: true,
                onEnter: () => {
                    gsap.to(node, {
                        scale: 1.35,
                        duration: 0.3,
                        ease: "back.out(2)",
                        yoyo: true,
                        repeat: 1
                    });

                    gsap.to(node, {
                        boxShadow: "0 0 22px rgba(118, 244, 255, 0.7)",
                        borderColor: "#76F4FF",
                        duration: 0.4
                    });
                }
            });
        });

        // BOTTOM STATEMENT
        const footer = section.querySelector(".education-bottom");

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
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top 95%",
                        once: true
                    }
                }
            );
        }

        // Refresh measurements after the page loads.
        window.addEventListener("load", () => {
            ScrollTrigger.refresh();
        }, { once: true });
    }

    // Wait for GSAP if your existing scripts load it first.
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
