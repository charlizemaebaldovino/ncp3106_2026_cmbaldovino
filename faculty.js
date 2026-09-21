/* =========================================================
   FACULTY PAGE
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

        const exploreFaculty =
            document.getElementById(
                "exploreFaculty"
            );


        /* =================================================
           PAGE ENTRANCE
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
           EXPLORE FACULTY
        ================================================= */

        if (exploreFaculty) {

            exploreFaculty.addEventListener(
                "click",
                function () {

                    const faculty =
                        document.getElementById(
                            "faculty"
                        );


                    if (faculty) {

                        faculty.scrollIntoView(
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

            const revealObserver =
                new IntersectionObserver(

                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry
                                        .target
                                        .classList
                                        .add(
                                            "visible"
                                        );


                                    revealObserver
                                        .unobserve(
                                            entry.target
                                        );
                                }

                            }
                        );

                    },

                    {

                        threshold:
                            .1,

                        rootMargin:
                            "0px 0px -40px 0px"

                    }

                );


            revealElements.forEach(
                function (element) {

                    revealObserver.observe(
                        element
                    );

                }
            );

        } else {

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
           FACULTY DATA
        ================================================= */

        const facultyProfiles = [

            {

                id:
                    "antonio",

                number:
                    "FACULTY / 01",

                name:
                    "ENGR. ERROL JOHN M. ANTONIO",

                role:
                    "COMPUTER ENGINEERING FACULTY",

                image:
                    "assets/faculty-errol-antonio.jpg",

                specializations: [

                    "Embedded Systems",

                    "Internet of Things",

                    "Microcontrollers",

                    "Sensors",

                    "Hardware–Software Integration"

                ],

                courses: [

                    "Embedded Systems",

                    "Internet of Things",

                    "Microcontroller Applications",

                    "Sensor-Based Systems",

                    "Hardware and Software Integration"

                ],

                description:
                    "Focuses on embedded and Internet of Things technologies, particularly the integration of hardware, microcontrollers, sensors, software, and connected systems."

            },


            {

                id:
                    "limkian",

                number:
                    "FACULTY / 02",

                name:
                    "ENGR. MARYANN LIMKIAN",

                role:
                    "COMPUTER ENGINEERING FACULTY",

                image:
                    "assets/faculty-maryann-limkian.jpg",

                specializations: [

                    "Computer Networking",

                    "Logic Circuits",

                    "Data Communications",

                    "Digital Systems"

                ],

                courses: [

                    "Computer Networking",

                    "Data Communications",

                    "Logic Circuits",

                    "Digital Systems",

                    "Network Technologies"

                ],

                description:
                    "Focuses on networking and digital systems, including computer communication, data transmission, network technologies, and the application of logic circuits in computing systems."

            },


            {

                id:
                    "coral",

                number:
                    "FACULTY / 03",

                name:
                    "ENGR. JOHN JOEMHEL D. CORAL",

                role:
                    "COMPUTER ENGINEERING FACULTY",

                image:
                    "assets/faculty-john-coral.jpg",

                specializations: [

                    "Engineering Mathematics",

                    "Engineering Data Analysis",

                    "Discrete Mathematics",

                    "Software Design"

                ],

                courses: [

                    "Engineering Data Analysis",

                    "Discrete Mathematics",

                    "Software Design",

                    "Mathematical Methods",

                    "Analytical Problem Solving"

                ],

                description:
                    "Focuses on the mathematical and analytical side of Computer Engineering, particularly engineering data analysis, discrete mathematics, software design, and analytical problem-solving."

            },


            {

                id:
                    "corpuz",

                number:
                    "FACULTY / 04",

                name:
                    "ENGR. ONOFRE CORPUZ",

                role:
                    "COMPUTER ENGINEERING FACULTY",

                image:
                    "assets/faculty-onofre-corpuz.jpg",

                specializations: [

                    "Electronics",

                    "Mixed-Signal Systems",

                    "Sensors",

                    "Electronic Circuits"

                ],

                courses: [

                    "Electronics",

                    "Mixed-Signal Systems",

                    "Sensor Technologies",

                    "Electronic Circuits",

                    "Electronic System Applications"

                ],

                description:
                    "Focuses on electronics and sensor-based technologies, including electronic circuits and mixed-signal systems that combine analog and digital components."

            }

        ];


        /* =================================================
           PROFILE VIEWER ELEMENTS
        ================================================= */

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


        const profileImage =
            document.getElementById(
                "profileImage"
            );


        const profileNumber =
            document.getElementById(
                "profileNumber"
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


        let activeProfileIndex =
            0;


        /* =================================================
           FIND PROFILE
        ================================================= */

        function findProfileIndex(
            profileId
        ) {

            return facultyProfiles
                .findIndex(
                    function (profile) {

                        return (
                            profile.id ===
                            profileId
                        );

                    }
                );
        }


        /* =================================================
           UPDATE PROFILE VIEWER
        ================================================= */

        function updateProfile() {

            const profile =
                facultyProfiles[
                    activeProfileIndex
                ];


            if (!profile) {
                return;
            }


            /* IMAGE */

            if (profileImage) {

                profileImage
                    .classList
                    .add(
                        "changing"
                    );


                setTimeout(
                    function () {

                        profileImage.src =
                            profile.image;


                        profileImage.alt =
                            profile.name;


                        profileImage
                            .classList
                            .remove(
                                "changing"
                            );

                    },
                    180
                );
            }


            /* NUMBER */

            if (profileNumber) {

                profileNumber.textContent =
                    profile.number;
            }


            /* ROLE */

            if (profileRole) {

                profileRole.textContent =
                    profile.role;
            }


            /* NAME */

            if (profileName) {

                profileName.textContent =
                    profile.name;
            }


            /* SPECIALIZATIONS */

            if (
                profileSpecializations
            ) {

                profileSpecializations
                    .innerHTML =
                    "";


                profile
                    .specializations
                    .forEach(
                        function (item) {

                            const tag =
                                document
                                    .createElement(
                                        "span"
                                    );


                            tag.className =
                                "profile-tag";


                            tag.textContent =
                                item;


                            profileSpecializations
                                .appendChild(
                                    tag
                                );

                        }
                    );
            }


            /* COURSES */

            if (profileCourses) {

                profileCourses.innerHTML =
                    "";


                profile
                    .courses
                    .forEach(
                        function (course) {

                            const li =
                                document
                                    .createElement(
                                        "li"
                                    );


                            li.textContent =
                                course;


                            profileCourses
                                .appendChild(
                                    li
                                );

                        }
                    );
            }


            /* DESCRIPTION */

            if (profileDescription) {

                profileDescription
                    .textContent =
                    profile.description;
            }


            /* COUNTER */

            if (profileCounter) {

                const current =
                    String(
                        activeProfileIndex +
                        1
                    )
                        .padStart(
                            2,
                            "0"
                        );


                const total =
                    String(
                        facultyProfiles.length
                    )
                        .padStart(
                            2,
                            "0"
                        );


                profileCounter
                    .textContent =
                    current +
                    " / " +
                    total;
            }
        }


        /* =================================================
           OPEN PROFILE
        ================================================= */

        function openProfile(
            profileId
        ) {

            const index =
                findProfileIndex(
                    profileId
                );


            if (index < 0) {
                return;
            }


            activeProfileIndex =
                index;


            updateProfile();


            if (!profileViewer) {
                return;
            }


            profileViewer
                .classList
                .add(
                    "open"
                );


            profileViewer
                .setAttribute(
                    "aria-hidden",
                    "false"
                );


            document.body
                .classList
                .add(
                    "profile-open"
                );
        }


        /* =================================================
           CLOSE PROFILE
        ================================================= */

        function closeProfile() {

            if (!profileViewer) {
                return;
            }


            profileViewer
                .classList
                .remove(
                    "open"
                );


            profileViewer
                .setAttribute(
                    "aria-hidden",
                    "true"
                );


            document.body
                .classList
                .remove(
                    "profile-open"
                );
        }


        /* =================================================
           NEXT PROFILE
        ================================================= */

        function nextProfile() {

            activeProfileIndex =
                (
                    activeProfileIndex +
                    1
                ) %
                facultyProfiles.length;


            updateProfile();
        }


        /* =================================================
           PREVIOUS PROFILE
        ================================================= */

        function previousProfile() {

            activeProfileIndex =
                (
                    activeProfileIndex -
                    1 +
                    facultyProfiles.length
                ) %
                facultyProfiles.length;


            updateProfile();
        }


        /* =================================================
           PROFILE BUTTONS
        ================================================= */

        const profileButtons =
            document.querySelectorAll(
                ".profile-button"
            );


        profileButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.stopPropagation();


                        const profileId =
                            button
                                .dataset
                                .profile;


                        openProfile(
                            profileId
                        );

                    }
                );

            }
        );


        /* =================================================
           PROFILE CONTROLS
        ================================================= */

        if (profileClose) {

            profileClose
                .addEventListener(
                    "click",
                    closeProfile
                );
        }


        if (profileBackdrop) {

            profileBackdrop
                .addEventListener(
                    "click",
                    closeProfile
                );
        }


        if (profileNext) {

            profileNext
                .addEventListener(
                    "click",
                    nextProfile
                );
        }


        if (profilePrev) {

            profilePrev
                .addEventListener(
                    "click",
                    previousProfile
                );
        }


        /* =================================================
           KEYBOARD PROFILE CONTROLS
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    !profileViewer ||
                    !profileViewer
                        .classList
                        .contains(
                            "open"
                        )
                ) {

                    return;
                }


                if (
                    event.key ===
                    "Escape"
                ) {

                    closeProfile();
                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    nextProfile();
                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    previousProfile();
                }

            }
        );


        /* =================================================
           MOBILE PROFILE SWIPE
        ================================================= */

        let touchStartX =
            0;


        let touchEndX =
            0;


        if (profileViewer) {

            profileViewer
                .addEventListener(
                    "touchstart",
                    function (event) {

                        touchStartX =
                            event
                                .changedTouches[0]
                                .screenX;

                    },
                    {
                        passive: true
                    }
                );


            profileViewer
                .addEventListener(
                    "touchend",
                    function (event) {

                        touchEndX =
                            event
                                .changedTouches[0]
                                .screenX;


                        const distance =
                            touchEndX -
                            touchStartX;


                        if (
                            Math.abs(
                                distance
                            ) < 60
                        ) {

                            return;
                        }


                        if (
                            distance < 0
                        ) {

                            nextProfile();

                        } else {

                            previousProfile();

                        }

                    },
                    {
                        passive: true
                    }
                );
        }


        /* =================================================
           FACULTY CARD TOUCH EFFECT
        ================================================= */

        const facultyCards =
            document.querySelectorAll(
                ".faculty-card"
            );


        facultyCards.forEach(
            function (card) {

                card.addEventListener(
                    "touchstart",
                    function () {

                        facultyCards
                            .forEach(
                                function (
                                    otherCard
                                ) {

                                    if (
                                        otherCard !==
                                        card
                                    ) {

                                        otherCard
                                            .classList
                                            .remove(
                                                "touch-active"
                                            );
                                    }

                                }
                            );


                        card
                            .classList
                            .toggle(
                                "touch-active"
                            );

                    },
                    {
                        passive: true
                    }
                );

            }
        );


        /* =================================================
           PAGE TRANSITIONS
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

            const circleCount =
                12;


            const circles =
                [];


            let mouseX =
                -100;


            let mouseY =
                -100;


            let mouseActive =
                false;


            for (
                let i = 0;
                i < circleCount;
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
                                index * .65
                            );


                        const opacity =
                            mouseActive

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
           BACK BUTTON FIX
        ================================================= */

        window.addEventListener(
            "pageshow",
            function () {

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
                            "entering",
                            "leaving"
                        );

                }


                revealElements
                    .forEach(
                        function (
                            element
                        ) {

                            if (
                                element
                                    .getBoundingClientRect()
                                    .top <
                                window.innerHeight
                            ) {

                                element
                                    .classList
                                    .add(
                                        "visible"
                                    );

                            }

                        }
                    );

            }
        );


    }
);