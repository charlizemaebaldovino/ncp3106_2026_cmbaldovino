/* =========================================================
   UE MANILA — COMPUTER ENGINEERING
   INDEX.JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const intro = document.getElementById("intro");
    const introVideo = document.getElementById("introVideo");
    const introVideoSource = document.getElementById("introVideoSource");

    const sharedTitle = document.getElementById("sharedTitle");
    const heroTarget = document.getElementById("heroTitleTarget");

    const site = document.getElementById("site");

    const themeToggle = document.getElementById("themeToggle");
    const clock = document.getElementById("clock");


    /* =====================================================
       THEME
    ===================================================== */

    // Start every preview in the light theme; the toggle still changes the active session.
    const savedTheme = "light";

    document.documentElement.dataset.theme = savedTheme;
    document.documentElement.dataset.introTheme = savedTheme;


    /* =====================================================
       INTRO VIDEO
    ===================================================== */

    if (introVideoSource) {

        introVideoSource.src =
            savedTheme === "dark"
                ? "assets/dark.mp4"
                : "assets/light.mp4";
    }

    if (introVideo) {

        introVideo.load();

        introVideo.play().catch(function () {
            /* Browser may block autoplay */
        });
    }


    /* =====================================================
       THEME TOGGLE
    ===================================================== */

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const currentTheme =
                document.documentElement.dataset.theme || "light";

            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            document.documentElement.dataset.theme =
                newTheme;

            document.documentElement.dataset.introTheme =
                newTheme;

            localStorage.setItem(
                "cpe-theme",
                newTheme
            );
        });
    }


    /* =====================================================
       MANILA CLOCK
    ===================================================== */

    function updateClock() {

        if (!clock) {
            return;
        }

        const now = new Date();

        const formatter =
            new Intl.DateTimeFormat(
                "en-PH",
                {
                    timeZone: "Asia/Manila",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false
                }
            );

        clock.textContent =
            "MANILA " + formatter.format(now);
    }

    updateClock();

    setInterval(
        updateClock,
        1000
    );


    /* =====================================================
       INTRO / COMPUTER ENGINEERING TITLE ANIMATION
    ===================================================== */

    const TITLE_APPEAR_DELAY = 5200;
    const TITLE_MOVE_DELAY = 650;
    const TITLE_MOVE_DURATION = 1800;
    const TITLE_LOWER_SPACE = 45;


    function finishIntroWithoutAnimation() {

        if (sharedTitle) {

            sharedTitle.classList.add(
                "show",
                "title-landed"
            );
        }

        if (site) {

            site.classList.add(
                "home-ready"
            );
        }

        if (intro) {

            intro.classList.add(
                "go-home"
            );

            setTimeout(function () {

                intro.style.display =
                    "none";

            }, 1000);
        }
    }


    function animateTitleToHero() {

        if (
            !sharedTitle ||
            !heroTarget
        ) {

            finishIntroWithoutAnimation();
            return;
        }


        sharedTitle.classList.add(
            "show"
        );


        const titleRect =
            sharedTitle.getBoundingClientRect();


        const startLeft =
            (window.innerWidth -
            titleRect.width) / 2;


        const startTop =
            (window.innerHeight -
            titleRect.height) / 2;


        sharedTitle.style.position =
            "fixed";


        sharedTitle.style.left =
            startLeft + "px";


        sharedTitle.style.top =
            startTop + "px";


        sharedTitle.style.transform =
            "scale(0.72)";


        setTimeout(function () {

            const destination =
                heroTarget.getBoundingClientRect();


            const finalLeft =
                destination.left;


            const finalTop =
                destination.top +
                TITLE_LOWER_SPACE;


            const current =
                sharedTitle.getBoundingClientRect();


            if (!sharedTitle.animate) {

                finishIntroWithoutAnimation();
                return;
            }


            const animation =
                sharedTitle.animate(

                    [
                        {
                            left:
                                current.left + "px",

                            top:
                                current.top + "px",

                            transform:
                                "scale(0.72)"
                        },

                        {
                            left:
                                finalLeft + "px",

                            top:
                                finalTop + "px",

                            transform:
                                "scale(1)"
                        }
                    ],

                    {
                        duration:
                            TITLE_MOVE_DURATION,

                        easing:
                            "cubic-bezier(.16,.84,.24,1)",

                        fill:
                            "forwards"
                    }

                );


            animation.finished
                .then(function () {

                    const documentTop =
                        finalTop +
                        window.scrollY;


                    sharedTitle.style.position =
                        "absolute";


                    sharedTitle.style.left =
                        finalLeft + "px";


                    sharedTitle.style.top =
                        documentTop + "px";


                    sharedTitle.style.transform =
                        "scale(1)";


                    sharedTitle.style.animation =
                        "none";


                    sharedTitle.classList.add(
                        "title-landed"
                    );


                    if (site) {

                        site.classList.add(
                            "home-ready"
                        );
                    }


                    if (intro) {

                        intro.classList.add(
                            "go-home"
                        );


                        setTimeout(function () {

                            intro.style.display =
                                "none";

                        }, 2200);
                    }

                })

                .catch(function () {

                    finishIntroWithoutAnimation();

                });


        }, TITLE_MOVE_DELAY);
    }


    /* =====================================================
       START INTRO
    ===================================================== */

    setTimeout(function () {

        animateTitleToHero();

    }, TITLE_APPEAR_DELAY);


    /* =====================================================
       INTRO SAFETY
    ===================================================== */

    setTimeout(function () {

        if (
            intro &&
            intro.style.display !== "none"
        ) {

            if (site) {

                site.classList.add(
                    "home-ready"
                );
            }
        }

    }, 10000);


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );
                            }

                        }
                    );

                },

                {
                    threshold: 0.12
                }

            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    }

    else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );
    }


    /* =====================================================
       GO DEEPER IMAGE TRANSITION

       IMPORTANT:
       CSS handles the actual animation.

       DEFAULT:
       - Cover image is visible.

       HOVER:
       - Cover image disappears COMPLETELY.
       - Inside image appears.

       MOUSE LEAVE:
       - Cover image comes back.
    ===================================================== */

    const pageCards =
        document.querySelectorAll(
            ".page-card"
        );


    pageCards.forEach(
        function (card) {

            card.addEventListener(
                "mouseenter",
                function () {

                    card.classList.add(
                        "page-card-active"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.classList.remove(
                        "page-card-active"
                    );

                }
            );


            /* Keyboard accessibility */

            card.addEventListener(
                "focus",
                function () {

                    card.classList.add(
                        "page-card-active"
                    );

                }
            );


            card.addEventListener(
                "blur",
                function () {

                    card.classList.remove(
                        "page-card-active"
                    );

                }
            );

        }
    );


    /* =====================================================
       BACK BUTTON / BROWSER CACHE FIX
    ===================================================== */

    window.addEventListener(
        "pageshow",
        function (event) {

            if (event.persisted) {

                if (intro) {

                    intro.style.display =
                        "none";
                }


                if (site) {

                    site.classList.add(
                        "home-ready"
                    );
                }


                revealElements.forEach(
                    function (element) {

                        element.classList.add(
                            "visible"
                        );

                    }
                );


                /*
                 * Make sure GO DEEPER cards
                 * return to their original image.
                 */

                pageCards.forEach(
                    function (card) {

                        card.classList.remove(
                            "page-card-active"
                        );

                    }
                );
            }

        }
    );


    /* =====================================================
       CURSOR TRAIL

       LIGHT MODE = DARK NAVY
       DARK MODE  = CREAM
    ===================================================== */

    const supportsMouse =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (supportsMouse) {

        const TRAIL_COUNT = 14;

        const circles = [];


        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;


        let mouseActive =
            false;


        /* CREATE CIRCLES */

        for (
            let i = 0;
            i < TRAIL_COUNT;
            i++
        ) {

            const circle =
                document.createElement(
                    "div"
                );


            circle.className =
                "cursor-trail-circle";


            circle.style.position =
                "fixed";


            circle.style.left =
                "0";


            circle.style.top =
                "0";


            circle.style.width =
                "12px";


            circle.style.height =
                "12px";


            circle.style.borderRadius =
                "50%";


            circle.style.pointerEvents =
                "none";


            circle.style.zIndex =
                "99999";


            circle.style.opacity =
                "0";


            circle.style.willChange =
                "transform";


            document.body.appendChild(
                circle
            );


            circles.push({

                element:
                    circle,

                x:
                    mouseX,

                y:
                    mouseY

            });

        }


        /* CURSOR COLOR */

        function updateCursorColor() {

            const theme =
                document.documentElement
                    .dataset.theme ||
                "light";


            const cursorColor =
                theme === "dark"
                    ? "#d1cfc9"
                    : "#0f1a2b";


            circles.forEach(
                function (circle) {

                    circle.element.style.background =
                        cursorColor;

                }
            );
        }


        updateCursorColor();


        /* UPDATE WHEN THEME CHANGES */

        const themeObserver =
            new MutationObserver(
                function () {

                    updateCursorColor();

                }
            );


        themeObserver.observe(
            document.documentElement,
            {
                attributes: true,

                attributeFilter: [
                    "data-theme"
                ]
            }
        );


        /* MOUSE POSITION */

        document.addEventListener(
            "mousemove",
            function (event) {

                mouseX =
                    event.clientX;


                mouseY =
                    event.clientY;


                mouseActive =
                    true;

            }
        );


        document.addEventListener(
            "mouseleave",
            function () {

                mouseActive =
                    false;

            }
        );


        document.addEventListener(
            "mouseenter",
            function () {

                mouseActive =
                    true;

            }
        );


        /* ANIMATE TRAIL */

        function animateCursorTrail() {

            let x =
                mouseX;

            let y =
                mouseY;


            circles.forEach(
                function (
                    circle,
                    index
                ) {

                    circle.x +=
                        (x - circle.x) *
                        0.32;


                    circle.y +=
                        (y - circle.y) *
                        0.32;


                    const size =
                        Math.max(
                            3,
                            14 -
                            index * 0.75
                        );


                    const opacity =
                        mouseActive
                            ? Math.max(
                                0.06,
                                0.50 -
                                index * 0.03
                            )
                            : 0;


                    circle.element.style.width =
                        size + "px";


                    circle.element.style.height =
                        size + "px";


                    circle.element.style.opacity =
                        opacity;


                    circle.element.style.transform =
                        "translate3d(" +
                        (
                            circle.x -
                            size / 2
                        ) +
                        "px," +
                        (
                            circle.y -
                            size / 2
                        ) +
                        "px,0)";


                    x =
                        circle.x;


                    y =
                        circle.y;

                }
            );


            requestAnimationFrame(
                animateCursorTrail
            );
        }


        animateCursorTrail();
    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {

                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView(
                        {
                            behavior:
                                "smooth",

                            block:
                                "start"
                        }
                    );

                }
            );

        }
    );

});