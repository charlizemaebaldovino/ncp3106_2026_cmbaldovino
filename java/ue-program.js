/* =========================================================
   UE COMPUTER ENGINEERING PROGRAM
   ue-program.js
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           01. ELEMENTS
        ====================================================== */

        const html =
            document.documentElement;

        const body =
            document.body;

        const themeToggle =
            document.getElementById(
                "themeToggle"
            );

        const navLogoImage =
            document.getElementById(
                "navLogoImage"
            );

        const clock =
            document.getElementById(
                "clock"
            );

        const navigation =
            document.querySelector(
                ".main-navigation"
            );

        const exploreButton =
            document.getElementById(
                "exploreButton"
            );

        const pageTransition =
            document.getElementById(
                "pageTransition"
            );

        const cursorTrail =
            document.getElementById(
                "cursorTrail"
            );


        /* =====================================================
           02. PAGE ENTRANCE
        ====================================================== */

        if (pageTransition) {

            pageTransition.classList.add(
                "is-entering"
            );


            window.setTimeout(
                () => {

                    pageTransition.classList.remove(
                        "is-entering"
                    );

                },
                800
            );

        }


        /* =====================================================
           03. THEME
           LIGHT = SUN
           DARK  = MOON
        ====================================================== */

        const savedTheme =
            localStorage.getItem(
                "cpe-theme"
            ) || "light";


        function updateLogo(theme) {

            if (!navLogoImage) {
                return;
            }


            navLogoImage.src =
                theme === "dark"
                    ? "assets/light.png"
                    : "assets/dark.png";

        }


        function updateThemeButton(theme) {

            if (!themeToggle) {
                return;
            }


            if (theme === "dark") {

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to light mode"
                );

            } else {

                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                themeToggle.setAttribute(
                    "title",
                    "Switch to dark mode"
                );

            }

        }


        function setTheme(theme) {

            html.dataset.theme =
                theme;


            localStorage.setItem(
                "cpe-theme",
                theme
            );


            updateLogo(
                theme
            );


            updateThemeButton(
                theme
            );

        }


        /*
         * Apply saved theme when the page loads.
         */

        setTheme(
            savedTheme
        );


        function updateClock() {

            if (!clock) {
                return;
            }

            const time =
                new Intl.DateTimeFormat(
                    "en-GB",
                    {
                        timeZone: "Asia/Manila",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false
                    }
                ).format(new Date());

            clock.textContent =
                `MANILA ${time}`;
        }


        updateClock();

        setInterval(
            updateClock,
            1000
        );


        /*
         * Toggle light / dark mode.
         */

        if (themeToggle) {

            themeToggle.addEventListener(
                "click",
                () => {

                    const currentTheme =
                        html.dataset.theme;


                    const newTheme =
                        currentTheme === "dark"
                            ? "light"
                            : "dark";


                    setTheme(
                        newTheme
                    );


                    /*
                     * Small page fade when changing theme.
                     */

                    if (
                        !window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches
                    ) {

                        body.animate(
                            [
                                {
                                    opacity:
                                        0.9
                                },

                                {
                                    opacity:
                                        1
                                }
                            ],
                            {
                                duration:
                                    350,

                                easing:
                                    "ease-out"
                            }
                        );

                    }

                }
            );

        }


        /* =====================================================
           04. NAVIGATION SCROLL EFFECT
        ====================================================== */

        function updateNavigation() {

            if (!navigation) {
                return;
            }


            if (window.scrollY > 20) {

                navigation.classList.add(
                    "is-scrolled"
                );

            } else {

                navigation.classList.remove(
                    "is-scrolled"
                );

            }

        }


        updateNavigation();


        window.addEventListener(
            "scroll",
            updateNavigation,
            {
                passive:
                    true
            }
        );


        /* =====================================================
           05. EXPLORE PROGRAM BUTTON
        ====================================================== */

        if (exploreButton) {

            exploreButton.addEventListener(
                "click",
                () => {

                    const overview =
                        document.getElementById(
                            "overview"
                        );


                    if (overview) {

                        overview.scrollIntoView(
                            {
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            }
                        );

                    }

                }
            );

        }


        /* =====================================================
           06. SCROLL REVEAL
        ====================================================== */

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
                    entries => {

                        entries.forEach(
                            entry => {

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
                        threshold:
                            0.12,

                        rootMargin:
                            "0px 0px -45px 0px"
                    }
                );


            revealElements.forEach(
                element => {

                    revealObserver.observe(
                        element
                    );

                }
            );

        } else {

            revealElements.forEach(
                element => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }


        /* =====================================================
           07. HERO TEXT ENTRANCE
        ====================================================== */

        const heroLines =
            document.querySelectorAll(
                ".hero-line"
            );


        heroLines.forEach(
            (line, index) => {

                if (
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    return;
                }


                line.animate(
                    [
                        {
                            opacity:
                                0,

                            transform:
                                "translateY(55px)"
                        },

                        {
                            opacity:
                                1,

                            transform:
                                "translateY(0)"
                        }
                    ],
                    {
                        duration:
                            850,

                        delay:
                            130 + index * 100,

                        easing:
                            "cubic-bezier(.2,.8,.2,1)",

                        fill:
                            "both"
                    }
                );

            }
        );


        /* =====================================================
           08. OBJECTIVE CARD ANIMATION
        ====================================================== */

        const objectiveCards =
            document.querySelectorAll(
                ".objective-card"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const objectiveObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                const cards =
                                    Array.from(
                                        objectiveCards
                                    );


                                const index =
                                    cards.indexOf(
                                        entry.target
                                    );


                                if (
                                    !window.matchMedia(
                                        "(prefers-reduced-motion: reduce)"
                                    ).matches
                                ) {

                                    entry.target.animate(
                                        [
                                            {
                                                opacity:
                                                    0,

                                                transform:
                                                    "translateX(-30px)"
                                            },

                                            {
                                                opacity:
                                                    1,

                                                transform:
                                                    "translateX(0)"
                                            }
                                        ],
                                        {
                                            duration:
                                                650,

                                            delay:
                                                Math.max(
                                                    0,
                                                    index * 70
                                                ),

                                            easing:
                                                "cubic-bezier(.2,.8,.2,1)",

                                            fill:
                                                "both"
                                        }
                                    );

                                }


                                objectiveObserver.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold:
                            0.15
                    }
                );


            objectiveCards.forEach(
                card => {

                    objectiveObserver.observe(
                        card
                    );

                }
            );

        }


        /* =====================================================
           09. SKILL ROW HOVER
        ====================================================== */

        const skillRows =
            document.querySelectorAll(
                ".skill-row"
            );


        skillRows.forEach(
            row => {

                row.addEventListener(
                    "mouseenter",
                    () => {

                        if (
                            window.matchMedia(
                                "(prefers-reduced-motion: reduce)"
                            ).matches
                        ) {
                            return;
                        }


                        row.animate(
                            [
                                {
                                    transform:
                                        "translateX(0)"
                                },

                                {
                                    transform:
                                        "translateX(6px)"
                                }
                            ],
                            {
                                duration:
                                    220,

                                easing:
                                    "ease-out",

                                fill:
                                    "forwards"
                            }
                        );

                    }
                );


                row.addEventListener(
                    "mouseleave",
                    () => {

                        row.animate(
                            [
                                {
                                    transform:
                                        "translateX(6px)"
                                },

                                {
                                    transform:
                                        "translateX(0)"
                                }
                            ],
                            {
                                duration:
                                    220,

                                easing:
                                    "ease-out",

                                fill:
                                    "forwards"
                            }
                        );

                    }
                );

            }
        );


        /* =====================================================
           10. RESEARCH ACCORDION
        ====================================================== */

        const researchItems =
            document.querySelectorAll(
                ".research-item"
            );


        researchItems.forEach(
            item => {

                const trigger =
                    item.querySelector(
                        ".research-trigger"
                    );


                if (!trigger) {
                    return;
                }


                trigger.addEventListener(
                    "click",
                    () => {

                        const isActive =
                            item.classList.contains(
                                "active"
                            );


                        /*
                         * Close the other research items.
                         */

                        researchItems.forEach(
                            otherItem => {

                                otherItem.classList.remove(
                                    "active"
                                );


                                const otherTrigger =
                                    otherItem.querySelector(
                                        ".research-trigger"
                                    );


                                if (otherTrigger) {

                                    otherTrigger.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );

                                }

                            }
                        );


                        /*
                         * Open selected item unless
                         * it was already open.
                         */

                        if (!isActive) {

                            item.classList.add(
                                "active"
                            );


                            trigger.setAttribute(
                                "aria-expanded",
                                "true"
                            );

                        }

                    }
                );

            }
        );


        /* =====================================================
           11. IMAGE VIEWER
        ====================================================== */

        const galleryItems =
            Array.from(
                document.querySelectorAll(
                    ".gallery-item"
                )
            );


        const imageViewer =
            document.getElementById(
                "imageViewer"
            );

        const viewerBackdrop =
            document.getElementById(
                "viewerBackdrop"
            );

        const viewerClose =
            document.getElementById(
                "viewerClose"
            );

        const viewerImage =
            document.getElementById(
                "viewerImage"
            );

        const viewerNumber =
            document.getElementById(
                "viewerNumber"
            );

        const viewerSubtitle =
            document.getElementById(
                "viewerSubtitle"
            );

        const viewerTitle =
            document.getElementById(
                "viewerTitle"
            );

        const viewerDescription =
            document.getElementById(
                "viewerDescription"
            );

        const viewerCounter =
            document.getElementById(
                "viewerCounter"
            );

        const viewerPrev =
            document.getElementById(
                "viewerPrev"
            );

        const viewerNext =
            document.getElementById(
                "viewerNext"
            );


        let currentImageIndex =
            0;


        function formatNumber(number) {

            return String(
                number
            ).padStart(
                2,
                "0"
            );

        }


        function updateViewer() {

            if (
                galleryItems.length === 0
            ) {
                return;
            }


            const item =
                galleryItems[
                    currentImageIndex
                ];


            const image =
                item.dataset.image || "";

            const title =
                item.dataset.title || "";

            const subtitle =
                item.dataset.subtitle ||
                "UE MANILA / CPE";

            const description =
                item.dataset.description || "";


            if (viewerImage) {

                viewerImage.src =
                    image;

                viewerImage.alt =
                    title;

            }


            if (viewerTitle) {

                viewerTitle.textContent =
                    title;

            }


            if (viewerSubtitle) {

                viewerSubtitle.textContent =
                    subtitle;

            }


            if (viewerDescription) {

                viewerDescription.textContent =
                    description;

            }


            if (viewerNumber) {

                viewerNumber.textContent =
                    `UE CPE / ${formatNumber(
                        currentImageIndex + 1
                    )}`;

            }


            if (viewerCounter) {

                viewerCounter.textContent =
                    `${formatNumber(
                        currentImageIndex + 1
                    )} / ${formatNumber(
                        galleryItems.length
                    )}`;

            }

        }


        function openViewer(index) {

            if (
                !imageViewer ||
                galleryItems.length === 0
            ) {
                return;
            }


            currentImageIndex =
                index;


            updateViewer();


            imageViewer.classList.add(
                "active"
            );


            imageViewer.setAttribute(
                "aria-hidden",
                "false"
            );


            body.classList.add(
                "viewer-open"
            );


            if (viewerClose) {

                window.setTimeout(
                    () => {

                        viewerClose.focus();

                    },
                    100
                );

            }

        }


        function closeViewer() {

            if (!imageViewer) {
                return;
            }


            imageViewer.classList.remove(
                "active"
            );


            imageViewer.setAttribute(
                "aria-hidden",
                "true"
            );


            body.classList.remove(
                "viewer-open"
            );

        }


        function nextImage() {

            if (
                galleryItems.length === 0
            ) {
                return;
            }


            currentImageIndex =
                (
                    currentImageIndex + 1
                ) % galleryItems.length;


            updateViewer();

        }


        function previousImage() {

            if (
                galleryItems.length === 0
            ) {
                return;
            }


            currentImageIndex =
                (
                    currentImageIndex -
                    1 +
                    galleryItems.length
                ) % galleryItems.length;


            updateViewer();

        }


        galleryItems.forEach(
            (item, index) => {

                item.addEventListener(
                    "click",
                    () => {

                        openViewer(
                            index
                        );

                    }
                );

            }
        );


        if (viewerClose) {

            viewerClose.addEventListener(
                "click",
                closeViewer
            );

        }


        if (viewerBackdrop) {

            viewerBackdrop.addEventListener(
                "click",
                closeViewer
            );

        }


        if (viewerNext) {

            viewerNext.addEventListener(
                "click",
                nextImage
            );

        }


        if (viewerPrev) {

            viewerPrev.addEventListener(
                "click",
                previousImage
            );

        }


        /* =====================================================
           12. VIEWER KEYBOARD CONTROLS
        ====================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    !imageViewer ||
                    !imageViewer.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeViewer();

                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextImage();

                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousImage();

                }

            }
        );


        /* =====================================================
           13. PROJECT CARD ENTRANCE
        ====================================================== */

        const projectCards =
            document.querySelectorAll(
                ".project-card"
            );


        if (
            "IntersectionObserver"
            in window
        ) {

            const projectObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }


                                const cards =
                                    Array.from(
                                        projectCards
                                    );


                                const index =
                                    cards.indexOf(
                                        entry.target
                                    );


                                if (
                                    !window.matchMedia(
                                        "(prefers-reduced-motion: reduce)"
                                    ).matches
                                ) {

                                    entry.target.animate(
                                        [
                                            {
                                                opacity:
                                                    0,

                                                transform:
                                                    "translateY(35px)"
                                            },

                                            {
                                                opacity:
                                                    1,

                                                transform:
                                                    "translateY(0)"
                                            }
                                        ],
                                        {
                                            duration:
                                                650,

                                            delay:
                                                Math.max(
                                                    0,
                                                    index * 100
                                                ),

                                            easing:
                                                "cubic-bezier(.2,.8,.2,1)",

                                            fill:
                                                "both"
                                        }
                                    );

                                }


                                projectObserver.unobserve(
                                    entry.target
                                );

                            }
                        );

                    },
                    {
                        threshold:
                            0.12
                    }
                );


            projectCards.forEach(
                card => {

                    projectObserver.observe(
                        card
                    );

                }
            );

        }


        /* =====================================================
           14. GALLERY MOUSE MOVEMENT
        ====================================================== */

        const galleryCards =
            document.querySelectorAll(
                ".gallery-item"
            );


        galleryCards.forEach(
            card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        if (
                            window.matchMedia(
                                "(prefers-reduced-motion: reduce)"
                            ).matches
                        ) {
                            return;
                        }


                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const y =
                            event.clientY -
                            rect.top;


                        const rotateY =
                            (
                                x /
                                rect.width -
                                0.5
                            ) * 2;


                        const rotateX =
                            (
                                0.5 -
                                y /
                                rect.height
                            ) * 2;


                        card.style.transform =
                            `perspective(1000px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );


        /* =====================================================
           15. CURSOR TRAIL
        ====================================================== */

        /* =====================================================
   15. CURSOR TRAIL
   SAME STYLE AS INDEX
====================================================== */

const supportsFinePointer =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    supportsFinePointer &&
    !prefersReducedMotion
) {

    const TRAIL_COUNT = 8;

    const trail = [];

    const mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };


    /* -------------------------------------------------
       CREATE CURSOR CIRCLES
    -------------------------------------------------- */

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


        /*
         * Same sizing as Index.
         *
         * First circle = 13px
         * Following circles become smaller.
         */

        const size =
            Math.max(
                4,
                13 - i
            );


        circle.style.width =
            `${size}px`;


        circle.style.height =
            `${size}px`;


        circle.style.opacity =
            `${Math.max(
                0.05,
                0.28 - i * 0.03
            )}`;


        document.body.appendChild(
            circle
        );


        trail.push(
            {
                element: circle,
                x: mouse.x,
                y: mouse.y
            }
        );

    }


    /* -------------------------------------------------
       TRACK MOUSE
    -------------------------------------------------- */

    window.addEventListener(
        "mousemove",
        event => {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        },
        {
            passive: true
        }
    );


    /* -------------------------------------------------
       ANIMATE TRAIL
    -------------------------------------------------- */

    function animateCursor() {

        let x =
            mouse.x;

        let y =
            mouse.y;


        trail.forEach(
            (point, index) => {

                const followSpeed =
                    index === 0
                        ? 0.30
                        : 0.24;


                point.x +=
                    (x - point.x) *
                    followSpeed;


                point.y +=
                    (y - point.y) *
                    followSpeed;


                point.element.style.left =
                    `${point.x}px`;


                point.element.style.top =
                    `${point.y}px`;


                x =
                    point.x;

                y =
                    point.y;

            }
        );


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();

}

      

        /* =====================================================
           17. PAGE LINK TRANSITION
        ====================================================== */

        const pageLinks =
            document.querySelectorAll(
                "a.page-link-transition-disabled"
            );


        pageLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            href.startsWith("#") ||
                            link.target === "_blank"
                        ) {
                            return;
                        }


                        /*
                         * Allow modified clicks.
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


                        if (!pageTransition) {

                            window.location.href =
                                href;

                            return;
                        }


                        pageTransition.classList.remove(
                            "is-entering"
                        );


                        pageTransition.classList.add(
                            "is-leaving"
                        );


                        window.setTimeout(
                            () => {

                                window.location.href =
                                    href;

                            },
                            620
                        );

                    }
                );

            }
        );


        /* =====================================================
           18. PROMOTION IMAGE PARALLAX
        ====================================================== */

        const promotionImage =
            document.getElementById(
                "promotionImage"
            );


        if (
            promotionImage &&
            !window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        ) {

            let ticking =
                false;


            function updatePromotionParallax() {

                const container =
                    promotionImage.parentElement;


                if (!container) {

                    ticking =
                        false;

                    return;
                }


                const rect =
                    container.getBoundingClientRect();


                if (
                    rect.bottom > 0 &&
                    rect.top <
                    window.innerHeight
                ) {

                    const center =
                        rect.top +
                        rect.height / 2;


                    const viewportCenter =
                        window.innerHeight / 2;


                    const offset =
                        (
                            center -
                            viewportCenter
                        ) * -0.025;


                    promotionImage.style.transform =
                        `scale(1.04)
                         translateY(${offset}px)`;

                }


                ticking =
                    false;

            }


            window.addEventListener(
                "scroll",
                () => {

                    if (!ticking) {

                        requestAnimationFrame(
                            updatePromotionParallax
                        );


                        ticking =
                            true;

                    }

                },
                {
                    passive:
                        true
                }
            );

        }


        /* =====================================================
           19. SAFETY RESET WHEN RETURNING WITH BACK BUTTON
        ====================================================== */

        window.addEventListener(
            "pageshow",
            () => {

                if (pageTransition) {

                    pageTransition.classList.remove(
                        "is-leaving"
                    );

                }


                /*
                 * Re-read the theme in case another
                 * page changed it.
                 */

                const currentSavedTheme =
                    localStorage.getItem(
                        "cpe-theme"
                    ) || "light";


                setTheme(
                    currentSavedTheme
                );

            }
        );


    }
);