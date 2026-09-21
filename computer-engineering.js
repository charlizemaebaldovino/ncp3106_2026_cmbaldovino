/* =========================================================
   COMPUTER ENGINEERING PAGE
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


        const exploreButton =
            document.getElementById(
                "exploreButton"
            );


        /* =================================================
           PAGE ENTER
        ================================================= */

        if (pageTransition) {

            pageTransition
                .classList
                .add(
                    "entering"
                );


            setTimeout(
                function () {

                    pageTransition
                        .classList
                        .remove(
                            "entering"
                        );

                },
                1050
            );

        }


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


        document
            .documentElement
            .dataset
            .theme =
            savedTheme;


        if (themeToggle) {

            themeToggle
                .addEventListener(
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


                        localStorage
                            .setItem(
                                "cpe-theme",
                                next
                            );

                    }
                );

        }


        /* =================================================
           CLOCK
        ================================================= */

        function updateClock() {

            if (!clock) {
                return;
            }


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
                    new Date()
                );

        }


        updateClock();


        setInterval(
            updateClock,
            1000
        );


        /* =================================================
           EXPLORE BUTTON
        ================================================= */

        if (exploreButton) {

            exploreButton
                .addEventListener(
                    "click",
                    function () {

                        const definition =
                            document
                                .getElementById(
                                    "definition"
                                );


                        if (definition) {

                            definition
                                .scrollIntoView(
                                    {
                                        behavior:
                                            "smooth"
                                    }
                                );

                        }

                    }
                );

        }


        /* =================================================
           SCROLL REVEALS
        ================================================= */

        const revealItems =
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
                        threshold: .12,

                        rootMargin:
                            "0px 0px -40px 0px"
                    }

                );


            revealItems
                .forEach(
                    function (item) {

                        observer
                            .observe(
                                item
                            );

                    }
                );

        }

        else {

            revealItems
                .forEach(
                    function (item) {

                        item
                            .classList
                            .add(
                                "visible"
                            );

                    }
                );

        }


        /* =================================================
           MAJOR AREA CARDS
           CLICK SUPPORT FOR PHONES
        ================================================= */

        const areaCards =
            document.querySelectorAll(
                ".area-card"
            );


        areaCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        /*
                         * Only one card stays
                         * open at a time.
                         */

                        areaCards.forEach(
                            function (other) {

                                if (
                                    other !==
                                    card
                                ) {

                                    other
                                        .classList
                                        .remove(
                                            "active"
                                        );

                                }

                            }
                        );


                        card
                            .classList
                            .toggle(
                                "active"
                            );

                    }
                );

            }
        );


        /* =================================================
           APPLICATION POPUP
        ================================================= */

        const modal =
            document.getElementById(
                "appModal"
            );


        const modalClose =
            document.getElementById(
                "modalClose"
            );


        const modalTitle =
            document.getElementById(
                "modalTitle"
            );


        const modalCode =
            document.getElementById(
                "modalCode"
            );


        const modalDescription =
            document.getElementById(
                "modalDescription"
            );


        const applicationCards =
            document.querySelectorAll(
                ".application-card"
            );


        function openModal(card) {

            if (!modal) {
                return;
            }


            const title =
                card.dataset.title ||
                "";


            const code =
                card.dataset.code ||
                "CPE";


            const description =
                card.dataset.description ||
                "";


            if (modalTitle) {

                modalTitle.textContent =
                    title;

            }


            if (modalCode) {

                modalCode.textContent =
                    code;

            }


            if (modalDescription) {

                modalDescription
                    .textContent =
                    description;

            }


            modal
                .classList
                .add(
                    "open"
                );


            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body
                .style
                .overflow =
                "hidden";

        }


        function closeModal() {

            if (!modal) {
                return;
            }


            modal
                .classList
                .remove(
                    "open"
                );


            modal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body
                .style
                .overflow =
                "";

        }


        applicationCards
            .forEach(
                function (card) {

                    card.addEventListener(
                        "click",
                        function () {

                            openModal(
                                card
                            );

                        }
                    );

                }
            );


        if (modalClose) {

            modalClose
                .addEventListener(
                    "click",
                    closeModal
                );

        }


        if (modal) {

            const backdrop =
                modal.querySelector(
                    ".modal-backdrop"
                );


            if (backdrop) {

                backdrop
                    .addEventListener(
                        "click",
                        closeModal
                    );

            }

        }


        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeModal();

                }

            }
        );


        /* =================================================
           PAGE LINKS
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
                            href.startsWith("#")
                        ) {

                            return;
                        }


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
                                "entering"
                            );


                        pageTransition
                            .classList
                            .add(
                                "leaving"
                            );


                        setTimeout(
                            function () {

                                window.location.href =
                                    href;

                            },
                            700
                        );

                    }
                );

            }
        );


        /* =================================================
           CURSOR TRAIL
        ================================================= */

        const finePointer =
            window.matchMedia(
                "(pointer: fine)"
            ).matches;


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (
            finePointer &&
            !reducedMotion
        ) {

            const COUNT =
                12;


            const circles =
                [];


            let mouseX =
                -100;


            let mouseY =
                -100;


            let active =
                false;


            for (
                let i = 0;
                i < COUNT;
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


            document
                .addEventListener(
                    "mousemove",
                    function (event) {

                        mouseX =
                            event.clientX;


                        mouseY =
                            event.clientY;


                        active =
                            true;

                    }
                );


            document
                .addEventListener(
                    "mouseleave",
                    function () {

                        active =
                            false;

                    }
                );


            document
                .addEventListener(
                    "mouseenter",
                    function () {

                        active =
                            true;

                    }
                );


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
                            ) * .30;


                        circle.y +=
                            (
                                y -
                                circle.y
                            ) * .30;


                        const size =
                            Math.max(
                                3,
                                12 -
                                index * .65
                            );


                        const opacity =
                            active
                                ? Math.max(
                                    .05,
                                    .46 -
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
           SUBTLE HERO PARALLAX
        ================================================= */

        const heroTitle =
            document.querySelector(
                ".hero-title"
            );


        if (
            heroTitle &&
            !reducedMotion
        ) {

            window.addEventListener(
                "scroll",
                function () {

                    const scroll =
                        window.scrollY;


                    if (
                        scroll < 900
                    ) {

                        heroTitle
                            .style
                            .transform =

                            "translateY(" +
                            scroll *
                            .045 +
                            "px)";

                    }

                },

                {
                    passive: true
                }
            );

        }


        /* =================================================
           BACK BUTTON FIX
        ================================================= */

        window.addEventListener(
            "pageshow",
            function (event) {

                if (
                    event.persisted
                ) {

                    document.body
                        .classList
                        .add(
                            "loaded"
                        );


                    if (
                        pageTransition
                    ) {

                        pageTransition
                            .classList
                            .remove(
                                "leaving",
                                "entering"
                            );

                    }


                    revealItems
                        .forEach(
                            function (item) {

                                item
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