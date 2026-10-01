/* =========================================================
   FACULTY PAGE
   UE COMPUTER ENGINEERING
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ====================================================== */

    const root =
        document.documentElement;

    const body =
        document.body;

    const themeToggle =
        document.getElementById("themeToggle");

    const clock =
        document.getElementById("clock");

    const exploreFaculty =
        document.getElementById("exploreFaculty");

    const facultySection =
        document.getElementById("faculty");

    const pageTransition =
        document.getElementById("pageTransition");

    const navLogoImage =
        document.querySelector(".nav-logo-image");


    /* =====================================================
       02. SETTINGS
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const supportsFinePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    /* =====================================================
       03. THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem("cpe-theme") ||
        "light";

    root.dataset.theme =
        savedTheme;


    function updateNavLogo(theme) {

        if (!navLogoImage) {
            return;
        }

        navLogoImage.src =
            theme === "dark"
                ? "assets/light.png"
                : "assets/dark.png";
    }


    updateNavLogo(savedTheme);


    function animateThemeChange() {

        if (
            prefersReducedMotion ||
            !document.body.animate
        ) {
            return;
        }

        document.body.animate(
            [
                {
                    opacity: 0.88
                },

                {
                    opacity: 1
                }
            ],
            {
                duration: 420,
                easing:
                    "cubic-bezier(0.22, 1, 0.36, 1)"
            }
        );
    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const newTheme =
                    root.dataset.theme === "dark"
                        ? "light"
                        : "dark";

                root.dataset.theme =
                    newTheme;

                localStorage.setItem(
                    "cpe-theme",
                    newTheme
                );

                updateNavLogo(
                    newTheme
                );

                animateThemeChange();
            }
        );
    }


    /* =====================================================
       04. MANILA CLOCK
    ====================================================== */

    function updateClock() {

        if (!clock) {
            return;
        }

        const now =
            new Date();

        const manilaTime =
            new Intl.DateTimeFormat(
                "en-GB",
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
            ).format(now);

        clock.textContent =
            `MANILA ${manilaTime}`;
    }


    updateClock();

    setInterval(
        updateClock,
        1000
    );


    /* =====================================================
       05. HERO ENTRANCE
    ====================================================== */

    function animateHero() {

        if (prefersReducedMotion) {
            return;
        }

        const heroElements = [
            ...document.querySelectorAll(
                ".faculty-hero .hero-top"
            ),

            ...document.querySelectorAll(
                ".faculty-hero .title-line"
            ),

            ...document.querySelectorAll(
                ".faculty-hero .hero-info"
            )
        ];


        heroElements.forEach(
            (element, index) => {

                if (!element.animate) {
                    return;
                }

                element.animate(
                    [
                        {
                            opacity: 0,
                            transform:
                                "translate3d(0, 38px, 0)"
                        },

                        {
                            opacity: 1,
                            transform:
                                "translate3d(0, 0, 0)"
                        }
                    ],
                    {
                        duration: 850,
                        delay:
                            100 + index * 90,

                        easing:
                            "cubic-bezier(0.16, 1, 0.3, 1)",

                        fill:
                            "both"
                    }
                );
            }
        );
    }


    requestAnimationFrame(
        () => {

            requestAnimationFrame(
                animateHero
            );
        }
    );


    /* =====================================================
       06. EXPLORE FACULTY
    ====================================================== */

    if (
        exploreFaculty &&
        facultySection
    ) {

        exploreFaculty.addEventListener(
            "click",
            () => {

                facultySection.scrollIntoView({
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",

                    block:
                        "start"
                });
            }
        );
    }


    /* =====================================================
       07. GENERAL SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold:
                    0.1,

                rootMargin:
                    "0px 0px -45px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );
        }
    );


    /* =====================================================
       08. FACULTY CARD STAGGER
    ====================================================== */

    const facultyCards =
        document.querySelectorAll(
            ".faculty-card"
        );


    const facultyCardObserver =
        new IntersectionObserver(
            (entries, observer) => {

                const visibleEntries =
                    entries
                        .filter(
                            entry =>
                                entry.isIntersecting
                        )
                        .sort(
                            (a, b) => {

                                return (
                                    [...facultyCards]
                                        .indexOf(a.target) -
                                    [...facultyCards]
                                        .indexOf(b.target)
                                );
                            }
                        );


                visibleEntries.forEach(
                    (entry, index) => {

                        const card =
                            entry.target;

                        if (
                            !prefersReducedMotion &&
                            card.animate
                        ) {

                            card.animate(
                                [
                                    {
                                        opacity: 0,
                                        transform:
                                            "translate3d(0, 55px, 0)"
                                    },

                                    {
                                        opacity: 1,
                                        transform:
                                            "translate3d(0, 0, 0)"
                                    }
                                ],
                                {
                                    duration:
                                        750,

                                    delay:
                                        index * 110,

                                    easing:
                                        "cubic-bezier(0.16, 1, 0.3, 1)",

                                    fill:
                                        "both"
                                }
                            );
                        }

                        observer.unobserve(
                            card
                        );
                    }
                );
            },
            {
                threshold:
                    0.12
            }
        );


    facultyCards.forEach(
        card => {

            facultyCardObserver.observe(
                card
            );
        }
    );


    /* =====================================================
       09. FACULTY PHOTO REVEAL
    ====================================================== */

    const facultyPhotos =
        document.querySelectorAll(
            ".faculty-photo"
        );


    const photoObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const photo =
                            entry.target;

                        if (
                            !prefersReducedMotion &&
                            photo.animate
                        ) {

                            photo.animate(
                                [
                                    {
                                        clipPath:
                                            "inset(0 0 100% 0)"
                                    },

                                    {
                                        clipPath:
                                            "inset(0 0 0% 0)"
                                    }
                                ],
                                {
                                    duration:
                                        900,

                                    easing:
                                        "cubic-bezier(0.16, 1, 0.3, 1)",

                                    fill:
                                        "both"
                                }
                            );
                        }

                        observer.unobserve(
                            photo
                        );
                    }
                );
            },
            {
                threshold:
                    0.12
            }
        );


    facultyPhotos.forEach(
        photo => {

            photoObserver.observe(
                photo
            );
        }
    );


    /* =====================================================
       10. SUBTLE FACULTY IMAGE PARALLAX
    ====================================================== */

    if (
        supportsFinePointer &&
        !prefersReducedMotion
    ) {

        facultyCards.forEach(
            card => {

                const image =
                    card.querySelector(
                        ".faculty-photo img"
                    );

                if (!image) {
                    return;
                }


                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();

                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) /
                            rect.width -
                            0.5;

                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) /
                            rect.height -
                            0.5;


                        image.style.transform =
                            `
                            scale(1.045)
                            translate3d(
                                ${x * -10}px,
                                ${y * -8}px,
                                0
                            )
                            `;
                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        image.style.transform =
                            "";

                        image.style.transition =
                            "transform 650ms cubic-bezier(0.16, 1, 0.3, 1)";


                        setTimeout(
                            () => {

                                image.style.transition =
                                    "";
                            },
                            680
                        );
                    }
                );


                card.addEventListener(
                    "mouseenter",
                    () => {

                        image.style.transition =
                            "transform 180ms ease-out";
                    }
                );
            }
        );
    }


    /* =====================================================
       11. FACULTY INFORMATION
    ====================================================== */

    const facultyProfiles = {

        antonio: {

            number:
                "FACULTY / 01",

            counter:
                "01 / 04",

            name:
                "ENGR. ERROL JOHN M. ANTONIO",

            role:
                "DEPARTMENT CHAIRPERSON",

            image:
                "assets/sirej.jpg",

            specializations: [
                "Embedded Systems",
                "Internet of Things"
            ],

            courses: [
                "Embedded Systems",
                "Internet of Things",
                "Computer Engineering Applications"
            ],

            description:
                "Focuses on embedded systems and Internet of Things technologies, including the integration of computing hardware, software, sensors, and connected devices."
        },


        limkian: {

            number:
                "FACULTY / 02",

            counter:
                "02 / 04",

            name:
                "ENGR. MARYANN LIMKIAN",

            role:
                "COMPUTER ENGINEERING FACULTY",

            image:
                "assets/mamlim.JPG",

            specializations: [
                "Computer Networks",
                "Logic Circuits",
                "Data Communication"
            ],

            courses: [
                "Computer Networks",
                "Logic Circuits",
                "Data Communication"
            ],

            description:
                "Focuses on computer networking, logic circuits, and data communication technologies that allow computing systems and devices to communicate effectively."
        },


        coral: {

            number:
                "FACULTY / 03",

            counter:
                "03 / 04",

            name:
                "ENGR. JOHN JOEMHEL D. CORAL",

            role:
                "COMPUTER ENGINEERING FACULTY",

            image:
                "assets/sircoral.JPG",

            specializations: [
                "Engineering Mathematics",
                "Engineering Data Analysis",
                "Software Design",
                "Discrete Mathematics"
            ],

            courses: [
                "Engineering Data Analysis",
                "Software Design",
                "Discrete Mathematics",
                "Engineering Mathematics"
            ],

            description:
                "Focuses on the mathematical and analytical side of Computer Engineering, including engineering data analysis, software design, and discrete mathematics."
        },


        corpuz: {

            number:
                "FACULTY / 04",

            counter:
                "04 / 04",

            name:
                "ENGR. ONOFRE CORPUZ",

            role:
                "COMPUTER ENGINEERING FACULTY",

            image:
                "assets/faculty-onofre-corpuz.jpg",

            specializations: [
                "Electronics",
                "Mixed Signals",
                "Sensors"
            ],

            courses: [
                "Electronics",
                "Mixed-Signal Systems",
                "Sensors",
                "Computer Engineering Hardware"
            ],

            description:
                "Focuses on electronics, mixed-signal systems, and sensor technologies used to detect, measure, and process information in computer engineering applications."
        }
    };


    /* =====================================================
       12. PROFILE ORDER
    ====================================================== */

    const profileOrder = [
        "antonio",
        "limkian",
        "coral",
        "corpuz"
    ];


    let activeProfileIndex =
        0;

    let profileAnimating =
        false;

    let profileCloseAnimation =
        null;


    /* =====================================================
       13. PROFILE ELEMENTS
    ====================================================== */

    const profileViewer =
        document.getElementById(
            "profileViewer"
        );

    const profileBackdrop =
        document.getElementById(
            "profileBackdrop"
        );

    const profileClose =
        document.getElementById(
            "profileClose"
        );

    const profileNumber =
        document.getElementById(
            "profileNumber"
        );

    const profileImage =
        document.getElementById(
            "profileImage"
        );

    const profileRole =
        document.getElementById(
            "profileRole"
        );

    const profileName =
        document.getElementById(
            "profileName"
        );

    const profileSpecializations =
        document.getElementById(
            "profileSpecializations"
        );

    const profileCourses =
        document.getElementById(
            "profileCourses"
        );

    const profileDescription =
        document.getElementById(
            "profileDescription"
        );

    const profileCounter =
        document.getElementById(
            "profileCounter"
        );

    const profilePrev =
        document.getElementById(
            "profilePrev"
        );

    const profileNext =
        document.getElementById(
            "profileNext"
        );


    /* =====================================================
       14. RENDER PROFILE
    ====================================================== */

    function renderProfile(
        profileKey
    ) {

        const profile =
            facultyProfiles[
                profileKey
            ];

        if (!profile) {
            return;
        }


        activeProfileIndex =
            profileOrder.indexOf(
                profileKey
            );


        if (profileNumber) {

            profileNumber.textContent =
                profile.number;
        }


        if (profileImage) {

            profileImage.src =
                profile.image;

            profileImage.alt =
                profile.name;
        }


        if (profileRole) {

            profileRole.textContent =
                profile.role;
        }


        if (profileName) {

            profileName.textContent =
                profile.name;
        }


        if (profileCounter) {

            profileCounter.textContent =
                profile.counter;
        }


        /* SPECIALIZATIONS */

        if (profileSpecializations) {

            profileSpecializations.innerHTML =
                "";

            profile.specializations.forEach(
                specialization => {

                    const tag =
                        document.createElement(
                            "span"
                        );

                    tag.textContent =
                        specialization;

                    profileSpecializations.appendChild(
                        tag
                    );
                }
            );
        }


        /* COURSES */

        if (profileCourses) {

            profileCourses.innerHTML =
                "";

            profile.courses.forEach(
                course => {

                    const item =
                        document.createElement(
                            "li"
                        );

                    item.textContent =
                        course;

                    profileCourses.appendChild(
                        item
                    );
                }
            );
        }


        if (profileDescription) {

            profileDescription.textContent =
                profile.description;
        }
    }


    /* =====================================================
       15. PROFILE CONTENT ELEMENTS
    ====================================================== */

    function getProfileTextElements() {

        return [
            profileNumber,
            profileRole,
            profileName,
            profileSpecializations,
            profileCourses,
            profileDescription,
            profileCounter
        ].filter(Boolean);
    }


    /* =====================================================
       16. PROFILE OPEN ANIMATION
    ====================================================== */

    function animateProfileOpen() {

        if (prefersReducedMotion) {
            return;
        }


        if (
            profileImage &&
            profileImage.animate
        ) {

            profileImage.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "scale(1.08)"
                    },

                    {
                        opacity: 1,
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration:
                        850,

                    easing:
                        "cubic-bezier(0.16, 1, 0.3, 1)",

                    fill:
                        "both"
                }
            );
        }


        const elements =
            getProfileTextElements();


        elements.forEach(
            (element, index) => {

                if (!element.animate) {
                    return;
                }

                element.animate(
                    [
                        {
                            opacity: 0,
                            transform:
                                "translate3d(0, 24px, 0)"
                        },

                        {
                            opacity: 1,
                            transform:
                                "translate3d(0, 0, 0)"
                        }
                    ],
                    {
                        duration:
                            650,

                        delay:
                            100 + index * 55,

                        easing:
                            "cubic-bezier(0.16, 1, 0.3, 1)",

                        fill:
                            "both"
                    }
                );
            }
        );
    }


    /* =====================================================
       17. OPEN PROFILE
    ====================================================== */

    function openProfile(
        profileKey
    ) {

        if (!profileViewer) {
            return;
        }


        if (profileCloseAnimation) {
            profileCloseAnimation.cancel();
            profileCloseAnimation = null;
        }

        if (profileViewer.getAnimations) {
            profileViewer
                .getAnimations({ subtree: true })
                .forEach(
                    (animation) => animation.cancel()
                );
        }

        profileViewer.style.opacity = "";
        profileViewer.style.transform = "";

        renderProfile(
            profileKey
        );


        profileViewer.classList.add(
            "active"
        );


        profileViewer.setAttribute(
            "aria-hidden",
            "false"
        );


        body.classList.add(
            "profile-open"
        );


        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    animateProfileOpen
                );
            }
        );
    }


    /* =====================================================
       18. CLOSE PROFILE
    ====================================================== */

    function closeProfile() {

        if (
            !profileViewer ||
            !profileViewer.classList.contains(
                "active"
            )
        ) {
            return;
        }


        if (
            prefersReducedMotion ||
            !profileViewer.animate
        ) {

            profileViewer.classList.remove(
                "active"
            );

            profileViewer.setAttribute(
                "aria-hidden",
                "true"
            );

            body.classList.remove(
                "profile-open"
            );

            return;
        }


        if (profileCloseAnimation) {
            profileCloseAnimation.cancel();
        }

        profileCloseAnimation =
            profileViewer.animate(
                [
                    {
                        opacity: 1,
                        transform:
                            "translate3d(0, 0, 0)"
                    },

                    {
                        opacity: 0,
                        transform:
                            "translate3d(0, 20px, 0)"
                    }
                ],
                {
                    duration:
                        280,

                    easing:
                        "ease-in",

                    fill:
                        "forwards"
                }
            );


        profileCloseAnimation.onfinish =
            () => {

                profileCloseAnimation = null;

                profileViewer.classList.remove(
                    "active"
                );

                profileViewer.setAttribute(
                    "aria-hidden",
                    "true"
                );

                body.classList.remove(
                    "profile-open"
                );

                profileViewer.style.opacity =
                    "";

                profileViewer.style.transform =
                    "";
            };
    }


    /* =====================================================
       19. CLICK FACULTY CARDS
    ====================================================== */

    const profileButtons =
        document.querySelectorAll(
            "[data-profile-button]"
        );


    profileButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const profileKey =
                        button.dataset
                            .profileButton;

                    openProfile(
                        profileKey
                    );
                }
            );
        }
    );


    document
        .querySelectorAll(
            ".faculty-card[data-profile]"
        )
        .forEach(
            card => {

                const photo =
                    card.querySelector(
                        ".faculty-photo"
                    );

                if (!photo) {
                    return;
                }


                photo.style.cursor =
                    "pointer";


                photo.addEventListener(
                    "click",
                    () => {

                        openProfile(
                            card.dataset.profile
                        );
                    }
                );
            }
        );


    /* =====================================================
       20. CLOSE EVENTS
    ====================================================== */

    if (profileClose) {

        profileClose.addEventListener(
            "click",
            closeProfile
        );
    }


    if (profileBackdrop) {

        profileBackdrop.addEventListener(
            "click",
            closeProfile
        );
    }


    /* =====================================================
       21. ANIMATED PROFILE CHANGE
    ====================================================== */

    function changeProfile(
        direction
    ) {

        if (profileAnimating) {
            return;
        }


        const nextIndex =
            (
                activeProfileIndex +
                direction +
                profileOrder.length
            ) %
            profileOrder.length;


        const nextKey =
            profileOrder[
                nextIndex
            ];


        if (prefersReducedMotion) {

            renderProfile(
                nextKey
            );

            return;
        }


        profileAnimating =
            true;


        const textElements =
            getProfileTextElements();


        const exitX =
            direction > 0
                ? -35
                : 35;

        const enterX =
            direction > 0
                ? 35
                : -35;


        /* IMAGE EXIT */

        if (
            profileImage &&
            profileImage.animate
        ) {

            profileImage.animate(
                [
                    {
                        opacity: 1,
                        transform:
                            "translate3d(0, 0, 0) scale(1)"
                    },

                    {
                        opacity: 0,
                        transform:
                            `translate3d(${exitX}px, 0, 0) scale(1.025)`
                    }
                ],
                {
                    duration:
                        280,

                    easing:
                        "ease-in",

                    fill:
                        "forwards"
                }
            );
        }


        /* TEXT EXIT */

        textElements.forEach(
            (element, index) => {

                if (!element.animate) {
                    return;
                }

                element.animate(
                    [
                        {
                            opacity: 1,
                            transform:
                                "translate3d(0, 0, 0)"
                        },

                        {
                            opacity: 0,
                            transform:
                                `translate3d(${exitX}px, 0, 0)`
                        }
                    ],
                    {
                        duration:
                            220,

                        delay:
                            index * 15,

                        easing:
                            "ease-in",

                        fill:
                            "forwards"
                    }
                );
            }
        );


        setTimeout(
            () => {

                renderProfile(
                    nextKey
                );


                /* IMAGE ENTER */

                if (
                    profileImage &&
                    profileImage.animate
                ) {

                    profileImage.animate(
                        [
                            {
                                opacity: 0,
                                transform:
                                    `translate3d(${enterX}px, 0, 0) scale(1.035)`
                            },

                            {
                                opacity: 1,
                                transform:
                                    "translate3d(0, 0, 0) scale(1)"
                            }
                        ],
                        {
                            duration:
                                550,

                            easing:
                                "cubic-bezier(0.16, 1, 0.3, 1)",

                            fill:
                                "both"
                        }
                    );
                }


                /* TEXT ENTER */

                const newTextElements =
                    getProfileTextElements();


                newTextElements.forEach(
                    (element, index) => {

                        if (!element.animate) {
                            return;
                        }

                        element.animate(
                            [
                                {
                                    opacity: 0,
                                    transform:
                                        `translate3d(${enterX}px, 0, 0)`
                                },

                                {
                                    opacity: 1,
                                    transform:
                                        "translate3d(0, 0, 0)"
                                }
                            ],
                            {
                                duration:
                                    480,

                                delay:
                                    index * 45,

                                easing:
                                    "cubic-bezier(0.16, 1, 0.3, 1)",

                                fill:
                                    "both"
                            }
                        );
                    }
                );


                setTimeout(
                    () => {

                        profileAnimating =
                            false;
                    },
                    650
                );

            },
            300
        );
    }


    /* =====================================================
       22. PREVIOUS / NEXT
    ====================================================== */

    if (profilePrev) {
        profilePrev.addEventListener(
            "click",
            () => changeProfile(-1)
        );
    }


    if (profileNext) {
        profileNext.addEventListener(
            "click",
            () => changeProfile(1)
        );
    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !profileViewer ||
                !profileViewer.classList.contains("active")
            ) {
                return;
            }

            if (event.key === "Escape") {
                closeProfile();
            }

            if (event.key === "ArrowLeft") {
                changeProfile(-1);
            }

            if (event.key === "ArrowRight") {
                changeProfile(1);
            }
        }
    );


    /* =====================================================
       24. FOOTER REVEAL
    ====================================================== */

    const footer =
        document.querySelector(
            ".index-footer"
        );

    const footerTitle =
        document.querySelector(
            ".footer-big-title"
        );


    if (
        footer &&
        footerTitle
    ) {

        const footerObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            if (
                                !prefersReducedMotion &&
                                footerTitle.animate
                            ) {

                                footerTitle.animate(
                                    [
                                        {
                                            opacity: 0,
                                            transform:
                                                "translate3d(0, 70px, 0)"
                                        },

                                        {
                                            opacity: 1,
                                            transform:
                                                "translate3d(0, 0, 0)"
                                        }
                                    ],
                                    {
                                        duration:
                                            1000,

                                        easing:
                                            "cubic-bezier(0.16, 1, 0.3, 1)",

                                        fill:
                                            "both"
                                    }
                                );
                            }


                            footerObserver.disconnect();
                        }
                    );
                },
                {
                    threshold:
                        0.18
                }
            );


        footerObserver.observe(
            footer
        );
    }


    /* =====================================================
       25. PAGE TRANSITIONS
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

                    const destination =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !destination ||
                        destination === "#" ||
                        destination.startsWith(
                            "#"
                        ) ||
                        destination.startsWith(
                            "javascript:"
                        ) ||
                        link.target === "_blank"
                    ) {
                        return;
                    }


                    event.preventDefault();


                    if (pageTransition) {

                        pageTransition.classList.add(
                            "active"
                        );
                    }


                    setTimeout(
                        () => {

                            window.location.href =
                                destination;
                        },
                        620
                    );
                }
            );
        }
    );


    /* =====================================================
       26. BACK BUTTON FIX
    ====================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            if (pageTransition) {

                pageTransition.classList.remove(
                    "active"
                );
            }
        }
    );


    /* =====================================================
       27. IMAGE LOADING
    ====================================================== */

    const facultyImages =
        document.querySelectorAll(
            ".faculty-photo img"
        );


    facultyImages.forEach(
        image => {

            if (image.complete) {

                image.classList.add(
                    "loaded"
                );

                return;
            }


            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "loaded"
                    );
                }
            );
        }
    );


    /* =====================================================
       28. CURSOR TRAIL
       LIGHT MODE = NAVY
       DARK MODE  = CREAM
    ====================================================== */

    if (supportsFinePointer) {

        const TRAIL_COUNT =
            14;

        const circles =
            [];


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
                "transform, opacity";


            body.appendChild(
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


        /* =============================================
           CURSOR COLOR
        ============================================== */

        function updateCursorColor() {

            const theme =
                root.dataset.theme ||
                "light";


            const cursorColor =
                theme === "dark"
                    ? "#fffcf3"
                    : "#0f1a2b";


            circles.forEach(
                circle => {

                    circle.element.style.background =
                        cursorColor;
                }
            );
        }


        updateCursorColor();


        const themeObserver =
            new MutationObserver(
                updateCursorColor
            );


        themeObserver.observe(
            root,
            {
                attributes:
                    true,

                attributeFilter: [
                    "data-theme"
                ]
            }
        );


        /* =============================================
           MOUSE POSITION
        ============================================== */

        document.addEventListener(
            "mousemove",
            event => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;

                mouseActive =
                    true;
            },
            {
                passive:
                    true
            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                mouseActive =
                    false;
            }
        );


        document.addEventListener(
            "mouseenter",
            () => {

                mouseActive =
                    true;
            }
        );


        /* =============================================
           CURSOR ANIMATION
        ============================================== */

        function animateCursorTrail() {

            let x =
                mouseX;

            let y =
                mouseY;


            circles.forEach(
                (circle, index) => {

                    circle.x +=
                        (x - circle.x) *
                        0.32;

                    circle.y +=
                        (y - circle.y) *
                        0.32;


                    const scale =
                        1 -
                        (
                            index /
                            circles.length
                        ) *
                        0.65;


                    const opacity =
                        mouseActive
                            ? 0.34 *
                              (
                                  1 -
                                  index /
                                  circles.length
                              )
                            : 0;


                    circle.element.style.transform =
                        `
                        translate3d(
                            ${circle.x - 6}px,
                            ${circle.y - 6}px,
                            0
                        )
                        scale(${scale})
                        `;


                    circle.element.style.opacity =
                        opacity;


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

});