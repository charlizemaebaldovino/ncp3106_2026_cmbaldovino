/* =========================================================
   SPECIALIZATIONS.JS
   UE COMPUTER ENGINEERING

   FEATURES:
   - Light / Dark Mode
   - Cursor Trail
   - Scroll Reveal
   - Specialization Switching
   - Previous / Next
   - Field Index
   - Direction Buttons
   - Image Hover Reveal
   - Touch Image Reveal
   - Manila Clock
   - Smooth Scroll
   - Page Transition
========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       01. ELEMENTS
    ====================================================== */

    const html =
        document.documentElement;


    const themeToggle =
        document.getElementById("themeToggle");


    const clock =
        document.getElementById("clock");


    const cursorTrail =
        document.getElementById("cursorTrail");


    const pageTransition =
        document.getElementById("pageTransition");


    const exploreButton =
        document.getElementById("exploreButton");


    const specializationShowcase =
        document.getElementById("specializationShowcase");


    const showcaseVisual =
        document.getElementById("showcaseVisual");


    const showcaseContent =
        document.getElementById("showcaseContent");


    const primaryImage =
        document.getElementById("primaryImage");


    const secondaryImage =
        document.getElementById("secondaryImage");


    const showcaseCounter =
        document.getElementById("showcaseCounter");


    const showcaseCategory =
        document.getElementById("showcaseCategory");


    const visualNumber =
        document.getElementById("visualNumber");


    const fieldTitle =
        document.getElementById("fieldTitle");


    const fieldDescription =
        document.getElementById("fieldDescription");


    const applicationTags =
        document.getElementById("applicationTags");


    const careerList =
        document.getElementById("careerList");


    const previousField =
        document.getElementById("previousField");


    const nextField =
        document.getElementById("nextField");


    const fieldIndexItems =
        document.querySelectorAll(
            ".field-index-item"
        );


    const directionOptions =
        document.querySelectorAll(
            ".direction-option"
        );


    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const pageLinks =
        document.querySelectorAll(
            ".page-link-transition-disabled"
        );


    /* =====================================================
       02. SETTINGS
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const isTouchDevice =
        window.matchMedia(
            "(hover: none), (pointer: coarse)"
        ).matches;


    let currentField = 0;


    let fieldChanging = false;


    let touchRevealTimer = null;


    /* =====================================================
       03. SPECIALIZATION DATA

       IMAGE NAMES ARE HERE.

       Change these filenames based on the images
       inside your assets folder.

       Example:

       image:
       "assets/specialization-embedded.jpg"

       hoverImage:
       "assets/specialization-embedded-2.jpg"
    ====================================================== */

    const specializations = [


        /* =================================================
           01. EMBEDDED SYSTEMS
        ================================================= */

        {

            number:
                "01",

            category:
                "HARDWARE + SOFTWARE",

            title:
                "EMBEDDED<br>SYSTEMS",

            description:
                "Embedded Systems focuses on designing specialized computer systems built directly into electronic devices. These systems combine hardware and software to perform dedicated functions efficiently and reliably.",

            image:
                "assets/specialization-embedded.jpg",

            hoverImage:
                "assets/specialization-embedded-2.jpg",

            imageAlt:
                "Embedded Systems",

            applications: [

                "Automotive Control Systems",

                "Medical Devices",

                "Smart Appliances",

                "Industrial Controllers",

                "Drones"

            ],

            careers: [

                "Embedded Systems Engineer",

                "Firmware Engineer",

                "Hardware Engineer",

                "Electronics Design Engineer"

            ]

        },


        /* =================================================
           02. INTERNET OF THINGS
        ================================================= */

        {

            number:
                "02",

            category:
                "CONNECTED SYSTEMS",

            title:
                "INTERNET OF<br>THINGS",

            description:
                "The Internet of Things connects physical devices, sensors, software, and networks so they can collect information, communicate, and respond intelligently to their environment.",

            image:
                "assets/specialization-iot.jpg",

            hoverImage:
                "assets/specialization-iot-2.jpg",

            imageAlt:
                "Internet of Things",

            applications: [

                "Smart Homes",

                "Smart Cities",

                "Industrial IoT",

                "Environmental Monitoring",

                "Connected Devices"

            ],

            careers: [

                "IoT Engineer",

                "IoT Solutions Developer",

                "Systems Integration Engineer",

                "Embedded IoT Developer"

            ]

        },


        /* =================================================
           03. COMPUTER NETWORKS
        ================================================= */

        {

            number:
                "03",

            category:
                "CONNECTIVITY",

            title:
                "COMPUTER<br>NETWORKS",

            description:
                "Computer Networks focuses on the technologies that allow computers, servers, devices, and systems to communicate. It includes network design, configuration, management, and infrastructure.",

            image:
                "assets/specialization-networks.jpg",

            hoverImage:
                "assets/specialization-networks-2.jpg",

            imageAlt:
                "Computer Networks",

            applications: [

                
                "Enterprise Networks",

                "Routing & Switching",

                "Wireless Networks",

                "Data Centers",

                "Network Infrastructure"

            ],

            careers: [

                "Network Engineer",

                "Network Administrator",

                "Systems Engineer",

                "Infrastructure Engineer"

            ]

        },


        /* =================================================
           04. CYBERSECURITY
        ================================================= */

        {

            number:
                "04",

            category:
                "SECURITY",

            title:
                "CYBER<br>SECURITY",

            description:
                "Cybersecurity focuses on protecting computer systems, networks, applications, and digital information from unauthorized access, attacks, disruption, and other security threats.",

            image:
                "assets/specialization-cybersecurity.jpg",

            hoverImage:
                "assets/specialization-cybersecurity-2.jpg",

            imageAlt:
                "Cybersecurity",

            applications: [

                "Network Security",

                "Security Monitoring",

                "Threat Detection",

                "Access Control",

                "System Protection"

            ],

            careers: [

                "Cybersecurity Engineer",

                "Security Analyst",

                "Network Security Engineer",

                "Security Operations Analyst"

            ]

        },


        /* =================================================
           05. SOFTWARE DEVELOPMENT
        ================================================= */

        {

            number:
                "05",

            category:
                "SOFTWARE",

            title:
                "SOFTWARE<br>DEVELOPMENT",

            description:
                "Software Development involves designing, building, testing, and maintaining applications and systems. Computer engineers apply programming and engineering principles to create reliable software solutions.",

            image:
                "assets/specialization-software.jpg",

            hoverImage:
                "assets/specialization-software-2.jpg",

            imageAlt:
                "Software Development",

            applications: [

                "Web Applications",

                "Desktop Software",

                "Mobile Applications",

                "System Software",

                "Engineering Tools"

            ],

            careers: [

                "Software Engineer",

                "Software Developer",

                "Application Developer",

                "Systems Programmer"

            ]

        },


        /* =================================================
           06. AI & MACHINE LEARNING
        ================================================= */

        {

            number:
                "06",

            category:
                "INTELLIGENT SYSTEMS",

            title:
                "AI & MACHINE<br>LEARNING",

            description:
                "Artificial Intelligence and Machine Learning focus on developing systems that can analyze information, recognize patterns, learn from data, and perform tasks that normally require human intelligence.",

            image:
                "assets/specialization-ai.jpg",

            hoverImage:
                "assets/specialization-ai-2.jpg",

            imageAlt:
                "Artificial Intelligence and Machine Learning",

            applications: [

                "Computer Vision",

                "Intelligent Automation",

                "Predictive Systems",

                "Pattern Recognition",

                "Smart Assistants"

            ],

            careers: [

                "AI Engineer",

                "Machine Learning Engineer",

                "Computer Vision Engineer",

                "AI Systems Developer"

            ]

        },


        /* =================================================
           07. DATA SCIENCE
        ================================================= */

        {

            number:
                "07",

            category:
                "DATA",

            title:
                "DATA SCIENCE &<br>DATA ENGINEERING",

            description:
                "Data Science and Data Engineering focus on collecting, organizing, processing, and analyzing large amounts of information so that useful patterns, insights, and decisions can be produced.",

            image:
                "assets/specialization-data.jpg",

            hoverImage:
                "assets/specialization-data-2.jpg",

            imageAlt:
                "Data Science and Data Engineering",

            applications: [

                "Data Analytics",

                "Data Pipelines",

                "Business Intelligence",

                "Predictive Analytics",

                "Large-Scale Data Processing"

            ],

            careers: [

                "Data Analyst",

                "Data Engineer",

                "Data Scientist",

                "Business Intelligence Analyst"

            ]

        },


        /* =================================================
           08. ROBOTICS
        ================================================= */

        {

            number:
                "08",

            category:
                "AUTOMATION",

            title:
                "ROBOTICS &<br>AUTOMATION",

            description:
                "Robotics and Automation combine computing, electronics, sensors, control systems, and programming to develop machines capable of performing physical tasks automatically or intelligently.",

            image:
                "assets/specialization-robotics.jpg",

            hoverImage:
                "assets/specialization-robotics-2.jpg",

            imageAlt:
                "Robotics and Automation",

            applications: [

                "Industrial Robots",

                "Autonomous Systems",

                "Manufacturing Automation",

                "Service Robots",

                "Smart Machines"

            ],

            careers: [

                "Robotics Engineer",

                "Automation Engineer",

                "Control Systems Engineer",

                "Mechatronics Engineer"

            ]

        },


        /* =================================================
           09. COMPUTER HARDWARE
        ================================================= */

        {

            number:
                "09",

            category:
                "HARDWARE",

            title:
                "COMPUTER HARDWARE<br>& ARCHITECTURE",

            description:
                "Computer Hardware and Architecture focuses on how computing systems are physically designed and organized, from processors and digital circuits to memory, interfaces, and complete computer systems.",

            image:
                "assets/specialization-hardware.jpg",

            hoverImage:
                "assets/specialization-hardware-2.jpg",

            imageAlt:
                "Computer Hardware and Architecture",

            applications: [

                "Processor Systems",

                "Digital Circuits",

                "Computer Architecture",

                "Electronic Hardware",

                "Hardware Prototyping"

            ],

            careers: [

                "Hardware Engineer",

                "Computer Systems Engineer",

                "Digital Design Engineer",

                "Electronics Engineer"

            ]

        },


        /* =================================================
           10. CLOUD & EDGE COMPUTING
        ================================================= */

        {

            number:
                "10",

            category:
                "DISTRIBUTED COMPUTING",

            title:
                "CLOUD & EDGE<br>COMPUTING",

            description:
                "Cloud and Edge Computing focus on distributing computing resources across remote data centers and devices closer to users, allowing systems to process, store, and deliver information efficiently.",

            image:
                "assets/specialization-cloud.jpg",

            hoverImage:
                "assets/specialization-cloud-2.jpg",

            imageAlt:
                "Cloud and Edge Computing",

            applications: [

                "Cloud Infrastructure",

                "Edge Devices",

                "Distributed Systems",

                "Remote Computing",

                "Scalable Services"

            ],

            careers: [

                "Cloud Engineer",

                "Cloud Systems Engineer",

                "DevOps Engineer",

                "Infrastructure Engineer"

            ]

        }

    ];


    /* =====================================================
       04. THEME
    ====================================================== */

   /* =====================================================
   04. THEME
====================================================== */

