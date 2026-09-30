/* =========================================================
   CAREERS PAGE
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

    const pageTransition =
        document.getElementById("pageTransition");

    const navLogoImage =
        document.querySelector(".nav-logo-image");

    const exploreCareers =
        document.getElementById("exploreCareers");

    const careersSection =
        document.getElementById("careers");

    const careerGrid =
        document.getElementById("careerGrid");


    /* =====================================================
       02. CAREER DATA
    ====================================================== */

    const careers = [

        {
            number: "01",
            category: "CORE CPE",
            title: "Computer Engineer",
            role: "Computer Engineering",
            focus: "Hardware / Software / Systems",
            image: "assets/careers/computer-engineer.jpg",
            short:
                "Designs and develops integrated computer hardware and software systems.",
            description:
                "Designs, develops, tests, and maintains computer systems by combining hardware and software technologies."
        },

        {
            number: "02",
            category: "EMBEDDED",
            title: "Embedded Systems Engineer",
            role: "Embedded Systems",
            focus: "Hardware / Firmware / Microcontrollers",
            image: "assets/careers/embedded-systems.jpg",
            short:
                "Creates dedicated computing systems for smart devices and machines.",
            description:
                "Develops dedicated computing systems for devices such as smart appliances, industrial machines, medical equipment, and automotive systems."
        },

        {
            number: "03",
            category: "IOT",
            title: "IoT Engineer",
            role: "Internet of Things",
            focus: "Devices / Sensors / Connectivity",
            image: "assets/careers/iot-engineer.jpg",
            short:
                "Builds connected devices that communicate and exchange real-world data.",
            description:
                "Builds connected devices and systems that collect, transmit, and process real-world information through networks and the Internet."
        },

        {
            number: "04",
            category: "SOFTWARE",
            title: "Software Engineer",
            role: "Software Engineering",
            focus: "Programming / Applications / Systems",
            image: "assets/careers/software-engineer.jpg",
            short:
                "Develops applications, platforms, and software-based computing solutions.",
            description:
                "Designs and develops software applications, platforms, and computing systems using programming and software engineering principles."
        },

        {
            number: "05",
            category: "HARDWARE",
            title: "Hardware Engineer",
            role: "Computer Hardware",
            focus: "Electronics / Circuits / Computer Systems",
            image: "assets/careers/hardware-engineer.jpg",
            short:
                "Designs and tests electronic components and computer hardware.",
            description:
                "Designs and tests electronic components and computer hardware such as processors, circuit boards, and digital systems."
        },

        {
            number: "06",
            category: "NETWORKS",
            title: "Network Engineer",
            role: "Computer Networks",
            focus: "Infrastructure / Routing / Connectivity",
            image: "assets/careers/network-engineer.jpg",
            short:
                "Builds and maintains reliable communication and network infrastructures.",
            description:
                "Designs, configures, maintains, and troubleshoots network infrastructure to provide reliable communication between devices and systems."
        },

        {
            number: "07",
            category: "SECURITY",
            title: "Cybersecurity Engineer",
            role: "Cybersecurity",
            focus: "Security / Networks / Systems",
            image: "assets/careers/cybersecurity.jpg",
            short:
                "Protects systems, networks, and information against digital threats.",
            description:
                "Protects computer systems, networks, applications, and digital information from security threats and unauthorized access."
        },

        {
            number: "08",
            category: "AI / ML",
            title: "AI / Machine Learning Engineer",
            role: "Artificial Intelligence",
            focus: "AI / Machine Learning / Data",
            image: "assets/careers/ai-engineer.jpg",
            short:
                "Develops intelligent systems that learn from data and recognize patterns.",
            description:
                "Develops intelligent systems and machine learning models that use data to recognize patterns and support automated decision-making."
        },

        {
            number: "09",
            category: "ROBOTICS",
            title: "Robotics Engineer",
            role: "Robotics",
            focus: "Automation / Sensors / Control",
            image: "assets/careers/robotics-engineer.jpg",
            short:
                "Combines electronics, programming, sensors, and control to build robots.",
            description:
                "Designs robotic systems by combining electronics, programming, sensors, control systems, and automation technologies."
        },

        {
            number: "10",
            category: "DATA",
            title: "Data Analyst",
            role: "Data Analytics",
            focus: "Data / Analysis / Insights",
            image: "assets/careers/data-analyst.jpg",
            short:
                "Transforms raw data into useful information and meaningful insights.",
            description:
                "Collects, organizes, analyzes, and interprets data to discover patterns and provide useful information for decision-making."
        },

        {
            number: "11",
            category: "QUALITY",
            title: "Quality Assurance Engineer",
            role: "Quality Assurance",
            focus: "Testing / Validation / Quality",
            image: "assets/careers/qa-engineer.jpg",
            short:
                "Tests systems and software to maintain reliability and product quality.",
            description:
                "Tests software and technology systems to identify problems and ensure products meet expected performance and quality standards."
        },

        {
            number: "12",
            category: "CLOUD",
            title: "Cloud Engineer",
            role: "Cloud Computing",
            focus: "Cloud / Infrastructure / Services",
            image: "assets/careers/cloud-engineer.jpg",
            short:
                "Develops and maintains scalable cloud infrastructure and computing services.",
            description:
                "Builds and manages cloud infrastructure, applications, storage systems, and scalable computing services."
        },

        {
            number: "13",
            category: "SYSTEMS",
            title: "Systems Engineer",
            role: "Systems Engineering",
            focus: "Integration / Infrastructure / Systems",
            image: "assets/careers/systems-engineer.jpg",
            short:
                "Integrates hardware, software, networks, and services into complete systems.",
            description:
                "Integrates hardware, software, networks, and services so that complex computing systems operate effectively together."
        },

        {
            number: "14",
            category: "AUTOMATION",
            title: "Automation Engineer",
            role: "Automation and Control",
            focus: "Control / Sensors / Automation",
            image: "assets/careers/automation-engineer.jpg",
            short:
                "Creates automated systems using sensors, controllers, and software.",
            description:
                "Develops automated systems using controllers, sensors, software, and intelligent technologies to improve technical processes."
        },

        {
            number: "15",
            category: "RESEARCH",
            title: "Research & Development Engineer",
            role: "Research and Development",
            focus: "Research / Prototyping / Innovation",
            image: "assets/careers/research-development.jpg",
            short:
                "Researches and prototypes new technologies and engineering solutions.",
            description:
                "Researches, prototypes, and develops new technologies and engineering solutions in computing, electronics, AI, robotics, and related fields."
        }

    ];


    let currentCareer =
        0;

    let viewerChanging =
        false;


    /* =====================================================
       03. CREATE CAREER CARDS
    ====================================================== */

    function createCareerCards() {

        if (!careerGrid) {
            return;
        }


        careerGrid.innerHTML =
            "";


        careers.forEach(
            (career, index) => {

                const card =
                    document.createElement(
                        "button"
                    );


                card.type =
                    "button";

                card.className =
                    "career-card reveal";

                card.dataset.career =
                    index;


                card.style.setProperty(
                    "--career-image",
                    `url("${career.image}")`
                );


                card.innerHTML = `

                    <span class="card-number">
                        ${career.number}
                    </span>

                    <span class="card-category">
                        ${career.category}
                    </span>

                    <div class="card-content">

                        <h3>
                            ${career.title}
                        </h3>

                        <p>
                            ${career.short}
                        </p>

                    </div>

                    <span class="card-arrow">
                        ↗
                    </span>

                `;


                card.addEventListener(
                    "click",
                    () => {

                        openCareer(
                            index
                        );
                    }
                );


                careerGrid.appendChild(
                    card
                );
            }
        );
    }


    createCareerCards();


    /* =====================================================
       04. VIEWER ELEMENTS
    ====================================================== */

    const careerViewer =
        document.getElementById(
            "careerViewer"
        );

    const careerBackdrop =
        document.getElementById(
            "careerBackdrop"
        );

    const viewerClose =
        document.getElementById(
            "viewerClose"
        );

    const viewerCounter =
        document.getElementById(
            "viewerCounter"
        );

    const viewerNumber =
        document.getElementById(
            "viewerNumber"
        );

    const viewerCategory =
        document.getElementById(
            "viewerCategory"
        );

    const viewerImage =
        document.getElementById(
            "viewerImage"
        );

    const viewerTitle =
        document.getElementById(
            "viewerTitle"
        );

    const viewerRole =
        document.getElementById(
            "viewerRole"
        );

    const viewerFocus =
        document.getElementById(
            "viewerFocus"
        );

    const viewerDescription =
        document.getElementById(
            "viewerDescription"
        );

    const previousCareer =
        document.getElementById(
            "previousCareer"
        );

    const nextCareer =
        document.getElementById(
            "nextCareer"
        );

    const previousCareerName =
        document.getElementById(
            "previousCareerName"
        );

    const nextCareerName =
        document.getElementById(
            "nextCareerName"
        );


    /* =====================================================
       05. THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem(
            "cpe-theme"
        ) || "light";


    root.dataset.theme =
        savedTheme;


    function updateLogo(theme) {

        if (!navLogoImage) {
            return;
        }


        navLogoImage.src =
            theme === "dark"
                ? "assets/light.png"
                : "assets/dark.png";
    }


    updateLogo(
        savedTheme
    );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const newTheme =
                    root.dataset.theme ===
                    "dark"
                        ? "light"
                        : "dark";


                root.dataset.theme =
                    newTheme;


                localStorage.setItem(
                    "cpe-theme",
                    newTheme
                );


                updateLogo(
                    newTheme
                );


                if (
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                ) {

                    body.animate(
                        [
                            {
                                opacity:
                                    .88
                            },

                            {
                                opacity:
                                    1
                            }
                        ],
                        {
                            duration:
                                380,

                            easing:
                                "ease-out"
                        }
                    );
                }
            }
        );
    }


    /* =====================================================
       06. CLOCK
    ====================================================== */

    function updateClock() {

        if (!clock) {
            return;
        }


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
            ).format(
                new Date()
            );


        clock.textContent =
            `MANILA ${time}`;
    }


    updateClock();


    setInterval(
        updateClock,
        1000
    );


    /* =====================================================
       07. PAGE INTRO
    ====================================================== */

    if (pageTransition) {

        pageTransition.classList.add(
            "page-enter"
        );


        setTimeout(
            () => {

                pageTransition.classList.remove(
                    "page-enter"
                );
            },
            950
        );
    }


    requestAnimationFrame(
        () => {

            requestAnimationFrame(
                () => {

                    body.classList.add(
                        "loaded"
                    );
                }
            );
        }
    );


    /* =====================================================
       08. EXPLORE BUTTON
    ====================================================== */

    if (
        exploreCareers &&
        careersSection
    ) {

        exploreCareers.addEventListener(
            "click",
            () => {

                careersSection.scrollIntoView({
                    behavior:
                        "smooth",

                    block:
                        "start"
                });
            }
        );
    }


    /* =====================================================
       09. SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );
                    }
                );
            },
            {
                threshold:
                    .08,

                rootMargin:
                    "0px 0px -35px 0px"
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );
        }
    );


    /* =====================================================
       10. RENDER VIEWER
    ====================================================== */

    function renderCareer(index) {

        currentCareer =
            (
                index +
                careers.length
            ) %
            careers.length;


        const career =
            careers[
                currentCareer
            ];


        const previousIndex =
            (
                currentCareer -
                1 +
                careers.length
            ) %
            careers.length;


        const nextIndex =
            (
                currentCareer +
                1
            ) %
            careers.length;


        viewerNumber.textContent =
            `CAREER / ${career.number}`;


        viewerCounter.textContent =
            `${career.number} / ${careers.length}`;


        viewerCategory.textContent =
            career.category;


        viewerTitle.textContent =
            career.title;


        viewerRole.textContent =
            career.role;


        viewerFocus.textContent =
            career.focus;


        viewerDescription.textContent =
            career.description;


        viewerImage.src =
            career.image;


        viewerImage.alt =
            career.title;


        previousCareerName.textContent =
            careers[
                previousIndex
            ].title;


        nextCareerName.textContent =
            careers[
                nextIndex
            ].title;
    }


    /* =====================================================
       11. OPEN CAREER
    ====================================================== */

    function openCareer(index) {

        renderCareer(
            index
        );


        careerViewer.classList.remove(
            "closing"
        );


        careerViewer.classList.add(
            "open"
        );


        careerViewer.setAttribute(
            "aria-hidden",
            "false"
        );


        body.classList.add(
            "viewer-open"
        );


        requestAnimationFrame(
            () => {

                viewerImage.animate(
                    [
                        {
                            opacity:
                                0,

                            transform:
                                "scale(1.08)"
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
                            750,

                        easing:
                            "cubic-bezier(.16,1,.3,1)"
                    }
                );


                viewerTitle.animate(
                    [
                        {
                            opacity:
                                0,

                            transform:
                                "translateY(28px)"
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
                            100,

                        fill:
                            "both",

                        easing:
                            "cubic-bezier(.16,1,.3,1)"
                    }
                );
            }
        );
    }


    /* =====================================================
       12. CLOSE MODAL
       NEWS / ANNOUNCEMENT STYLE
    ====================================================== */

    function closeViewer() {

        if (
            !careerViewer.classList.contains(
                "open"
            )
        ) {
            return;
        }


        careerViewer.classList.add(
            "closing"
        );


        setTimeout(
            () => {

                careerViewer.classList.remove(
                    "open"
                );

                careerViewer.classList.remove(
                    "closing"
                );


                careerViewer.setAttribute(
                    "aria-hidden",
                    "true"
                );


                body.classList.remove(
                    "viewer-open"
                );

            },
            380
        );
    }


    viewerClose.addEventListener(
        "click",
        closeViewer
    );


    careerBackdrop.addEventListener(
        "click",
        closeViewer
    );


    /* =====================================================
       13. CHANGE CAREER
    ====================================================== */

    function changeCareer(direction) {

        if (viewerChanging) {
            return;
        }


        viewerChanging =
            true;


        const nextIndex =
            (
                currentCareer +
                direction +
                careers.length
            ) %
            careers.length;


        const exitX =
            direction > 0
                ? -40
                : 40;


        const enterX =
            direction > 0
                ? 40
                : -40;


        const imageExit =
            viewerImage.animate(
                [
                    {
                        opacity:
                            1,

                        transform:
                            "translateX(0) scale(1)"
                    },

                    {
                        opacity:
                            0,

                        transform:
                            `translateX(${exitX}px) scale(1.03)`
                    }
                ],
                {
                    duration:
                        240,

                    fill:
                        "forwards",

                    easing:
                        "ease-in"
                }
            );


        viewerTitle.animate(
            [
                {
                    opacity:
                        1,

                    transform:
                        "translateX(0)"
                },

                {
                    opacity:
                        0,

                    transform:
                        `translateX(${exitX}px)`
                }
            ],
            {
                duration:
                    220,

                fill:
                    "forwards"
            }
        );


        imageExit.onfinish =
            () => {

                renderCareer(
                    nextIndex
                );


                viewerImage.animate(
                    [
                        {
                            opacity:
                                0,

                            transform:
                                `translateX(${enterX}px) scale(1.03)`
                        },

                        {
                            opacity:
                                1,

                            transform:
                                "translateX(0) scale(1)"
                        }
                    ],
                    {
                        duration:
                            520,

                        fill:
                            "both",

                        easing:
                            "cubic-bezier(.16,1,.3,1)"
                    }
                );


                viewerTitle.animate(
                    [
                        {
                            opacity:
                                0,

                            transform:
                                `translateX(${enterX}px)`
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
                            480,

                        fill:
                            "both",

                        easing:
                            "cubic-bezier(.16,1,.3,1)"
                    }
                );


                setTimeout(
                    () => {

                        viewerChanging =
                            false;
                    },
                    520
                );
            };
    }


    previousCareer.addEventListener(
        "click",
        () => {

            changeCareer(
                -1
            );
        }
    );


    nextCareer.addEventListener(
        "click",
        () => {

            changeCareer(
                1
            );
        }
    );


    /* =====================================================
       14. KEYBOARD
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !careerViewer.classList.contains(
                    "open"
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
                "ArrowLeft"
            ) {

                changeCareer(
                    -1
                );
            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                changeCareer(
                    1
                );
            }
        }
    );


    /* =====================================================
       15. PAGE LINKS
    ====================================================== */

    const pageLinks =
        document.querySelectorAll(
            ".page-link"
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
                        destination.startsWith(
                            "#"
                        ) ||
                        destination.startsWith(
                            "http"
                        )
                    ) {
                        return;
                    }


                    event.preventDefault();


                    if (!pageTransition) {

                        window.location.href =
                            destination;

                        return;
                    }


                    pageTransition.classList.remove(
                        "page-enter"
                    );


                    pageTransition.classList.add(
                        "page-exit"
                    );


                    setTimeout(
                        () => {

                            window.location.href =
                                destination;
                        },
                        650
                    );
                }
            );
        }
    );


    /* =====================================================
       16. BACK BUTTON FIX
    ====================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            body.classList.add(
                "loaded"
            );


            if (pageTransition) {

                pageTransition.classList.remove(
                    "page-exit"
                );
            }
        }
    );


    /* =====================================================
       17. CURSOR TRAIL
       SAME BEHAVIOR AS FACULTY / INDEX
    ====================================================== */

    const supportsMouse =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (supportsMouse) {

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


        /* CURSOR COLOR */

        function updateCursorColor() {

            const color =
                root.dataset.theme ===
                "dark"
                    ? "#fffaf0"
                    : "#071f3f";


            circles.forEach(
                circle => {

                    circle.element.style.background =
                        color;
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


        /* MOUSE */

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


        /* ANIMATION */

        function animateCursorTrail() {

            let x =
                mouseX;

            let y =
                mouseY;


            circles.forEach(
                (circle, index) => {

                    circle.x +=
                        (
                            x -
                            circle.x
                        ) * .32;


                    circle.y +=
                        (
                            y -
                            circle.y
                        ) * .32;


                    const scale =
                        1 -
                        (
                            index /
                            circles.length
                        ) * .65;


                    const opacity =
                        mouseActive
                            ? .34 *
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