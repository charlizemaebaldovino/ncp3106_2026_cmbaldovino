/* =========================================================
   UE MANILA — COMPUTER ENGINEERING
   INDEX.JS

   CLEAN VERSION
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01. ELEMENTS
    ====================================================== */

    const html = document.documentElement;
    const body = document.body;

    const intro = document.getElementById("intro");
    const introVideo = document.getElementById("introVideo");
    const introVideoSource = document.getElementById("introVideoSource");

    const site = document.getElementById("site");

    const sharedTitle = document.getElementById("sharedTitle");
    const heroTitleTarget = document.getElementById("heroTitleTarget");

    const themeToggle = document.getElementById("themeToggle");
    const clock = document.getElementById("clock");

    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    const revealElements = document.querySelectorAll(".reveal");
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll("main section[id]");
    const faqDetails = document.querySelectorAll(".faq details");


    /* =====================================================
       02. SETTINGS
    ====================================================== */

    const THEME_KEY = "cpe-theme";

    const LIGHT_VIDEO = "assets/light.mp4";
    const DARK_VIDEO = "assets/dark.mp4";

    const TITLE_APPEAR_DELAY = 5200;

    /*
       Slightly quicker movement than the previous version.
       It keeps the transition smooth without feeling slow.
    */

    const TITLE_MOVE_DELAY = 500;
    const TITLE_MOVE_DURATION = 1550;
    const INTRO_FADE_DURATION = 1050;


    /* =====================================================
       03. STATE
    ====================================================== */

    let introStarted = false;
    let introFinished = false;
    let titleLanded = false;

    let titleAnimation = null;

    let fallbackTimer = null;
    let resizeTimer = null;
    let introSequenceTimer = null;
    let titleMoveTimer = null;
    let introHideTimer = null;


    /* =====================================================
       04. REDUCED MOTION
    ====================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       05. THEME
    ====================================================== */

    function getInitialTheme() {

        const savedTheme = localStorage.getItem(THEME_KEY);

        if (
            savedTheme === "light" ||
            savedTheme === "dark"
        ) {
            return savedTheme;
        }

        /*
           Default theme:
           LIGHT MODE
        */

        return "light";
    }


    function applyTheme(theme, save = true) {

        const selectedTheme =
            theme === "dark"
                ? "dark"
                : "light";

        html.setAttribute(
            "data-theme",
            selectedTheme
        );

        if (save) {
            localStorage.setItem(
                THEME_KEY,
                selectedTheme
            );
        }

        /*
           While the intro is still running,
           switch the intro video with the theme.
        */

        if (!introFinished) {
            updateIntroVideo(selectedTheme);
        }
    }


    function updateIntroVideo(theme) {

        if (
            !introVideo ||
            !introVideoSource
        ) {
            return;
        }

        const desiredSource =
            theme === "dark"
                ? DARK_VIDEO
                : LIGHT_VIDEO;

        const currentSource =
            introVideoSource.getAttribute("src");

        if (currentSource === desiredSource) {
            return;
        }

        introVideoSource.setAttribute(
            "src",
            desiredSource
        );

        try {

            introVideo.load();

            const playPromise = introVideo.play();

            if (
                playPromise &&
                typeof playPromise.catch === "function"
            ) {
                playPromise.catch(() => {});
            }

        } catch (error) {

            /*
               Decorative video failure must never
               stop the rest of the website.
            */

        }
    }


    function toggleTheme() {

        const currentTheme =
            html.getAttribute("data-theme") === "dark"
                ? "dark"
                : "light";

        const nextTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        applyTheme(
            nextTheme,
            true
        );
    }


    applyTheme(
        getInitialTheme(),
        false
    );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            toggleTheme
        );
    }


    /* =====================================================
       06. MANILA CLOCK
    ====================================================== */

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
            `MANILA ${formatter.format(now)}`;
    }


    updateClock();

    setInterval(
        updateClock,
        1000
    );


    /* =====================================================
       07. PREPARE SHARED TITLE
    ====================================================== */

    function prepareSharedTitle() {

        if (!sharedTitle) {
            return;
        }

        /*
           During the intro, the title belongs directly
           inside <body>.

           This gives it freedom to move from the center
           of the screen into the hero.
        */

        if (sharedTitle.parentElement !== body) {
            body.appendChild(sharedTitle);
        }

        sharedTitle.classList.remove("is-visible");
        sharedTitle.classList.remove("title-landed");

        sharedTitle.style.position = "fixed";

        sharedTitle.style.left = "50%";
        sharedTitle.style.top = "50%";

        sharedTitle.style.width = "max-content";

        sharedTitle.style.transform =
            "translate(-50%, -50%)";

        sharedTitle.style.transformOrigin =
            "top left";

        sharedTitle.style.opacity = "";

        titleLanded = false;
    }


    prepareSharedTitle();


    /* =====================================================
       08. SHOW SHARED TITLE
    ====================================================== */

    function showSharedTitle() {

        if (!sharedTitle) {
            return;
        }

        sharedTitle.classList.add(
            "is-visible"
        );
    }


    /* =====================================================
       09. REVEAL HOME
    ====================================================== */

    function revealHome() {

        if (!site) {
            return;
        }

        site.classList.add(
            "home-ready"
        );
    }


    /* =====================================================
       10. CLEAR TEMPORARY TITLE STYLES
    ====================================================== */

    function clearTitleInlineStyles() {

        if (!sharedTitle) {
            return;
        }

        sharedTitle.style.position = "";
        sharedTitle.style.left = "";
        sharedTitle.style.top = "";
        sharedTitle.style.width = "";
        sharedTitle.style.height = "";

        sharedTitle.style.transform = "";
        sharedTitle.style.transformOrigin = "";

        sharedTitle.style.opacity = "";
        sharedTitle.style.visibility = "";
    }


    /* =====================================================
       11. LAND TITLE

       IMPORTANT:
       This uses the SAME title from the intro.

       No duplicate COMPUTER ENGINEERING title is created.
    ====================================================== */

    function landSharedTitle() {

        if (
            !sharedTitle ||
            !heroTitleTarget
        ) {
            return;
        }

        /*
           Move the actual title into its permanent
           hero destination.
        */

        heroTitleTarget.appendChild(
            sharedTitle
        );

        clearTitleInlineStyles();

        sharedTitle.classList.add(
            "is-visible"
        );

        sharedTitle.classList.add(
            "title-landed"
        );

        titleLanded = true;
    }


    /* =====================================================
       12. MEASURE FINAL TITLE

       THIS IS THE IMPORTANT FIX.

       The previous version estimated the final scale from
       heroTitleTarget's width.

       That caused the animation to finish at one size and
       then CSS changed the title to another size.

       This version temporarily puts the title in its REAL
       final state, measures it, and then restores the intro
       state before animating.
    ====================================================== */

    function measureFinalTitle() {

        if (
            !sharedTitle ||
            !heroTitleTarget
        ) {
            return null;
        }

        /*
           Remember where the title currently lives.
        */

        const originalParent =
            sharedTitle.parentElement;

        const originalNextSibling =
            sharedTitle.nextSibling;

        /*
           Remember its current classes.
        */

        const hadVisibleClass =
            sharedTitle.classList.contains(
                "is-visible"
            );

        const hadLandedClass =
            sharedTitle.classList.contains(
                "title-landed"
            );

        /*
           Remember current inline styles.
        */

        const originalStyle =
            sharedTitle.getAttribute(
                "style"
            );

        /*
           Put the title into the exact final DOM position.
        */

        heroTitleTarget.appendChild(
            sharedTitle
        );

        clearTitleInlineStyles();

        sharedTitle.classList.add(
            "is-visible"
        );

        sharedTitle.classList.add(
            "title-landed"
        );

        /*
           Hide it only visually while measuring.

           visibility:hidden still gives us the correct
           dimensions and coordinates.
        */

        sharedTitle.style.visibility =
            "hidden";

        const finalRect =
            sharedTitle
                .getBoundingClientRect();

        /*
           Restore title to its original DOM location.
        */

        if (originalParent) {

            if (
                originalNextSibling &&
                originalNextSibling.parentElement ===
                    originalParent
            ) {

                originalParent.insertBefore(
                    sharedTitle,
                    originalNextSibling
                );

            } else {

                originalParent.appendChild(
                    sharedTitle
                );
            }
        }

        /*
           Restore original classes.
        */

        if (!hadVisibleClass) {
            sharedTitle.classList.remove(
                "is-visible"
            );
        }

        if (!hadLandedClass) {
            sharedTitle.classList.remove(
                "title-landed"
            );
        }

        /*
           Restore the original inline styles exactly.
        */

        if (originalStyle === null) {

            sharedTitle.removeAttribute(
                "style"
            );

        } else {

            sharedTitle.setAttribute(
                "style",
                originalStyle
            );
        }

        return finalRect;
    }


    /* =====================================================
       13. MOVE TITLE TO HERO

       FLIP animation:

       START
       Centered COMPUTER ENGINEERING

                   ↓

       END
       Lower-left hero title

       The final title dimensions are measured first,
       preventing the large jump after landing.
    ====================================================== */

    function moveTitleToHero() {

        if (
            !sharedTitle ||
            !heroTitleTarget ||
            titleLanded
        ) {
            return;
        }

        if (titleAnimation) {

            titleAnimation.cancel();
            titleAnimation = null;
        }

        /*
           The hero must be visible before its final
           coordinates can be measured.
        */

        revealHome();

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                /*
                   Current title position during intro.
                */

                const startRect =
                    sharedTitle
                        .getBoundingClientRect();

                /*
                   Measure the REAL final title itself,
                   not just its destination container.
                */

                const finalRect =
                    measureFinalTitle();

                if (
                    !finalRect ||
                    startRect.width <= 0 ||
                    startRect.height <= 0 ||
                    finalRect.width <= 0 ||
                    finalRect.height <= 0
                ) {

                    landSharedTitle();
                    return;
                }

                /*
                   Freeze the title exactly where it
                   currently appears.

                   This lets us remove
                   translate(-50%, -50%) without a jump.
                */

                sharedTitle.style.position =
                    "fixed";

                sharedTitle.style.left =
                    `${startRect.left}px`;

                sharedTitle.style.top =
                    `${startRect.top}px`;

                sharedTitle.style.width =
                    `${startRect.width}px`;

                sharedTitle.style.transform =
                    "translate3d(0, 0, 0) scale(1)";

                sharedTitle.style.transformOrigin =
                    "top left";

                /*
                   Calculate the movement from the current
                   visual position to the REAL final title
                   position.
                */

                const deltaX =
                    finalRect.left -
                    startRect.left;

                const deltaY =
                    finalRect.top -
                    startRect.top;

                /*
                   Because the final title may have a
                   different CSS font size, use the actual
                   final rendered dimensions.

                   We use the smaller scale ratio so both
                   words remain inside the target area.
                */

                const scaleX =
                    finalRect.width /
                    startRect.width;

                const scaleY =
                    finalRect.height /
                    startRect.height;

                const finalScale =
                    Math.min(
                        scaleX,
                        scaleY
                    );

                /*
                   Reduced-motion users skip the animation.
                */

                if (prefersReducedMotion) {

                    landSharedTitle();
                    return;
                }

                titleAnimation =
                    sharedTitle.animate(
                        [
                            {
                                transform:
                                    "translate3d(0, 0, 0) scale(1)"
                            },

                            {
                                transform:
                                    `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${finalScale})`
                            }
                        ],
                        {
                            duration:
                                TITLE_MOVE_DURATION,

                            easing:
                                "cubic-bezier(.16, 1, .3, 1)",

                            fill:
                                "forwards"
                        }
                    );


                titleAnimation.onfinish =
                    () => {

                        titleAnimation = null;

                        /*
                           The animated title is now visually
                           sitting over its final destination.

                           Put it into the actual destination.

                           Because we measured the exact final
                           layout beforehand, there should be
                           no size jump here.
                        */

                        landSharedTitle();
                    };


                titleAnimation.oncancel =
                    () => {

                        titleAnimation = null;
                    };

            });

        });
    }


    /* =====================================================
       14. FADE INTRO
    ====================================================== */

    function fadeIntroAway() {

        if (!intro) {
            return;
        }

        intro.classList.add(
            "go-home"
        );

        clearTimeout(
            introHideTimer
        );

        introHideTimer =
            setTimeout(
                () => {

                    intro.style.display =
                        "none";

                },
                INTRO_FADE_DURATION + 250
            );
    }


    /* =====================================================
       15. INTRO SEQUENCE

       VIDEO
         ↓
       COMPUTER ENGINEERING APPEARS
         ↓
       HERO REVEALS
         ↓
       TITLE MOVES INTO FINAL POSITION
         ↓
       INTRO FADES
         ↓
       TITLE BECOMES PART OF HERO
    ====================================================== */

    function startIntroSequence() {

        if (introStarted) {
            return;
        }

        introStarted = true;

        clearTimeout(
            fallbackTimer
        );


        /* -------------------------------------------------
           REDUCED MOTION
        -------------------------------------------------- */

        if (prefersReducedMotion) {

            revealHome();

            showSharedTitle();

            landSharedTitle();

            fadeIntroAway();

            introFinished = true;

            return;
        }


        /* -------------------------------------------------
           1. SHOW COMPUTER ENGINEERING
        -------------------------------------------------- */

        showSharedTitle();


        /* -------------------------------------------------
           2. REVEAL HERO BEHIND INTRO
        -------------------------------------------------- */

        revealHome();


        /* -------------------------------------------------
           3. BEGIN TITLE MOVEMENT
        -------------------------------------------------- */

        clearTimeout(
            titleMoveTimer
        );

        titleMoveTimer =
            setTimeout(
                () => {

                    moveTitleToHero();

                    /*
                       Fade the intro shortly after movement
                       begins.

                       This allows the new HELLO hero to
                       appear underneath the moving title.
                    */

                    setTimeout(
                        fadeIntroAway,
                        140
                    );

                },
                TITLE_MOVE_DELAY
            );


        /* -------------------------------------------------
           4. MARK INTRO COMPLETE
        -------------------------------------------------- */

        clearTimeout(
            introSequenceTimer
        );

        introSequenceTimer =
            setTimeout(
                () => {

                    introFinished = true;

                },
                TITLE_MOVE_DELAY +
                TITLE_MOVE_DURATION +
                450
            );
    }


    /* =====================================================
       16. INTRO VIDEO EVENTS
    ====================================================== */

    function scheduleIntroFallback() {

        clearTimeout(
            fallbackTimer
        );

        fallbackTimer =
            setTimeout(
                startIntroSequence,
                TITLE_APPEAR_DELAY
            );
    }


    if (introVideo) {

        /*
           Preferred behavior:
           transition when the intro video ends.
        */

        introVideo.addEventListener(
            "ended",
            () => {

                clearTimeout(
                    fallbackTimer
                );

                startIntroSequence();
            }
        );


        /*
           If the video fails to load,
           the website still opens.
        */

        introVideo.addEventListener(
            "error",
            () => {

                clearTimeout(
                    fallbackTimer
                );

                fallbackTimer =
                    setTimeout(
                        startIntroSequence,
                        900
                    );
            }
        );


        /*
           Backup in case autoplay or "ended"
           doesn't fire.
        */

        scheduleIntroFallback();

    } else {

        fallbackTimer =
            setTimeout(
                startIntroSequence,
                700
            );
    }


    /* =====================================================
       17. DIRECT HASH OPENING

       Example:
       index.html#projects

       Skip the intro when opening a section directly.
    ====================================================== */

    function handleInitialHash() {

        const hash =
            window.location.hash;

        if (
            !hash ||
            hash === "#home"
        ) {
            return;
        }

        let target = null;

        try {

            target =
                document.querySelector(
                    hash
                );

        } catch (error) {

            return;
        }

        if (!target) {
            return;
        }

        clearTimeout(
            fallbackTimer
        );

        revealHome();

        showSharedTitle();

        landSharedTitle();

        fadeIntroAway();

        introStarted = true;
        introFinished = true;

        setTimeout(
            () => {

                target.scrollIntoView(
                    {
                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth",

                        block:
                            "start"
                    }
                );

            },
            150
        );
    }


    handleInitialHash();


    /* =====================================================
       18. SCROLL REVEAL
    ====================================================== */

    function setupRevealObserver() {

        if (
            !("IntersectionObserver" in window)
        ) {

            revealElements.forEach(
                (element) => {

                    element.classList.add(
                        "show"
                    );
                }
            );

            return;
        }


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    );

                },
                {
                    threshold: 0.10,

                    rootMargin:
                        "0px 0px -7% 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                observer.observe(
                    element
                );
            }
        );
    }


    setupRevealObserver();


    /* =====================================================
       19. ACTIVE NAVIGATION
    ====================================================== */

    function setActiveNavigation(sectionId) {

        navLinks.forEach(
            (link) => {

                const href =
                    link.getAttribute(
                        "href"
                    );

                link.classList.toggle(
                    "active",
                    href === `#${sectionId}`
                );
            }
        );
    }


    function setupNavigationObserver() {

        if (
            !("IntersectionObserver" in window)
        ) {
            return;
        }


        const observer =
            new IntersectionObserver(
                (entries) => {

                    const visibleSections =
                        entries
                            .filter(
                                (entry) =>
                                    entry.isIntersecting
                            )
                            .sort(
                                (a, b) =>
                                    b.intersectionRatio -
                                    a.intersectionRatio
                            );

                    if (
                        visibleSections.length === 0
                    ) {
                        return;
                    }

                    const sectionId =
                        visibleSections[0]
                            .target
                            .id;

                    if (sectionId) {

                        setActiveNavigation(
                            sectionId
                        );
                    }

                },
                {
                    threshold:
                        [
                            0.15,
                            0.3,
                            0.5
                        ],

                    rootMargin:
                        "-20% 0px -55% 0px"
                }
            );


        sections.forEach(
            (section) => {

                observer.observe(
                    section
                );
            }
        );
    }


    setupNavigationObserver();


    /* =====================================================
       20. SMOOTH INTERNAL LINKS
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

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

                    let target = null;

                    try {

                        target =
                            document.querySelector(
                                href
                            );

                    } catch (error) {

                        return;
                    }

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    closeMobileMenu();

                    const nav =
                        document.querySelector(
                            "nav"
                        );

                    const navHeight =
                        nav
                            ? nav.offsetHeight
                            : 0;

                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navHeight -
                        10;


                    window.scrollTo(
                        {
                            top:
                                targetPosition,

                            behavior:
                                prefersReducedMotion
                                    ? "auto"
                                    : "smooth"
                        }
                    );


                    /*
                       Update the URL without causing
                       another browser jump.
                    */

                    try {

                        history.replaceState(
                            null,
                            "",
                            href
                        );

                    } catch (error) {

                        /*
                           URL update isn't essential.
                        */

                    }
                }
            );
        }
    );


    /* =====================================================
       21. MOBILE MENU
    ====================================================== */

    function openMobileMenu() {

        if (
            !menuButton ||
            !mobileMenu
        ) {
            return;
        }

        menuButton.classList.add(
            "active"
        );

        mobileMenu.classList.add(
            "active"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );
    }


    function closeMobileMenu() {

        if (
            !menuButton ||
            !mobileMenu
        ) {
            return;
        }

        menuButton.classList.remove(
            "active"
        );

        mobileMenu.classList.remove(
            "active"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    function toggleMobileMenu() {

        if (
            !menuButton ||
            !mobileMenu
        ) {
            return;
        }

        const isOpen =
            mobileMenu.classList.contains(
                "active"
            );

        if (isOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();
        }
    }


    if (menuButton) {

        menuButton.addEventListener(
            "click",
            toggleMobileMenu
        );
    }


    /* =====================================================
       22. ESCAPE CLOSES MOBILE MENU
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       23. FAQ

       Keep only one FAQ item open at a time.
    ====================================================== */

    faqDetails.forEach(
        (detail) => {

            detail.addEventListener(
                "toggle",
                () => {

                    if (!detail.open) {
                        return;
                    }

                    faqDetails.forEach(
                        (otherDetail) => {

                            if (
                                otherDetail !== detail
                            ) {
                                otherDetail.open = false;
                            }
                        }
                    );
                }
            );
        }
    );


    /* =====================================================
       24. CURSOR TRAIL

       Desktop / fine pointer only.
    ====================================================== */

    const supportsFinePointer =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
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

            body.appendChild(
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


        window.addEventListener(
            "mousemove",
            (event) => {

                mouse.x = event.clientX;
                mouse.y = event.clientY;

            },
            {
                passive: true
            }
        );


        function animateCursor() {

            let x = mouse.x;
            let y = mouse.y;

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

                    x = point.x;
                    y = point.y;
                }
            );

            requestAnimationFrame(
                animateCursor
            );
        }


        animateCursor();
    }


    /* =====================================================
       25. RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    () => {

                        /*
                           Close the mobile menu when
                           returning to desktop.
                        */

                        if (
                            window.innerWidth > 900
                        ) {
                            closeMobileMenu();
                        }

                        /*
                           If the browser was resized during
                           the title animation, safely finish
                           the transition instead of leaving
                           the title floating.
                        */

                        if (
                            introStarted &&
                            !titleLanded &&
                            introFinished
                        ) {

                            if (titleAnimation) {

                                titleAnimation.cancel();
                                titleAnimation = null;
                            }

                            landSharedTitle();
                        }

                    },
                    150
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       26. BROWSER BACK / FORWARD CACHE
    ====================================================== */

    window.addEventListener(
        "pageshow",
        (event) => {

            if (!event.persisted) {
                return;
            }

            clearTimeout(
                fallbackTimer
            );

            clearTimeout(
                titleMoveTimer
            );

            clearTimeout(
                introSequenceTimer
            );

            introStarted = true;
            introFinished = true;

            revealHome();

            showSharedTitle();

            landSharedTitle();


            if (intro) {

                intro.classList.add(
                    "go-home"
                );

                intro.style.display =
                    "none";
            }


            /*
               Reveal elements already visible
               in the restored viewport.
            */

            revealElements.forEach(
                (element) => {

                    const rect =
                        element
                            .getBoundingClientRect();

                    if (
                        rect.top <
                        window.innerHeight
                    ) {

                        element.classList.add(
                            "show"
                        );
                    }
                }
            );
        }
    );


    /* =====================================================
       27. VISIBILITY RESTORATION

       If the tab is hidden during the animation,
       don't leave the title floating when the user
       comes back.
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.visibilityState !==
                "visible"
            ) {
                return;
            }

            if (
                introStarted &&
                introFinished &&
                !titleLanded
            ) {

                if (titleAnimation) {

                    titleAnimation.cancel();
                    titleAnimation = null;
                }

                landSharedTitle();
            }
        }
    );


    /* =====================================================
       28. SAFETY FALLBACK

       The website should never remain permanently
       trapped on the intro.
    ====================================================== */

    setTimeout(
        () => {

            if (introFinished) {
                return;
            }

            if (!introStarted) {
                startIntroSequence();
            }

        },
        7500
    );


    /* =====================================================
       END
    ====================================================== */

});
/* =========================================================
   GLOBAL SCROLL REVEAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
       Main elements that will animate when they
       enter the screen.
    */
    const revealSelectors = [
        ".section-label",
        ".section-title",
        ".section-intro",

        ".program-copy",
        ".program-video",

        ".deeper-card",

        ".achievements-heading",

        ".news-header",
        ".news-card",

        ".faq-heading",
        ".faq-item",

        ".cta-content",

        ".cpe-footer-brand",
        ".cpe-footer-social",
    ];


    const revealItems = document.querySelectorAll(
        revealSelectors.join(",")
    );


    revealItems.forEach((item, index) => {

        item.classList.add("scroll-reveal");

        /*
           Small stagger.
           We keep the delay short so the website
           doesn't feel slow.
        */
        const delay = (index % 4) * 70;

        item.style.transitionDelay = `${delay}ms`;
    });


    /*
       Images get a softer scale + fade animation.
    */
    const revealImages = document.querySelectorAll(
        ".program-video img, .news-card-image, .achievements-showcase img"
    );


    revealImages.forEach((image) => {
        image.classList.add("scroll-reveal-image");
    });


    /* =====================================================
       OBSERVER
    ===================================================== */

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "is-visible"
                    );

                    /*
                       Stop observing after reveal.
                       This means it animates only once.
                    */
                    revealObserver.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.12,

            rootMargin:
                "0px 0px -40px 0px"
        }
    );


    document
        .querySelectorAll(
            ".scroll-reveal, .scroll-reveal-image"
        )
        .forEach((item) => {

            revealObserver.observe(item);

        });
        
});
