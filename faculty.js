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


    /* =====================================================
       02. THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem("cpe-theme") || "light";


    root.dataset.theme =
        savedTheme;


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const currentTheme =
                    root.dataset.theme;

                const newTheme =
                    currentTheme === "dark"
                        ? "light"
                        : "dark";


                root.dataset.theme =
                    newTheme;


                localStorage.setItem(
                    "cpe-theme",
                    newTheme
                );

            }
        );

    }


    /* =====================================================
       03. MANILA CLOCK
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
       04. EXPLORE FACULTY BUTTON
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
                        "smooth",

                    block:
                        "start"
                });

            }
        );

    }


    /* =====================================================
       05. SCROLL REVEAL
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
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
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
                    "0px 0px -60px 0px"
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
       06. FACULTY INFORMATION
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
       07. PROFILE ORDER
    ====================================================== */

    const profileOrder = [
        "antonio",
        "limkian",
        "coral",
        "corpuz"
    ];


    let activeProfileIndex =
        0;


    /* =====================================================
       08. PROFILE ELEMENTS
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
       09. RENDER PROFILE
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


        /* ================================================
           SPECIALIZATIONS
        ================================================= */

        if (profileSpecializations) {

            profileSpecializations.innerHTML =
                "";


            profile.specializations.forEach(
                (specialization) => {

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


        /* ================================================
           COURSES
        ================================================= */

        if (profileCourses) {

            profileCourses.innerHTML =
                "";


            profile.courses.forEach(
                (course) => {

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


        /* ================================================
           DESCRIPTION
        ================================================= */

        if (profileDescription) {

            profileDescription.textContent =
                profile.description;

        }

    }


    /* =====================================================
       10. OPEN PROFILE
    ====================================================== */

    function openProfile(
        profileKey
    ) {

        if (!profileViewer) {
            return;
        }


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


        document.body.classList.add(
            "profile-open"
        );

    }


    /* =====================================================
       11. CLOSE PROFILE
    ====================================================== */

    function closeProfile() {

        if (!profileViewer) {
            return;
        }


        profileViewer.classList.remove(
            "active"
        );


        profileViewer.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "profile-open"
        );

    }


    /* =====================================================
       12. PROFILE BUTTONS
    ====================================================== */

    const profileButtons =
        document.querySelectorAll(
            "[data-profile-button]"
        );


    profileButtons.forEach(
        (button) => {

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


    /* =====================================================
       13. CLICKING FACULTY IMAGE/CARD
    ====================================================== */

    const facultyCards =
        document.querySelectorAll(
            ".faculty-card[data-profile]"
        );


    facultyCards.forEach(
        (card) => {

            const photo =
                card.querySelector(
                    ".faculty-photo"
                );


            if (!photo) {
                return;
            }


            photo.addEventListener(
                "click",
                () => {

                    const profileKey =
                        card.dataset.profile;


                    openProfile(
                        profileKey
                    );

                }
            );


            photo.style.cursor =
                "pointer";

        }
    );


    /* =====================================================
       14. CLOSE EVENTS
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
       15. PREVIOUS PROFILE
    ====================================================== */

    if (profilePrev) {

        profilePrev.addEventListener(
            "click",
            () => {

                activeProfileIndex--;


                if (
                    activeProfileIndex < 0
                ) {

                    activeProfileIndex =
                        profileOrder.length - 1;

                }


                renderProfile(
                    profileOrder[
                        activeProfileIndex
                    ]
                );

            }
        );

    }


    /* =====================================================
       16. NEXT PROFILE
    ====================================================== */

    if (profileNext) {

        profileNext.addEventListener(
            "click",
            () => {

                activeProfileIndex++;


                if (
                    activeProfileIndex >=
                    profileOrder.length
                ) {

                    activeProfileIndex =
                        0;

                }


                renderProfile(
                    profileOrder[
                        activeProfileIndex
                    ]
                );

            }
        );

    }


    /* =====================================================
       17. KEYBOARD CONTROLS
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !profileViewer ||
                !profileViewer.classList.contains(
                    "active"
                )
            ) {

                return;

            }


            /* ESCAPE */

            if (
                event.key ===
                "Escape"
            ) {

                closeProfile();

            }


            /* LEFT */

            if (
                event.key ===
                "ArrowLeft"
            ) {

                activeProfileIndex--;


                if (
                    activeProfileIndex < 0
                ) {

                    activeProfileIndex =
                        profileOrder.length - 1;

                }


                renderProfile(
                    profileOrder[
                        activeProfileIndex
                    ]
                );

            }


            /* RIGHT */

            if (
                event.key ===
                "ArrowRight"
            ) {

                activeProfileIndex++;


                if (
                    activeProfileIndex >=
                    profileOrder.length
                ) {

                    activeProfileIndex =
                        0;

                }


                renderProfile(
                    profileOrder[
                        activeProfileIndex
                    ]
                );

            }

        }
    );


    /* =====================================================
       18. PAGE TRANSITIONS
    ====================================================== */

    const pageLinks =
        document.querySelectorAll(
            "a.page-link"
        );


    pageLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const destination =
                        link.getAttribute(
                            "href"
                        );


                    /* ========================================
                       IGNORE EMPTY LINKS
                    ========================================= */

                    if (
                        !destination ||
                        destination === "#" ||
                        destination.startsWith(
                            "javascript:"
                        )
                    ) {

                        return;

                    }


                    /* ========================================
                       IGNORE NEW TAB LINKS
                    ========================================= */

                    if (
                        link.target ===
                        "_blank"
                    ) {

                        return;

                    }


                    /* ========================================
                       SAME PAGE HASH
                    ========================================= */

                    if (
                        destination.startsWith(
                            "#"
                        )
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
       19. RESET TRANSITION WHEN RETURNING WITH BACK BUTTON
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
       20. IMAGE LOADING
    ====================================================== */

    const facultyImages =
        document.querySelectorAll(
            ".faculty-photo img"
        );


    facultyImages.forEach(
        (image) => {

            if (
                image.complete
            ) {

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


});