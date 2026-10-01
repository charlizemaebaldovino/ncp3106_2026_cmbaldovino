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
    const pageTransition = document.getElementById("pageTransition");

    const sharedTitle = document.getElementById("sharedTitle");
    const heroTitleTarget = document.getElementById("heroTitleTarget");
    const navLogoImage = document.querySelector(".nav-logo-image");

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
    const LIGHT_NAV_LOGO = "assets/dark.png";
    const DARK_NAV_LOGO = "assets/light.png";

    const TITLE_APPEAR_DELAY = 5200;

    const BLANK_GRADIENT_DURATION = 650;
    const TYPE_SPEED = 58;

    /* Stay for exactly 1 second after typing */
    const TITLE_HOLD_DURATION = 1000;

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

        /* Start in light mode by default */
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

        updateNavLogo(selectedTheme);

        if (save) {

            localStorage.setItem(
                THEME_KEY,
                selectedTheme
            );
        }

        /*
           Change intro video according to theme
           only while intro is still active.
        */

        if (!introFinished) {

            updateIntroVideo(
                selectedTheme
            );
        }
    }


    function updateNavLogo(theme) {

        if (!navLogoImage) {
            return;
        }

        navLogoImage.src =
            theme === "dark"
                ? DARK_NAV_LOGO
                : LIGHT_NAV_LOGO;
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

        introVideo.load();

        const playPromise = introVideo.play();

        if (
            playPromise &&
            typeof playPromise.catch === "function"
        ) {
            playPromise.catch(
                () => {}
            );
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


    document
        .querySelectorAll(".deeper-card-transition-disabled")
        .forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        if (
                            prefersReducedMotion ||
                            !pageTransition
                        ) {
                            return;
                        }

                        event.preventDefault();

                        pageTransition.classList.add(
                            "is-leaving"
                        );

                        window.setTimeout(
                            () => {
                                window.location.href =
                                    link.getAttribute("href");
                            },
                            650
                        );
                    }
                );
            }
        );


    /* =====================================================
       06. MANILA CLOCK
    ====================================================== */

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
           During the intro, COMPUTER ENGINEERING
           belongs directly inside body.

           This allows the SAME title to travel
           from the center of the screen into
           the homepage.
        */

        if (
            sharedTitle.parentElement !== body
        ) {

            body.appendChild(
                sharedTitle
            );
        }


        sharedTitle.classList.remove(
            "is-visible"
        );

        sharedTitle.classList.remove(
            "title-landed"
        );


        sharedTitle.style.position =
            "fixed";

        sharedTitle.style.left =
            "50%";

        sharedTitle.style.top =
            "50%";

        sharedTitle.style.width =
            "max-content";

        sharedTitle.style.transform =
            "translate(-50%, -50%)";

        sharedTitle.style.transformOrigin =
            "top left";

        sharedTitle.style.opacity =
            "";

        titleLanded =
            false;
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
        sharedTitle.style.color = "";
    }


    /* =====================================================
       11. LAND TITLE

       Uses the SAME COMPUTER ENGINEERING title.
       There is no duplicate title.
    ====================================================== */

    function landSharedTitle() {

        if (
            !sharedTitle ||
            !heroTitleTarget
        ) {
            return;
        }


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


        titleLanded =
            true;
    }


    function landSharedTitleAtMeasuredSize(finalRect) {

        if (
            !sharedTitle ||
            !heroTitleTarget ||
            !finalRect
        ) {
            return;
        }

        heroTitleTarget.appendChild(
            sharedTitle
        );

        sharedTitle.classList.add(
            "is-visible"
        );

        sharedTitle.classList.add(
            "title-landed"
        );

        sharedTitle.style.position =
            "relative";

        sharedTitle.style.left =
            "0";

        sharedTitle.style.top =
            "0";

        sharedTitle.style.width =
            `${finalRect.width}px`;

        sharedTitle.style.height =
            `${finalRect.height}px`;

        sharedTitle.style.transform =
            "none";

        sharedTitle.style.color =
            "";

        titleLanded =
            true;
    }


    /* =====================================================
       12. MEASURE FINAL TITLE

       Temporarily place COMPUTER ENGINEERING in its
       real homepage position so we can measure the
       exact destination.

       Then restore it to the intro position before
       starting the animation.

       This prevents the title from suddenly changing
       size when it reaches the homepage.
    ====================================================== */

    function measureFinalTitle() {

        if (
            !sharedTitle ||
            !heroTitleTarget
        ) {
            return null;
        }


        const originalParent =
            sharedTitle.parentElement;

        const originalNextSibling =
            sharedTitle.nextSibling;


        const originalClassName =
            sharedTitle.className;


        const originalStyle =
            sharedTitle.getAttribute(
                "style"
            );


        /*
           Temporarily move title into its actual
           final destination.
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
           Measure its REAL final dimensions.
        */

        const finalRect =
            sharedTitle.getBoundingClientRect();


        const result = {

            left:
                finalRect.left,

            top:
                finalRect.top,

            width:
                finalRect.width,

            height:
                finalRect.height
        };


        /*
           Restore the title to where it was
           before measuring.
        */

        if (originalParent) {

            if (
                originalNextSibling &&
                originalNextSibling.parentNode ===
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


        sharedTitle.className =
            originalClassName;


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


        return result;
    }


    /* =====================================================
       13. MOVE TITLE TO HERO

       Uses FLIP-style positioning:
       FIRST = intro title position
       LAST  = actual homepage title position

       Then smoothly animates between them.
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
        GET CURRENT TYPING POSITION
    */

    const startRect =
        sharedTitle.getBoundingClientRect();


    /*
        SHOW HOMEPAGE BEHIND INTRO
    */

    revealHome();


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {


            /*
                MOVE THE SAME TITLE
                INTO THE REAL HERO
            */

            heroTitleTarget.appendChild(
                sharedTitle
            );


            /*
                REMOVE INTRO POSITIONING
            */

            sharedTitle.style.position = "";
            sharedTitle.style.left = "";
            sharedTitle.style.right = "";
            sharedTitle.style.top = "";

            sharedTitle.style.width = "";
            sharedTitle.style.height = "";

            sharedTitle.style.margin = "";
            sharedTitle.style.padding = "";

            sharedTitle.style.transform = "";
            sharedTitle.style.transformOrigin = "";

            sharedTitle.style.transition = "";
            sharedTitle.style.animation = "";

            sharedTitle.style.willChange = "";
            sharedTitle.style.color = "";


            /*
                ACTIVATE FINAL HERO STYLE
            */

            sharedTitle.classList.add(
                "is-visible"
            );

            sharedTitle.classList.add(
                "title-landed"
            );


            /*
                ==================================
                FINAL TITLE POSITION ADJUSTMENT
                ==================================

                Negative = LEFT
                Positive = RIGHT

                Change ONLY this number if
                you want to adjust it later.
            */

            const FINAL_TITLE_X = -300;


           /*
        FINAL HERO TITLE PLACEMENT

        Move LEFT + slightly DOWN.
     Percentage-based para responsive.
        */

        sharedTitle.style.position = "relative";

        sharedTitle.style.left = "-8%";
        sharedTitle.style.top = "45px";

        /*
        Slightly reduce the final title
        para hindi tumawid sa center faces.
        */

        sharedTitle.style.width = "88%";
            /*
                WAIT UNTIL BROWSER APPLIES
                THE NEW FINAL POSITION
            */

            requestAnimationFrame(() => {


                /*
                    GET THE REAL FINAL POSITION
                    AFTER MOVING IT LEFT
                */

                const finalRect =
                    sharedTitle.getBoundingClientRect();


                if (
                    startRect.width <= 0 ||
                    startRect.height <= 0 ||
                    finalRect.width <= 0 ||
                    finalRect.height <= 0
                ) {

                    titleLanded = true;
                    return;
                }


                /*
                    CALCULATE DIFFERENCE BETWEEN
                    TYPING POSITION AND
                    FINAL HERO POSITION
                */

                const deltaX =
                    startRect.left -
                    finalRect.left;

                const deltaY =
                    startRect.top -
                    finalRect.top;


                /*
                    CALCULATE SIZE DIFFERENCE
                */

                const scaleX =
                    startRect.width /
                    finalRect.width;

                const scaleY =
                    startRect.height /
                    finalRect.height;


                /*
                    FLIP TECHNIQUE

                    Element is already physically
                    in its FINAL position.

                    Transform makes it LOOK like
                    it is still in the typing position.
                */

                sharedTitle.style.transformOrigin =
                    "top left";

                sharedTitle.style.transform =
                    `translate3d(
                        ${deltaX}px,
                        ${deltaY}px,
                        0
                    )
                    scale(
                        ${scaleX},
                        ${scaleY}
                    )`;

                sharedTitle.style.willChange =
                    "transform";


                /*
                    FORCE BROWSER TO REGISTER
                    STARTING POSITION
                */

                sharedTitle.getBoundingClientRect();


                if (prefersReducedMotion) {

                    sharedTitle.style.transform =
                        "";

                    sharedTitle.style.transformOrigin =
                        "";

                    sharedTitle.style.willChange =
                        "";

                    titleLanded = true;

                    return;
                }


                /*
                    START SMOOTH MOVEMENT
                */

                requestAnimationFrame(() => {

                    titleAnimation =
                        sharedTitle.animate(
                            [
                                {
                                    transform:
                                        `translate3d(
                                            ${deltaX}px,
                                            ${deltaY}px,
                                            0
                                        )
                                        scale(
                                            ${scaleX},
                                            ${scaleY}
                                        )`
                                },

                                /*
                                    SMALL MIDPOINT

                                    Makes the movement feel
                                    less robotic and more
                                    naturally decelerated.
                                */

                                {
                                    offset: 0.72,

                                    transform:
                                        `translate3d(
                                            ${deltaX * 0.12}px,
                                            ${deltaY * 0.12}px,
                                            0
                                        )
                                        scale(
                                            ${1 + (scaleX - 1) * 0.08},
                                            ${1 + (scaleY - 1) * 0.08}
                                        )`
                                },

                                /*
                                    EXACT FINAL POSITION
                                */

                                {
                                    transform:
                                        "translate3d(0, 0, 0) scale(1, 1)"
                                }
                            ],

                            {
                                duration:
                                    TITLE_MOVE_DURATION,

                                easing:
                                    "cubic-bezier(0.22, 1, 0.36, 1)",

                                fill:
                                    "forwards"
                            }
                        );


                    /*
                        WHEN FINISHED:
                        REMOVE ONLY THE TEMPORARY
                        ANIMATION TRANSFORM.

                        LEFT POSITION STAYS.
                    */

                    titleAnimation.onfinish =
                        () => {

                            titleAnimation = null;

                            sharedTitle.style.transform =
                                "";

                            sharedTitle.style.transformOrigin =
                                "";

                            sharedTitle.style.willChange =
                                "";

                            titleLanded =
                                true;
                        };


                    titleAnimation.oncancel =
                        () => {

                            titleAnimation = null;
                        };

                });

            });

        });

    });
}  function moveTitleToHero() {

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
        1. Kunin muna ang EXACT position
        kung saan natapos ang typing.
    */

    const startRect =
        sharedTitle.getBoundingClientRect();


    /*
        2. Ihanda ang homepage sa likod.

        Hindi natin babaguhin ang visual
        position ng title dito.
    */

    revealHome();


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {


            /*
                3. Ilagay NA AGAD ang SAME title
                sa tunay nitong final container.

                Important:
                Ito na talaga ang final DOM position niya.
            */

            heroTitleTarget.appendChild(
                sharedTitle
            );


            /*
                Remove intro/fixed positioning.
            */

            sharedTitle.style.position = "";
            sharedTitle.style.left = "";
            sharedTitle.style.top = "";

            sharedTitle.style.width = "";
            sharedTitle.style.height = "";

            sharedTitle.style.margin = "";
            sharedTitle.style.padding = "";

            sharedTitle.style.transform = "";
            sharedTitle.style.transformOrigin = "";

            sharedTitle.style.transition = "";
            sharedTitle.style.animation = "";

            sharedTitle.style.willChange = "";
            sharedTitle.style.color = "";


            /*
                Activate the REAL final hero CSS.
            */

            sharedTitle.classList.add(
                "is-visible"
            );

            sharedTitle.classList.add(
                "title-landed"
            );


            /*
                4. Ngayon kunin natin ang ACTUAL
                final position niya.

                Hindi estimate.
                Hindi manually calculated position.

                Ito mismo ang final rendered position.
            */

            const finalRect =
                sharedTitle.getBoundingClientRect();


            if (
                startRect.width <= 0 ||
                startRect.height <= 0 ||
                finalRect.width <= 0 ||
                finalRect.height <= 0
            ) {

                titleLanded = true;
                return;
            }


            /*
                5. Calculate kung gaano kalayo
                ang intro position mula sa final position.
            */

            const deltaX =
                startRect.left -
                finalRect.left;

            const deltaY =
                startRect.top -
                finalRect.top;


            /*
                Calculate original typing size
                relative to final hero size.
            */

            const scaleX =
                startRect.width /
                finalRect.width;

            const scaleY =
                startRect.height /
                finalRect.height;


            /*
                6. FLIP

                Physically nasa FINAL position na siya.

                Pero visually ibabalik muna natin
                sa EXACT typing position.
            */

            sharedTitle.style.transformOrigin =
                "top left";

            sharedTitle.style.transform =
                `translate3d(
                    ${deltaX}px,
                    ${deltaY}px,
                    0
                )
                scale(
                    ${scaleX},
                    ${scaleY}
                )`;

            sharedTitle.style.willChange =
                "transform";


            /*
                Force browser to paint this state.

                So visually:
                typed title stays EXACTLY where
                typing finished.
            */

            sharedTitle.getBoundingClientRect();


            if (prefersReducedMotion) {

                sharedTitle.style.transform = "";
                sharedTitle.style.willChange = "";

                titleLanded = true;

                return;
            }


            /*
                7. Next frame:
                animate FROM intro position
                TO its REAL CSS position.
            */

            requestAnimationFrame(() => {

                titleAnimation =
                    sharedTitle.animate(
                        [
                            {
                                transform:
                                    `translate3d(
                                        ${deltaX}px,
                                        ${deltaY}px,
                                        0
                                    )
                                    scale(
                                        ${scaleX},
                                        ${scaleY}
                                    )`
                            },

                            {
                                transform:
                                    "translate3d(0, 0, 0) scale(1, 1)"
                            }
                        ],
                        {
                            duration:
                                TITLE_MOVE_DURATION,

                            easing:
                                "cubic-bezier(0.16, 1, 0.3, 1)",

                            fill:
                                "forwards"
                        }
                    );


                titleAnimation.onfinish =
                    () => {

                        titleAnimation = null;


                        /*
                            CRITICAL:

                            Animation already ended at
                            the REAL final position.

                            Kaya walang reparent.
                            Walang recalculation.
                            Walang teleport.
                            Walang snap.
                        */

                        sharedTitle.style.transform =
                            "";

                        sharedTitle.style.transformOrigin =
                            "";

                        sharedTitle.style.willChange =
                            "";


                        titleLanded =
                            true;
                    };


                titleAnimation.oncancel =
                    () => {

                        titleAnimation = null;
                    };

            });

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

                INTRO_FADE_DURATION +
                250
            );
    }


    /* =====================================================
       15. INTRO SEQUENCE

       FINAL FLOW:

       VIDEO
         ↓
       BLANK GRADIENT
         ↓
       TYPE "COMPUTER ENGINEERING"
         ↓
       HOLD FOR 1 SECOND
         ↓
       SAME TITLE MOVES TO HOME PAGE
         ↓
       HOME PAGE REVEALS
    ====================================================== */


    function wait(duration) {

        return new Promise(
            (resolve) => {

                setTimeout(
                    resolve,
                    duration
                );
            }
        );
    }


    /* =====================================================
       TYPING ANIMATION
    ====================================================== */

    function typeSharedTitle() {

        return new Promise(
            (resolve) => {


                if (!sharedTitle) {

                    resolve();
                    return;
                }


                const computer =
                    sharedTitle.querySelector(
                        ".computer"
                    );

                const engineering =
                    sharedTitle.querySelector(
                        ".engineering"
                    );


                /*
                   Fallback if the existing spans
                   cannot be found.
                */

                if (
                    !computer ||
                    !engineering
                ) {

                    showSharedTitle();

                    resolve();
                    return;
                }


                const computerText =
                    "COMPUTER";

                const engineeringText =
                    "ENGINEERING";


                /*
                   Empty both words first.
                */

                computer.textContent =
                    "";

                engineering.textContent =
                    "";


                /*
                   Reveal the title container while
                   the words themselves are empty.
                */

                showSharedTitle();


                let line = 0;
                let index = 0;


                function typeNext() {

                    const text =
                        line === 0
                            ? computerText
                            : engineeringText;


                    const target =
                        line === 0
                            ? computer
                            : engineering;


                    if (
                        index <
                        text.length
                    ) {

                        target.textContent +=
                            text[index];


                        index += 1;


                        setTimeout(
                            typeNext,
                            TYPE_SPEED
                        );


                        return;
                    }


                    /*
                       COMPUTER finished.

                       Small pause before ENGINEERING
                       starts typing.
                    */

                    if (line === 0) {

                        line = 1;
                        index = 0;


                        setTimeout(
                            typeNext,
                            120
                        );


                        return;
                    }


                    /*
                       Both words finished.
                    */

                    resolve();
                }


                typeNext();
            }
        );
    }


    /* =====================================================
       MAIN INTRO SEQUENCE
    ====================================================== */

    async function startIntroSequence() {

        if (introStarted) {
            return;
        }


        introStarted =
            true;


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


            introFinished =
                true;


            return;
        }


        /* -------------------------------------------------
           STEP 1
           VIDEO → BLANK GRADIENT

           The intro remains on top.

           Only the video disappears, therefore the
           existing intro/page gradient becomes visible.
        -------------------------------------------------- */

        if (intro) {

            intro.classList.add(
                "blank-stage"
            );

        }


        if (
            introVideo &&
            typeof introVideo.pause === "function"
        ) {

            /*
               Pause the completed video.

               CSS .blank-stage handles the visual
               disappearance of the video.
            */

            introVideo.pause();
        }


        /*
           Let the user actually SEE the clean
           blank gradient before typing begins.
        */

        await wait(
            BLANK_GRADIENT_DURATION
        );


        /* -------------------------------------------------
           STEP 2
           TYPE COMPUTER ENGINEERING
        -------------------------------------------------- */

        await typeSharedTitle();


        /* -------------------------------------------------
           STEP 3
           HOLD FOR EXACTLY 1 SECOND

           Nothing moves yet.
        -------------------------------------------------- */

        await wait(
            TITLE_HOLD_DURATION
        );


        /* -------------------------------------------------
           STEP 4
           PREPARE HOMEPAGE BEHIND THE GRADIENT

           The intro is still covering the screen,
           so the user still sees the gradient.

           We reveal the site underneath only so
           JavaScript can calculate the REAL final
           title destination.
        -------------------------------------------------- */

        revealHome();


        await new Promise(
            (resolve) => {

                requestAnimationFrame(
                    () => {

                        requestAnimationFrame(
                            resolve
                        );
                    }
                );
            }
        );


        /* -------------------------------------------------
           STEP 5
           MOVE THE SAME COMPUTER ENGINEERING TITLE
           FROM CENTER → HOME HERO
        -------------------------------------------------- */

        moveTitleToHero();


        /* -------------------------------------------------
           STEP 6
           LET THE TITLE START MOVING ON THE CLEAN
           GRADIENT FIRST.

           This recreates the smoother feeling of
           your older intro instead of immediately
           showing the homepage.
        -------------------------------------------------- */

        await wait(
            220
        );


        /* -------------------------------------------------
           STEP 7
           GRADIENT FADES → HOME PAGE APPEARS
        -------------------------------------------------- */

        fadeIntroAway();


        /* -------------------------------------------------
           STEP 8
           FINISH
        -------------------------------------------------- */

        await wait(
            TITLE_MOVE_DURATION +
            INTRO_FADE_DURATION
        );


        introFinished =
            true;
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
           Main behavior:
           wait for the video to finish naturally.
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
           continue to the gradient intro.
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
           Safety fallback in case autoplay or
           the ended event fails.
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


        const sectionVisibility =
            new Map();


        sections.forEach(
            (section) => {
                sectionVisibility.set(
                    section,
                    0
                );
            }
        );


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {
                            sectionVisibility.set(
                                entry.target,
                                entry.isIntersecting
                                    ? entry.intersectionRatio
                                    : 0
                            );
                        }
                    );


                    const visibleSections =
                        Array.from(
                            sectionVisibility.entries()
                        )
                            .filter(
                                ([, ratio]) =>
                                    ratio > 0
                            )
                            .sort(
                                (a, b) =>
                                    b[1] - a[1]
                            );


                    if (
                        visibleSections.length === 0
                    ) {
                        return;
                    }


                    const sectionId =
                        visibleSections[0][0].id;


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
                        "-15% 0px -55% 0px"
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


    function updateActiveNavigationFromScroll() {

        const nav =
            document.querySelector("nav");

        const activationLine =
            (nav ? nav.offsetHeight : 0) +
            window.innerHeight * 0.28;

        let activeSection = null;

        sections.forEach(
            (section) => {
                const top =
                    section.getBoundingClientRect().top;

                if (
                    top <= activationLine &&
                    (
                        !activeSection ||
                        top >
                            activeSection.getBoundingClientRect().top
                    )
                ) {
                    activeSection = section;
                }
            }
        );

        if (activeSection) {
            setActiveNavigation(
                activeSection.id
            );
        }
    }


    let activeNavigationFrame = null;

    window.addEventListener(
        "scroll",
        () => {
            if (activeNavigationFrame) {
                return;
            }

            activeNavigationFrame =
                requestAnimationFrame(
                    () => {
                        updateActiveNavigationFromScroll();
                        activeNavigationFrame = null;
                    }
                );
        },
        { passive: true }
    );

    updateActiveNavigationFromScroll();


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

                    if (
                        href.startsWith("#")
                    ) {
                        setActiveNavigation(
                            href.slice(1)
                        );
                    }


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

                                otherDetail.open =
                                    false;
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

            x:
                window.innerWidth / 2,

            y:
                window.innerHeight / 2
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
                    element:
                        circle,

                    x:
                        mouse.x,

                    y:
                        mouse.y
                }
            );
        }


        window.addEventListener(
            "mousemove",
            (event) => {

                mouse.x =
                    event.clientX;

                mouse.y =
                    event.clientY;
            },
            {
                passive:
                    true
            }
        );


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

                                titleAnimation =
                                    null;
                            }


                            landSharedTitle();
                        }

                    },
                    150
                );
        },
        {
            passive:
                true
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


            introStarted =
                true;

            introFinished =
                true;


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
                introFinished &&
                !titleLanded
            ) {

                if (titleAnimation) {

                    titleAnimation.cancel();

                    titleAnimation =
                        null;
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
       END MAIN SCRIPT
    ====================================================== */

});