/*
    Get the navigation logo.

    Make sure your HTML logo has:
    id="navLogoImage"
*/

const navLogoImage =
    document.getElementById(
        "navLogoImage"
    );


const body =
    document.body;


/*
    Change the logo depending
    on the current theme.

    DARK MODE  = light.png
    LIGHT MODE = dark.png
*/

function updateLogo(theme) {

    if (!navLogoImage) {
        return;
    }


    navLogoImage.src =
        theme === "dark"
            ? "assets/light.png"
            : "assets/dark.png";

}


/*
    Apply theme + save it +
    update the logo.
*/

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

}


/*
    Get previously saved theme.

    If there is no saved theme,
    start in LIGHT MODE.
*/

const savedTheme =
    localStorage.getItem(
        "cpe-theme"
    ) || "light";


/*
    Apply saved theme when
    the page first loads.
*/

html.dataset.theme =
    savedTheme;


updateLogo(
    savedTheme
);


/*
    Theme button
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


            /*
                This changes:
                1. Theme
                2. localStorage
                3. Navigation logo
            */

            setTheme(
                newTheme
            );


            /*
                Small transition when
                changing themes.
            */

            if (
                !window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {

                body.animate(
                    [
                        {
                            opacity: 0.88
                        },

                        {
                            opacity: 1
                        }
                    ],
                    {
                        duration: 380,

                        easing:
                            "ease-out"
                    }
                );

            }

        }
    );

}


    /* =====================================================
       05. MANILA CLOCK
    ====================================================== */

    function updateClock() {

        if (!clock) {
            return;
        }


        const now =
            new Date();


        const time =
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
            `MANILA ${time}`;

    }


    updateClock();


    setInterval(
        updateClock,
        1000
    );


    /* =====================================================
       06. SCROLL REVEAL
    ====================================================== */

    if (prefersReducedMotion) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

    } else {

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

    }


    /* =====================================================
       07. EXPLORE BUTTON
    ====================================================== */

    if (
        exploreButton &&
        specializationShowcase
    ) {

        exploreButton.addEventListener(
            "click",
            () => {

                specializationShowcase.scrollIntoView(
                    {

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth",

                        block:
                            "start"

                    }
                );

            }
        );

    }


    /* =====================================================
       08. CREATE APPLICATION TAGS
    ====================================================== */

    function renderApplications(
        applications
    ) {

        if (!applicationTags) {
            return;
        }


        applicationTags.innerHTML =
            "";


        applications.forEach(
            application => {

                const tag =
                    document.createElement(
                        "span"
                    );


                tag.textContent =
                    application;


                applicationTags.appendChild(
                    tag
                );

            }
        );

    }


    /* =====================================================
       09. CREATE CAREER LIST
    ====================================================== */

    function renderCareers(
        careers
    ) {

        if (!careerList) {
            return;
        }


        careerList.innerHTML =
            "";


        careers.forEach(
            career => {

                const item =
                    document.createElement(
                        "span"
                    );


                item.textContent =
                    career;


                careerList.appendChild(
                    item
                );

            }
        );

    }


    /* =====================================================
       10. ACTIVE INDEX
    ====================================================== */

    function updateActiveIndex() {

        fieldIndexItems.forEach(
            (
                item,
                index
            ) => {

                item.classList.toggle(
                    "active",
                    index === currentField
                );

            }
        );

    }


    /* =====================================================
       11. UPDATE SPECIALIZATION

       IMPORTANT:

       We use the CSS states:

       .changing
       .switching

       so the old content fades first,
       then the new content appears.

       This avoids the sudden snapping.
    ====================================================== */

    function updateSpecialization(
        newIndex,
        options = {}
    ) {

        if (
            fieldChanging ||
            !specializations.length
        ) {
            return;
        }


        let index =
            Number(newIndex);


        if (
            Number.isNaN(index)
        ) {
            return;
        }


        /* LOOP BACKWARD */

        if (index < 0) {

            index =
                specializations.length - 1;

        }


        /* LOOP FORWARD */

        if (
            index >=
            specializations.length
        ) {

            index = 0;

        }


        if (
            index === currentField &&
            !options.force
        ) {

            if (
                options.scroll &&
                showcaseVisual
            ) {

                showcaseVisual.scrollIntoView(
                    {

                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth",

                        block:
                            "center"

                    }
                );

            }


            return;

        }


        fieldChanging = true;


        /* =================================================
           PHASE 1
           FADE CURRENT CONTENT
        ================================================= */

        if (showcaseContent) {

            showcaseContent.classList.add(
                "changing"
            );

        }


        if (showcaseVisual) {

            showcaseVisual.classList.add(
                "switching"
            );


            showcaseVisual.classList.remove(
                "touch-reveal"
            );

        }


        clearTimeout(
            touchRevealTimer
        );


        const changeDelay =
            prefersReducedMotion
                ? 0
                : 300;


        setTimeout(
            () => {


                /* =========================================
                   PHASE 2
                   CHANGE THE DATA
                ========================================== */

                currentField =
                    index;


                const field =
                    specializations[
                        currentField
                    ];


                /* COUNTER */

                if (showcaseCounter) {

                    showcaseCounter.textContent =
                        `${field.number} / ${String(
                            specializations.length
                        ).padStart(2, "0")}`;

                }


                /* CATEGORY */

                if (showcaseCategory) {

                    showcaseCategory.textContent =
                        field.category;

                }


                /* IMAGE NUMBER */

                if (visualNumber) {

                    visualNumber.textContent =
                        field.number;

                }


                /* TITLE */

                if (fieldTitle) {

                    fieldTitle.innerHTML =
                        field.title;

                }


                /* DESCRIPTION */

                if (fieldDescription) {

                    fieldDescription.textContent =
                        field.description;

                }


                /* PRIMARY IMAGE */

                if (primaryImage) {

                    primaryImage.src =
                        field.image;


                    primaryImage.alt =
                        field.imageAlt;

                }


                /* SECOND / HOVER IMAGE */

                if (secondaryImage) {

                    secondaryImage.src =
                        field.hoverImage;


                    secondaryImage.alt =
                        `${field.imageAlt} application`;

                }


                /* APPLICATIONS */

                renderApplications(
                    field.applications
                );


                /* CAREERS */

                renderCareers(
                    field.careers
                );


                /* ACTIVE FIELD INDEX */

                updateActiveIndex();


                /* =========================================
                   WAIT UNTIL IMAGE IS READY
                ========================================== */

                const finishChange =
                    () => {


                        requestAnimationFrame(
                            () => {

                                requestAnimationFrame(
                                    () => {


                                        if (
                                            showcaseContent
                                        ) {

                                            showcaseContent.classList.remove(
                                                "changing"
                                            );

                                        }


                                        if (
                                            showcaseVisual
                                        ) {

                                            showcaseVisual.classList.remove(
                                                "switching"
                                            );

                                        }


                                        fieldChanging =
                                            false;


                                        /* OPTIONAL SCROLL */

                                        if (
                                            options.scroll &&
                                            showcaseVisual
                                        ) {

                                            const top =
                                                showcaseVisual
                                                    .getBoundingClientRect()
                                                    .top +
                                                window.scrollY -
                                                115;


                                            window.scrollTo(
                                                {

                                                    top:
                                                        top,

                                                    behavior:
                                                        prefersReducedMotion
                                                            ? "auto"
                                                            : "smooth"

                                                }
                                            );

                                        }

                                    }
                                );

                            }
                        );

                    };


                if (
                    primaryImage &&
                    !primaryImage.complete
                ) {

                    primaryImage.addEventListener(
                        "load",
                        finishChange,
                        {
                            once: true
                        }
                    );


                    primaryImage.addEventListener(
                        "error",
                        finishChange,
                        {
                            once: true
                        }
                    );

                } else {

                    finishChange();

                }

            },
            changeDelay
        );

    }


    /* =====================================================
       12. PREVIOUS FIELD
    ====================================================== */

    if (previousField) {

        previousField.addEventListener(
            "click",
            () => {

                updateSpecialization(
                    currentField - 1
                );

            }
        );

    }


    /* =====================================================
       13. NEXT FIELD
    ====================================================== */

    if (nextField) {

        nextField.addEventListener(
            "click",
            () => {

                updateSpecialization(
                    currentField + 1
                );

            }
        );

    }


    /* =====================================================
       14. FIELD INDEX

       Clicking one of the 10 rows changes
       the large specialization card.
    ====================================================== */

    fieldIndexItems.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            item.dataset.index
                        );


                    updateSpecialization(
                        index,
                        {
                            scroll: true
                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       15. DIRECTION OPTIONS

       Each direction contains a data-fields value.

       Example:
       data-fields="0,7,8"

       Clicking it goes to the FIRST specialization
       connected to that direction.
    ====================================================== */

    directionOptions.forEach(
        option => {

            option.addEventListener(
                "click",
                () => {

                    const fields =
                        option.dataset.fields;


                    if (!fields) {
                        return;
                    }


                    const indexes =
                        fields
                            .split(",")
                            .map(
                                value =>
                                    Number(
                                        value.trim()
                                    )
                            )
                            .filter(
                                value =>
                                    !Number.isNaN(
                                        value
                                    )
                            );


                    if (!indexes.length) {
                        return;
                    }


                    updateSpecialization(
                        indexes[0],
                        {
                            scroll: true
                        }
                    );

                }
            );

        }
    );


    /* =====================================================
       16. TOUCH IMAGE REVEAL

       Desktop already uses CSS :hover.

       On phones/tablets:
       tap image -> show second image
       tap again -> return
    ====================================================== */

    if (
        showcaseVisual &&
        isTouchDevice
    ) {

        showcaseVisual.addEventListener(
            "click",
            event => {

                event.preventDefault();


                showcaseVisual.classList.toggle(
                    "touch-reveal"
                );


                clearTimeout(
                    touchRevealTimer
                );


                if (
                    showcaseVisual.classList.contains(
                        "touch-reveal"
                    )
                ) {

                    touchRevealTimer =
                        setTimeout(
                            () => {

                                showcaseVisual.classList.remove(
                                    "touch-reveal"
                                );

                            },
                            3500
                        );

                }

            }
        );

    }


    /* =====================================================
       17. KEYBOARD NAVIGATION

       When the specialization area is visible:

       LEFT ARROW  = previous
       RIGHT ARROW = next
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight"
            ) {
                return;
            }


            if (!showcaseVisual) {
                return;
            }


            const rect =
                showcaseVisual
                    .getBoundingClientRect();


            const isNearViewport =
                rect.bottom > 0 &&
                rect.top <
                    window.innerHeight;


            if (!isNearViewport) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                updateSpecialization(
                    currentField - 1
                );

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                updateSpecialization(
                    currentField + 1
                );

            }

        }
    );


    /* =====================================================
       18. CURSOR TRAIL
    ====================================================== */

    function createCursorTrail() {

        if (
            !cursorTrail ||
            isTouchDevice ||
            prefersReducedMotion
        ) {
            return;
        }


        const totalCircles =
            12;


        const circles = [];


        const mouse = {

            x:
                window.innerWidth / 2,

            y:
                window.innerHeight / 2

        };


        for (
            let i = 0;
            i < totalCircles;
            i++
        ) {

            const circle =
                document.createElement(
                    "span"
                );


            circle.className =
                "cursor-trail-circle";


            const size =
                Math.max(
                    2.5,
                    9 - i * 0.55
                );


            circle.style.width =
                `${size}px`;


            circle.style.height =
                `${size}px`;


            circle.style.opacity =
                String(
                    Math.max(
                        0.08,
                        0.55 -
                        i * 0.035
                    )
                );


            cursorTrail.appendChild(
                circle
            );


            circles.push(
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


        document.addEventListener(
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


        function animateTrail() {

            let x =
                mouse.x;


            let y =
                mouse.y;


            circles.forEach(
                (
                    circle,
                    index
                ) => {

                    circle.x +=
                        (
                            x -
                            circle.x
                        ) *
                        (
                            index === 0
                                ? 0.32
                                : 0.38
                        );


                    circle.y +=
                        (
                            y -
                            circle.y
                        ) *
                        (
                            index === 0
                                ? 0.32
                                : 0.38
                        );


                    circle.element.style.transform =
                        `translate3d(
                            ${circle.x}px,
                            ${circle.y}px,
                            0
                        )
                        translate(-50%, -50%)`;


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


    createCursorTrail();


    /* =====================================================
       19. HERO TITLE ENTRANCE

       Small entrance only.
       NO MOVING MARQUEE.
    ====================================================== */

    const heroLines =
        document.querySelectorAll(
            ".hero-line"
        );


    if (
        !prefersReducedMotion &&
        heroLines.length
    ) {

        heroLines.forEach(
            (
                line,
                index
            ) => {

                line.animate(
                    [

                        {

                            opacity:
                                0,

                            transform:
                                "translateY(70px)"

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
                            1000,

                        delay:
                            120 +
                            index * 100,

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
       20. INDEX HOVER FOLLOW EFFECT

       Very small movement only.
       Keeps the design clean.
    ====================================================== */

    if (
        !isTouchDevice &&
        !prefersReducedMotion
    ) {

        fieldIndexItems.forEach(
            item => {

                item.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            item.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left;


                        const percentage =
                            x /
                            rect.width;


                        const amount =
                            (
                                percentage -
                                0.5
                            ) * 5;


                        item.style.transform =
                            `translateX(
                                ${amount}px
                            )`;

                    }
                );


                item.addEventListener(
                    "mouseleave",
                    () => {

                        item.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       21. DIRECTION CARD HOVER

       Small lift only.
    ====================================================== */

    if (
        !isTouchDevice &&
        !prefersReducedMotion
    ) {

        directionOptions.forEach(
            option => {

                option.addEventListener(
                    "mouseenter",
                    () => {

                        option.style.transform =
                            "translateY(-4px)";

                    }
                );


                option.addEventListener(
                    "mouseleave",
                    () => {

                        option.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       22. PAGE TRANSITION
    ====================================================== */

    if (
        pageTransition &&
        !prefersReducedMotion
    ) {

        pageTransition.classList.add(
            "entering"
        );


        setTimeout(
            () => {

                pageTransition.classList.remove(
                    "entering"
                );

            },
            850
        );

    }


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


                    /* SAME PAGE */

                    const destination =
                        new URL(
                            href,
                            window.location.href
                        );


                    if (
                        destination.href ===
                        window.location.href
                    ) {

                        return;

                    }


                    if (
                        prefersReducedMotion ||
                        !pageTransition
                    ) {

                        return;

                    }


                    event.preventDefault();


                    pageTransition.classList.remove(
                        "entering"
                    );


                    pageTransition.classList.add(
                        "leaving"
                    );


                    setTimeout(
                        () => {

                            window.location.href =
                                href;

                        },
                        650
                    );

                }
            );

        }
    );


    /* =====================================================
       23. INITIALIZE FIRST SPECIALIZATION

       This guarantees the HTML and JS are synced.
    ====================================================== */

    function initializeSpecialization() {

        const field =
            specializations[0];


        currentField =
            0;


        if (showcaseCounter) {

            showcaseCounter.textContent =
                `01 / ${String(
                    specializations.length
                ).padStart(2, "0")}`;

        }


        if (showcaseCategory) {

            showcaseCategory.textContent =
                field.category;

        }


        if (visualNumber) {

            visualNumber.textContent =
                field.number;

        }


        if (fieldTitle) {

            fieldTitle.innerHTML =
                field.title;

        }


        if (fieldDescription) {

            fieldDescription.textContent =
                field.description;

        }


        if (primaryImage) {

            primaryImage.src =
                field.image;


            primaryImage.alt =
                field.imageAlt;

        }


        if (secondaryImage) {

            secondaryImage.src =
                field.hoverImage;


            secondaryImage.alt =
                `${field.imageAlt} application`;

        }


        renderApplications(
            field.applications
        );


        renderCareers(
            field.careers
        );


        updateActiveIndex();

    }


    initializeSpecialization();


});