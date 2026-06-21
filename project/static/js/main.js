/* =========================================================
   CINEMATIC STUDIO - MAIN JS
   =========================================================
   Sections:
   1. Page loader
   2. Header scroll effect
   3. Mobile nav toggle
   4. Fade-in scroll animations
   5. Parallax effects (hero + about image)
   6. Custom cursor
   7. Portfolio filter (portfolio page)
   8. Footer year
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       1. PAGE LOADER
       Hides the loader shortly after the page is ready.
    ----------------------------------------------------- */
    const loader = document.getElementById("page-loader");
    if (loader) {
        window.addEventListener("load", function () {
            setTimeout(function () {
                loader.classList.add("loaded");
            }, 500);
        });
    }


    /* -----------------------------------------------------
       2. HEADER SCROLL EFFECT
    ----------------------------------------------------- */
    const header = document.getElementById("site-header");

    function handleHeaderScroll() {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll();


    /* -----------------------------------------------------
       3. MOBILE NAV TOGGLE
    ----------------------------------------------------- */
    const navToggle = document.getElementById("nav-toggle");
    const mainNav = document.getElementById("main-nav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", function () {
            mainNav.classList.toggle("open");
        });

        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mainNav.classList.remove("open");
            });
        });
    }


    /* -----------------------------------------------------
       4. FADE-IN SCROLL ANIMATIONS
       Any element with class "fade-in" animates in once
       it enters the viewport. Stagger groups by adding
       "delay-1", "delay-2", "delay-3" classes in HTML.
    ----------------------------------------------------- */
    const fadeEls = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    fadeEls.forEach(function (el) {
        observer.observe(el);
    });


    /* -----------------------------------------------------
       5. PARALLAX EFFECTS
       Subtle, performance-friendly parallax using
       requestAnimationFrame. Applies to the hero background
       image and the about-section image.
    ----------------------------------------------------- */
    const heroBg = document.querySelector(".hero-bg img");
    const aboutImg = document.querySelector(".about-image img");
    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;

        if (heroBg) {
            // Moves slower than scroll speed for a depth effect
            heroBg.style.transform = "translateY(" + scrollY * 0.18 + "px)";
        }

        if (aboutImg) {
            const rect = aboutImg.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Only animate while the image is near/within the viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
                const offset = (rect.top - windowHeight / 2) * 0.06;
                aboutImg.style.transform = "translateY(" + offset + "px) scale(1.08)";
            }
        }

        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    updateParallax();


    /* -----------------------------------------------------
       6. CUSTOM CURSOR
       A small dot that follows the mouse and grows when
       hovering interactive elements. Desktop only (see CSS).
    ----------------------------------------------------- */
    const cursorDot = document.getElementById("cursor-dot");

    if (cursorDot && window.matchMedia("(min-width: 993px)").matches) {
        document.addEventListener("mousemove", function (e) {
            cursorDot.style.left = e.clientX + "px";
            cursorDot.style.top = e.clientY + "px";
            cursorDot.classList.add("active");
        });

        document.addEventListener("mouseleave", function () {
            cursorDot.classList.remove("active");
        });

        const hoverTargets = document.querySelectorAll(
            "a, button, .service-row, .portfolio-item"
        );

        hoverTargets.forEach(function (el) {
            el.addEventListener("mouseenter", function () {
                cursorDot.classList.add("hovering");
            });
            el.addEventListener("mouseleave", function () {
                cursorDot.classList.remove("hovering");
            });
        });
    }


    /* -----------------------------------------------------
       7. PORTFOLIO FILTER (used on portfolio.html)
    ----------------------------------------------------- */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    if (filterButtons.length && portfolioItems.length) {
        filterButtons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                filterButtons.forEach(function (b) {
                    b.classList.remove("active");
                });
                btn.classList.add("active");

                const filterValue = btn.getAttribute("data-filter");

                portfolioItems.forEach(function (item) {
                    const category = item.getAttribute("data-category");
                    if (filterValue === "all" || category === filterValue) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                });
            });
        });
    }


    /* -----------------------------------------------------
       8. FOOTER YEAR
    ----------------------------------------------------- */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});