/* =========================================================
   GLOBAL SCROLL REVEAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

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
            ".cpe-footer-social"
        ];


        const revealItems =
            document.querySelectorAll(
                revealSelectors.join(",")
            );


        revealItems.forEach(
            (item, index) => {

                item.classList.add(
                    "scroll-reveal"
                );


                /*
                   Small stagger.

                   Keep the delay short so the
                   website doesn't feel slow.
                */

                const delay =
                    (index % 4) * 70;


                item.style.transitionDelay =
                    `${delay}ms`;
            }
        );


        /*
           Images get a softer
           scale + fade animation.
        */

        const revealImages =
            document.querySelectorAll(
                ".program-video img, " +
                ".news-card-image, " +
                ".achievements-showcase img"
            );


        revealImages.forEach(
            (image) => {

                image.classList.add(
                    "scroll-reveal-image"
                );
            }
        );


        /* =================================================
           OBSERVER
        ================================================= */

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                /*
                                   Animate only once.
                                */

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
                        "0px 0px -40px 0px"
                }
            );


        document
            .querySelectorAll(
                ".scroll-reveal, " +
                ".scroll-reveal-image"
            )
            .forEach(
                (item) => {

                    revealObserver.observe(
                        item
                    );
                }
            );

    }
);


/* =========================================================
   CPE — VISIBLE INTERACTIVE ANIMATIONS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        if (reduceMotion) {
            return;
        }


        /* =================================================
           01. ELEMENTS
        ================================================= */

        const cards =
            document.querySelectorAll(
                ".deeper-card, " +
                ".news-card, " +
                ".faq-item"
            );


        const headings =
            document.querySelectorAll(
                ".section-label, " +
                ".section-title, " +
                ".achievements-heading, " +
                ".news-header, " +
                ".faq-heading"
            );


        const contentBlocks =
            document.querySelectorAll(
                ".section-intro, " +
                ".program-copy, " +
                ".program-video, " +
                ".cta-content"
            );


        const images =
            document.querySelectorAll(
                ".news-card-image, " +
                ".program-video img, " +
                ".achievements-showcase img"
            );


        /* =================================================
           02. CARD ENTRANCE ANIMATION
        ================================================= */

        cards.forEach(
            (card, index) => {

                let startX = 0;
                let startY = 70;
                let rotate = 0;


                switch (index % 4) {

                    case 0:

                        startX = -70;
                        startY = 40;
                        rotate = -3;

                        break;


                    case 1:

                        startX = 0;
                        startY = 80;
                        rotate = 2;

                        break;


                    case 2:

                        startX = 70;
                        startY = 40;
                        rotate = 3;

                        break;


                    case 3:

                        startX = 0;
                        startY = 90;
                        rotate = -2;

                        break;
                }


                card.style.opacity =
                    "0";


                card.style.transform = `
                    translate3d(
                        ${startX}px,
                        ${startY}px,
                        0
                    )
                    rotate(${rotate}deg)
                    scale(.94)
                `;


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


                                    setTimeout(
                                        () => {

                                            card.animate(
                                                [
                                                    {
                                                        opacity:
                                                            0,

                                                        transform: `
                                                            translate3d(
                                                                ${startX}px,
                                                                ${startY}px,
                                                                0
                                                            )
                                                            rotate(${rotate}deg)
                                                            scale(.94)
                                                        `
                                                    },

                                                    {
                                                        opacity:
                                                            1,

                                                        transform: `
                                                            translate3d(
                                                                0,
                                                                -8px,
                                                                0
                                                            )
                                                            rotate(0deg)
                                                            scale(1.015)
                                                        `,

                                                        offset:
                                                            .78
                                                    },

                                                    {
                                                        opacity:
                                                            1,

                                                        transform: `
                                                            translate3d(
                                                                0,
                                                                0,
                                                                0
                                                            )
                                                            rotate(0deg)
                                                            scale(1)
                                                        `
                                                    }
                                                ],
                                                {
                                                    duration:
                                                        900,

                                                    easing:
                                                        "cubic-bezier(.16, 1, .3, 1)",

                                                    fill:
                                                        "forwards"
                                                }
                                            );


                                            card.style.opacity =
                                                "1";


                                            card.style.transform =
                                                "translate3d(0,0,0) scale(1)";

                                        },
                                        (index % 6) * 90
                                    );


                                    observer.unobserve(
                                        card
                                    );
                                }
                            );

                        },
                        {
                            threshold:
                                .15
                        }
                    );


                observer.observe(
                    card
                );
            }
        );


        /* =================================================
           03. HEADING REVEAL
        ================================================= */

        const headingObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const heading =
                                entry.target;


                            heading.animate(
                                [
                                    {
                                        opacity:
                                            0,

                                        transform:
                                            "translate3d(0, 55px, 0) scale(.94)"
                                    },

                                    {
                                        opacity:
                                            1,

                                        transform:
                                            "translate3d(0, -4px, 0) scale(1.01)",

                                        offset:
                                            .8
                                    },

                                    {
                                        opacity:
                                            1,

                                        transform:
                                            "translate3d(0, 0, 0) scale(1)"
                                    }
                                ],
                                {
                                    duration:
                                        850,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "both"
                                }
                            );


                            headingObserver.unobserve(
                                heading
                            );
                        }
                    );

                },
                {
                    threshold:
                        .25
                }
            );


        headings.forEach(
            (heading) => {

                headingObserver.observe(
                    heading
                );
            }
        );


        /* =================================================
           04. CONTENT REVEAL
        ================================================= */

        const contentObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target.animate(
                                [
                                    {
                                        opacity:
                                            0,

                                        transform:
                                            "translate3d(0, 70px, 0)"
                                    },

                                    {
                                        opacity:
                                            1,

                                        transform:
                                            "translate3d(0, 0, 0)"
                                    }
                                ],
                                {
                                    duration:
                                        1000,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "both"
                                }
                            );


                            contentObserver.unobserve(
                                entry.target
                            );
                        }
                    );

                },
                {
                    threshold:
                        .12
                }
            );


        contentBlocks.forEach(
            (block) => {

                contentObserver.observe(
                    block
                );
            }
        );


        /* =================================================
           05. STRONGER CARD MOUSE TILT
        ================================================= */

        const desktopPointer =
            window.matchMedia(
                "(hover: hover) and (pointer: fine)"
            ).matches;


        if (desktopPointer) {

            cards.forEach(
                (card) => {

                    let frame =
                        null;


                    card.addEventListener(
                        "mousemove",
                        (event) => {

                            if (frame) {

                                cancelAnimationFrame(
                                    frame
                                );
                            }


                            frame =
                                requestAnimationFrame(
                                    () => {

                                        const rect =
                                            card.getBoundingClientRect();


                                        const x =
                                            event.clientX -
                                            rect.left;


                                        const y =
                                            event.clientY -
                                            rect.top;


                                        const centerX =
                                            rect.width / 2;


                                        const centerY =
                                            rect.height / 2;


                                        const rotateY =
                                            (
                                                (
                                                    x -
                                                    centerX
                                                ) /
                                                centerX
                                            ) * 5;


                                        const rotateX =
                                            -(
                                                (
                                                    y -
                                                    centerY
                                                ) /
                                                centerY
                                            ) * 5;


                                        card.style.transition =
                                            "transform .12s ease-out";


                                        card.style.transform = `
                                            perspective(1100px)
                                            translate3d(
                                                0,
                                                -10px,
                                                0
                                            )
                                            scale(1.025)
                                            rotateX(${rotateX}deg)
                                            rotateY(${rotateY}deg)
                                        `;
                                    }
                                );
                        }
                    );


                    card.addEventListener(
                        "mouseleave",
                        () => {

                            card.style.transition =
                                "transform .65s cubic-bezier(.16, 1, .3, 1)";


                            card.style.transform = `
                                perspective(1100px)
                                translate3d(
                                    0,
                                    0,
                                    0
                                )
                                scale(1)
                                rotateX(0deg)
                                rotateY(0deg)
                            `;
                        }
                    );
                }
            );
        }


        /* =================================================
           06. IMAGE PARALLAX
        ================================================= */

        let parallaxFrame =
            null;


        function updateImageParallax() {

            images.forEach(
                (image) => {

                    const rect =
                        image.getBoundingClientRect();


                    if (
                        rect.bottom < 0 ||
                        rect.top >
                            window.innerHeight
                    ) {
                        return;
                    }


                    const viewportCenter =
                        window.innerHeight / 2;


                    const imageCenter =
                        rect.top +
                        rect.height / 2;


                    const distance =
                        imageCenter -
                        viewportCenter;


                    const movement =
                        Math.max(
                            -16,
                            Math.min(
                                16,
                                distance * -.025
                            )
                        );


                    image.style.transform =
                        `translate3d(0, ${movement}px, 0) scale(1.035)`;
                }
            );


            parallaxFrame =
                null;
        }


        window.addEventListener(
            "scroll",
            () => {

                if (parallaxFrame) {
                    return;
                }


                parallaxFrame =
                    requestAnimationFrame(
                        updateImageParallax
                    );
            },
            {
                passive:
                    true
            }
        );


        updateImageParallax();


        /* =================================================
           07. NEWS CARD IMAGE MOVEMENT
        ================================================= */

        document
            .querySelectorAll(
                ".news-card"
            )
            .forEach(
                (card) => {

                    const image =
                        card.querySelector(
                            ".news-card-image"
                        );


                    if (!image) {
                        return;
                    }


                    card.addEventListener(
                        "mouseenter",
                        () => {

                            image.animate(
                                [
                                    {
                                        transform:
                                            "scale(1.035)"
                                    },

                                    {
                                        transform:
                                            "scale(1.075)"
                                    }
                                ],
                                {
                                    duration:
                                        650,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }
                    );


                    card.addEventListener(
                        "mouseleave",
                        () => {

                            image.animate(
                                [
                                    {
                                        transform:
                                            "scale(1.075)"
                                    },

                                    {
                                        transform:
                                            "scale(1.035)"
                                    }
                                ],
                                {
                                    duration:
                                        650,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }
                    );
                }
            );


        /* =================================================
           08. NAVIGATION CLICK FEEDBACK
        ================================================= */

        document
            .querySelectorAll(
                ".nav-links a"
            )
            .forEach(
                (link) => {

                    link.addEventListener(
                        "click",
                        () => {

                            link.animate(
                                [
                                    {
                                        transform:
                                            "translateY(0) scale(1)"
                                    },

                                    {
                                        transform:
                                            "translateY(-5px) scale(1.08)"
                                    },

                                    {
                                        transform:
                                            "translateY(0) scale(1)"
                                    }
                                ],
                                {
                                    duration:
                                        420,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)"
                                }
                            );
                        }
                    );
                }
            );

    }
);


/* =========================================================
   INTERACTIVE CARD HOVER
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const canHover =
            window.matchMedia(
                "(hover: hover) and (pointer: fine)"
            ).matches;


        if (!canHover) {
            return;
        }


        /* =================================================
           01. NEWS CARDS
        ================================================= */

        const newsCards =
            document.querySelectorAll(
                ".news-card"
            );


        newsCards.forEach(
            (card) => {

                const image =
                    card.querySelector(
                        "img"
                    );


                const title =
                    card.querySelector(
                        "h2, h3, .news-title, .card-title"
                    );


                const text =
                    card.querySelector(
                        "p, .news-description, .card-description"
                    );


                const arrow =
                    card.querySelector(
                        ".arrow, .card-arrow, .news-arrow"
                    );


                /* -----------------------------------------
                   MOUSE ENTER
                ----------------------------------------- */

                card.addEventListener(
                    "mouseenter",
                    () => {

                        /*
                           DIM OTHER CARDS
                        */

                        newsCards.forEach(
                            (otherCard) => {

                                if (
                                    otherCard !== card
                                ) {

                                    otherCard.animate(
                                        [
                                            {
                                                opacity:
                                                    1,

                                                transform:
                                                    "scale(1)"
                                            },

                                            {
                                                opacity:
                                                    0.55,

                                                transform:
                                                    "scale(.975)"
                                            }
                                        ],
                                        {
                                            duration:
                                                400,

                                            easing:
                                                "ease",

                                            fill:
                                                "forwards"
                                        }
                                    );
                                }
                            }
                        );


                        /*
                           ACTIVE CARD
                        */

                        card.animate(
                            [
                                {
                                    transform:
                                        "translateY(0) scale(1)"
                                },

                                {
                                    transform:
                                        "translateY(-10px) scale(1.025)"
                                }
                            ],
                            {
                                duration:
                                    550,

                                easing:
                                    "cubic-bezier(.16, 1, .3, 1)",

                                fill:
                                    "forwards"
                            }
                        );


                        /*
                           IMAGE
                        */

                        if (image) {

                            image.animate(
                                [
                                    {
                                        transform:
                                            "scale(1) translate3d(0,0,0)"
                                    },

                                    {
                                        transform:
                                            "scale(1.08) translate3d(0,-8px,0)"
                                    }
                                ],
                                {
                                    duration:
                                        750,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }


                        /*
                           TITLE
                        */

                        if (title) {

                            title.animate(
                                [
                                    {
                                        transform:
                                            "translate3d(0,0,0)"
                                    },

                                    {
                                        transform:
                                            "translate3d(8px,-3px,0)"
                                    }
                                ],
                                {
                                    duration:
                                        450,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }


                        /*
                           DESCRIPTION
                        */

                        if (text) {

                            text.animate(
                                [
                                    {
                                        transform:
                                            "translateX(0)",

                                        opacity:
                                            0.75
                                    },

                                    {
                                        transform:
                                            "translateX(8px)",

                                        opacity:
                                            1
                                    }
                                ],
                                {
                                    duration:
                                        500,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }


                        /*
                           ARROW
                        */

                        if (arrow) {

                            arrow.animate(
                                [
                                    {
                                        transform:
                                            "translate3d(0,0,0) rotate(0deg)"
                                    },

                                    {
                                        transform:
                                            "translate3d(5px,-5px,0) rotate(-8deg)"
                                    }
                                ],
                                {
                                    duration:
                                        450,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }

                    }
                );


                /* -----------------------------------------
                   MOUSE LEAVE
                ----------------------------------------- */

                card.addEventListener(
                    "mouseleave",
                    () => {

                        /*
                           RESTORE ALL CARDS
                        */

                        newsCards.forEach(
                            (otherCard) => {

                                otherCard.animate(
                                    [
                                        {
                                            opacity:
                                                parseFloat(
                                                    getComputedStyle(
                                                        otherCard
                                                    ).opacity
                                                ),

                                            transform:
                                                getComputedStyle(
                                                    otherCard
                                                ).transform
                                        },

                                        {
                                            opacity:
                                                1,

                                            transform:
                                                "scale(1)"
                                        }
                                    ],
                                    {
                                        duration:
                                            450,

                                        easing:
                                            "cubic-bezier(.16, 1, .3, 1)",

                                        fill:
                                            "forwards"
                                    }
                                );
                            }
                        );


                        if (image) {

                            image.animate(
                                [
                                    {
                                        transform:
                                            "scale(1.08) translate3d(0,-8px,0)"
                                    },

                                    {
                                        transform:
                                            "scale(1) translate3d(0,0,0)"
                                    }
                                ],
                                {
                                    duration:
                                        650,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }


                        if (title) {

                            title.animate(
                                [
                                    {
                                        transform:
                                            "translate3d(8px,-3px,0)"
                                    },

                                    {
                                        transform:
                                            "translate3d(0,0,0)"
                                    }
                                ],
                                {
                                    duration:
                                        500,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }


                        if (text) {

                            text.animate(
                                [
                                    {
                                        transform:
                                            "translateX(8px)"
                                    },

                                    {
                                        transform:
                                            "translateX(0)"
                                    }
                                ],
                                {
                                    duration:
                                        500,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }


                        if (arrow) {

                            arrow.animate(
                                [
                                    {
                                        transform:
                                            "translate3d(5px,-5px,0) rotate(-8deg)"
                                    },

                                    {
                                        transform:
                                            "translate3d(0,0,0) rotate(0deg)"
                                    }
                                ],
                                {
                                    duration:
                                        500,

                                    easing:
                                        "cubic-bezier(.16, 1, .3, 1)",

                                    fill:
                                        "forwards"
                                }
                            );
                        }

                    }
                );

            }
        );

    }
);

                if (false) {

                card.addEventListener(
                    "mouseleave",
                    () => {

                        /*
                         * RESTORE ALL CARDS
                         */

                newsCards.forEach(
                    (otherCard) => {

                        otherCard.animate(
                            [
                                {
                                    opacity:
                                        parseFloat(
                                            getComputedStyle(
                                                otherCard
                                            ).opacity
                                        ),

                                    transform:
                                        getComputedStyle(
                                            otherCard
                                        ).transform
                                },

                                {
                                    opacity:
                                        1,

                                    transform:
                                        "scale(1)"
                                }
                            ],
                            {
                                duration:
                                    450,

                                easing:
                                    "cubic-bezier(.16, 1, .3, 1)",

                                fill:
                                    "forwards"
                            }
                        );

                    }
                );


                /*
                 * IMAGE BACK
                 */

                if (image) {

                    image.animate(
                        [
                            {
                                transform:
                                    getComputedStyle(
                                        image
                                    ).transform
                            },

                            {
                                transform:
                                    "scale(1) translate3d(0,0,0)"
                            }
                        ],
                        {
                            duration:
                                650,

                            easing:
                                "cubic-bezier(.16, 1, .3, 1)",

                            fill:
                                "forwards"
                        }
                    );

                }


                /*
                 * TITLE BACK
                 */

                if (title) {

                    title.animate(
                        [
                            {
                                transform:
                                    getComputedStyle(
                                        title
                                    ).transform
                            },

                            {
                                transform:
                                    "translate3d(0,0,0)"
                            }
                        ],
                        {
                            duration:
                                450,

                            easing:
                                "cubic-bezier(.16, 1, .3, 1)",

                            fill:
                                "forwards"
                        }
                    );

                }


                /*
                 * DESCRIPTION BACK
                 */

                if (text) {

                    text.animate(
                        [
                            {
                                transform:
                                    getComputedStyle(
                                        text
                                    ).transform
                            },

                            {
                                transform:
                                    "translateX(0)"
                            }
                        ],
                        {
                            duration:
                                450,

                            easing:
                                "cubic-bezier(.16, 1, .3, 1)",

                            fill:
                                "forwards"
                        }
                    );

                }


                /*
                 * ARROW BACK
                 */

                if (arrow) {

                    arrow.animate(
                        [
                            {
                                transform:
                                    getComputedStyle(
                                        arrow
                                    ).transform
                            },

                            {
                                transform:
                                    "translate(0,0) rotate(0deg)"
                            }
                        ],
                        {
                            duration:
                                450,

                            easing:
                                "cubic-bezier(.16, 1, .3, 1)",

                            fill:
                                "forwards"
                        }
                    );

                }

            }
        );

    }


    /* =====================================================
       02. IMAGE FOLLOWS CURSOR INSIDE NEWS CARD

       Hindi buong card ang umiikot.
       Yung IMAGE mismo ang slightly gumagalaw
       depending on mouse position.
    ====================================================== */

    newsCards.forEach(
        (card) => {

            const image =
                card.querySelector(
                    "img"
                );


            if (!image) {
                return;
            }


            let animationFrame =
                null;


            card.addEventListener(
                "mousemove",
                (event) => {

                    if (animationFrame) {

                        cancelAnimationFrame(
                            animationFrame
                        );
                    }


                    animationFrame =
                        requestAnimationFrame(
                            () => {

                                const rect =
                                    card.getBoundingClientRect();


                                const mouseX =
                                    event.clientX -
                                    rect.left;


                                const mouseY =
                                    event.clientY -
                                    rect.top;


                                const percentX =
                                    mouseX /
                                    rect.width -
                                    0.5;


                                const percentY =
                                    mouseY /
                                    rect.height -
                                    0.5;


                                /*
                                 * Maximum movement:
                                 * around 10px only.
                                 */

                                const moveX =
                                    percentX * 12;


                                const moveY =
                                    percentY * 12;


                                image.style.transform = `
                                    scale(1.08)
                                    translate3d(
                                        ${moveX}px,
                                        ${moveY}px,
                                        0
                                    )
                                `;

                            }
                        );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    image.style.transition =
                        "transform .7s cubic-bezier(.16,1,.3,1)";


                    image.style.transform =
                        "scale(1) translate3d(0,0,0)";


                    setTimeout(
                        () => {

                            image.style.transition =
                                "";

                        },
                        700
                    );

                }
            );

        }
    );


    /* =====================================================
       03. DEEPER / WHAT WE BUILD CARDS

       Different effect para hindi
       pare-pareho lahat.
    ====================================================== */

    const buildCards =
        document.querySelectorAll(
            ".deeper-card"
        );


    buildCards.forEach(
        (card) => {

            const image =
                card.querySelector(
                    "img"
                );


            const title =
                card.querySelector(
                    "h2, h3, .card-title"
                );


            /* ---------------------------------------------
               MOUSE ENTER
            --------------------------------------------- */

            card.addEventListener(
                "mouseenter",
                () => {

                    if (image) {

                        image.animate(
                            [
                                {
                                    transform:
                                        "scale(1)"
                                },

                                {
                                    transform:
                                        "scale(1.06)"
                                }
                            ],
                            {
                                duration:
                                    700,

                                easing:
                                    "cubic-bezier(.16,1,.3,1)",

                                fill:
                                    "forwards"
                            }
                        );

                    }


                    if (title) {

                        title.animate(
                            [
                                {
                                    letterSpacing:
                                        getComputedStyle(
                                            title
                                        ).letterSpacing
                                },

                                {
                                    letterSpacing:
                                        "0.03em"
                                }
                            ],
                            {
                                duration:
                                    500,

                                easing:
                                    "cubic-bezier(.16,1,.3,1)",

                                fill:
                                    "forwards"
                            }
                        );

                    }

                }
            );


            /* ---------------------------------------------
               MOUSE LEAVE
            --------------------------------------------- */

            card.addEventListener(
                "mouseleave",
                () => {

                    if (image) {

                        image.animate(
                            [
                                {
                                    transform:
                                        getComputedStyle(
                                            image
                                        ).transform
                                },

                                {
                                    transform:
                                        "scale(1)"
                                }
                            ],
                            {
                                duration:
                                    650,

                                easing:
                                    "cubic-bezier(.16,1,.3,1)",

                                fill:
                                    "forwards"
                            }
                        );

                    }


                    if (title) {

                        title.animate(
                            [
                                {
                                    letterSpacing:
                                        getComputedStyle(
                                            title
                                        ).letterSpacing
                                },

                                {
                                    letterSpacing:
                                        "normal"
                                }
                            ],
                            {
                                duration:
                                    450,

                                easing:
                                    "ease",

                                fill:
                                    "forwards"
                            }
                        );

                    }

                }
            );

        }
    );

