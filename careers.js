/* =========================================================
   UE MANILA — COMPUTER ENGINEERING
   CAREERS.JS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );


        const clock =
            document.getElementById(
                "clock"
            );


        const pageTransition =
            document.getElementById(
                "pageTransition"
            );


        /* =================================================
           PAGE ENTER ANIMATION
        ================================================= */

        if (pageTransition) {

            pageTransition.classList.add(
                "page-enter"
            );


            setTimeout(
                function () {

                    pageTransition
                        .classList
                        .remove(
                            "page-enter"
                        );

                },
                1100
            );

        }


        /*
         * Trigger the large CAREER title
         * after the page begins.
         */

        setTimeout(
            function () {

                document.body
                    .classList
                    .add(
                        "loaded"
                    );

            },
            180
        );


        /* =================================================
           THEME
        ================================================= */

        const savedTheme =
            localStorage.getItem(
                "cpe-theme"
            ) || "light";


        document.documentElement
            .dataset.theme =
            savedTheme;


        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                function () {

                    const current =
                        document
                            .documentElement
                            .dataset
                            .theme;


                    const next =
                        current === "dark"
                            ? "light"
                            : "dark";


                    document
                        .documentElement
                        .dataset
                        .theme =
                        next;


                    localStorage.setItem(
                        "cpe-theme",
                        next
                    );

                }
            );

        }


        /* =================================================
           MANILA CLOCK
        ================================================= */

        function updateClock() {

            if (!clock) {
                return;
            }


            const now =
                new Date();


            const formatter =
                new Intl.DateTimeFormat(
                    "en-PH",
                    {
                        timeZone:
                            "Asia/Manila",

                        hour:
                            "2-digit",

                        minute:
                            "2-digit",

                        second:
                            "2-digit",

                        hour12:
                            false
                    }
                );


            clock.textContent =
                "MANILA " +
                formatter.format(
                    now
                );

        }


        updateClock();


        setInterval(
            updateClock,
            1000
        );


        /* =================================================
           SCROLL REVEAL
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const observer =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry
                                        .isIntersecting
                                ) {

                                    entry
                                        .target
                                        .classList
                                        .add(
                                            "visible"
                                        );


                                    observer
                                        .unobserve(
                                            entry
                                                .target
                                        );

                                }

                            }
                        );

                    },

                    {
                        threshold:
                            0.12,

                        rootMargin:
                            "0px 0px -50px 0px"
                    }

                );


            revealElements.forEach(
                function (element) {

                    observer.observe(
                        element
                    );

                }
            );

        }

        else {

            revealElements.forEach(
                function (element) {

                    element
                        .classList
                        .add(
                            "visible"
                        );

                }
            );

        }


        /* =================================================
           CAREER CARD MOUSE POSITION
        ================================================= */

        const careerCards =
            document.querySelectorAll(
                ".career-card"
            );


        careerCards.forEach(
            function (card) {

                card.addEventListener(
                    "mousemove",
                    function (event) {

                        const rect =
                            card
                                .getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        card.style
                            .setProperty(
                                "--mouse-x",
                                x + "px"
                            );


                        card.style
                            .setProperty(
                                "--mouse-y",
                                y + "px"
                            );

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    function () {

                        card.style
                            .removeProperty(
                                "--mouse-x"
                            );


                        card.style
                            .removeProperty(
                                "--mouse-y"
                            );

                    }
                );

            }
        );


        /* =================================================
           PAGE TRANSITION LINKS
        ================================================= */

        const pageLinks =
            document.querySelectorAll(
                ".page-link"
            );


        pageLinks.forEach(
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
                            href.startsWith(
                                "#"
                            )
                        ) {

                            return;
                        }


                        /*
                         * Do not interfere with
                         * Ctrl / Cmd click.
                         */

                        if (
                            event.ctrlKey ||
                            event.metaKey ||
                            event.shiftKey ||
                            event.altKey
                        ) {

                            return;
                        }


                        event.preventDefault();


                        if (
                            !pageTransition
                        ) {

                            window.location.href =
                                href;

                            return;
                        }


                        pageTransition
                            .classList
                            .remove(
                                "page-enter"
                            );


                        pageTransition
                            .classList
                            .add(
                                "page-exit"
                            );


                        setTimeout(
                            function () {

                                window.location.href =
                                    href;

                            },
                            720
                        );

                    }
                );

            }
        );


        /* =================================================
           CURSOR TRAIL
           Light mode → navy
           Dark mode  → cream
        ================================================= */

        const supportsMouse =
            window.matchMedia(
                "(pointer: fine)"
            ).matches;


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (
            supportsMouse &&
            !reducedMotion
        ) {

            const TRAIL_COUNT =
                12;


            const circles =
                [];


            let mouseX =
                -100;


            let mouseY =
                -100;


            let mouseActive =
                false;


            /* =============================================
               CREATE TRAIL
            ============================================= */

            for (
                let i = 0;
                i < TRAIL_COUNT;
                i++
            ) {

                const circle =
                    document
                        .createElement(
                            "span"
                        );


                circle.className =
                    "cursor-trail-circle";


                const size =
                    Math.max(
                        3,
                        12 -
                        i * .65
                    );


                circle.style.width =
                    size + "px";


                circle.style.height =
                    size + "px";


                document.body
                    .appendChild(
                        circle
                    );


                circles.push(
                    {
                        element:
                            circle,

                        x:
                            mouseX,

                        y:
                            mouseY
                    }
                );

            }


            /* =============================================
               MOUSE
            ============================================= */

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


            /* =============================================
               ANIMATE
            ============================================= */

            function animateTrail() {

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
                            (
                                x -
                                circle.x
                            ) *
                            .30;


                        circle.y +=
                            (
                                y -
                                circle.y
                            ) *
                            .30;


                        const size =
                            Math.max(
                                3,
                                12 -
                                index *
                                .65
                            );


                        const opacity =
                            mouseActive
                                ? Math.max(
                                    .05,
                                    .48 -
                                    index *
                                    .035
                                )
                                : 0;


                        circle
                            .element
                            .style
                            .opacity =
                            opacity;


                        circle
                            .element
                            .style
                            .transform =

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
                    animateTrail
                );

            }


            animateTrail();

        }


        /* =================================================
           HERO SCROLL BUTTON
        ================================================= */

        const heroScroll =
            document.querySelector(
                ".hero-scroll"
            );


        const careerList =
            document.getElementById(
                "career-list"
            );


        if (
            heroScroll &&
            careerList
        ) {

            heroScroll.style.cursor =
                "pointer";


            heroScroll.addEventListener(
                "click",
                function () {

                    careerList
                        .scrollIntoView(
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


        /* =================================================
           PARALLAX TITLE
           Very subtle — desktop only
        ================================================= */

        if (
            supportsMouse &&
            !reducedMotion
        ) {

            const title =
                document.querySelector(
                    ".career-title"
                );


            window.addEventListener(
                "scroll",
                function () {

                    if (!title) {
                        return;
                    }


                    const scrollY =
                        window.scrollY;


                    if (
                        scrollY < 900
                    ) {

                        title.style.transform =
                            "translateY(" +
                            scrollY *
                            .055 +
                            "px)";

                    }

                },

                {
                    passive: true
                }
            );

        }


        /* =================================================
           BROWSER BACK BUTTON FIX
        ================================================= */

        window.addEventListener(
            "pageshow",
            function (event) {

                if (
                    event.persisted
                ) {

                    if (
                        pageTransition
                    ) {

                        pageTransition
                            .classList
                            .remove(
                                "page-exit"
                            );

                    }


                    document.body
                        .classList
                        .add(
                            "loaded"
                        );


                    revealElements
                        .forEach(
                            function (
                                element
                            ) {

                                element
                                    .classList
                                    .add(
                                        "visible"
                                    );

                            }
                        );

                }

            }
        );


    }
);