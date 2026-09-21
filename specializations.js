/* =========================================================
   SPECIALIZATIONS PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           SPECIALIZATION DATA
        ================================================= */

        const fields = [

            {
                title:
                    "EMBEDDED<br>SYSTEMS",

                category:
                    "HARDWARE + SOFTWARE",

                description:
                    "Focuses on designing computer systems built into electronic devices to perform dedicated functions.",

                applications: [
                    "Automotive Control Systems",
                    "Medical Devices",
                    "Smart Appliances",
                    "Drones"
                ],

                careers: [
                    "Embedded Systems Engineer",
                    "Firmware Engineer",
                    "Hardware Engineer"
                ],

                image:
                    "assets/specialization-embedded.jpg",

                image2:
                    "assets/specialization-embedded-2.jpg"
            },


            {
                title:
                    "INTERNET OF<br>THINGS",

                category:
                    "CONNECTED SYSTEMS",

                description:
                    "Connects physical devices to the internet, allowing them to collect and exchange data automatically.",

                applications: [
                    "Smart Homes",
                    "Wearable Devices",
                    "Smart Agriculture",
                    "Industrial Monitoring"
                ],

                careers: [
                    "IoT Engineer",
                    "Systems Engineer",
                    "IoT Solutions Developer"
                ],

                image:
                    "assets/specialization-iot.jpg",

                image2:
                    "assets/specialization-iot-2.jpg"
            },


            {
                title:
                    "COMPUTER<br>NETWORKS",

                category:
                    "CONNECTIVITY",

                description:
                    "Designs, builds, and manages communication networks that connect computers and devices.",

                applications: [
                    "LAN / WAN",
                    "Cloud Networking",
                    "Enterprise Networks",
                    "Wireless Communication"
                ],

                careers: [
                    "Network Engineer",
                    "Network Administrator",
                    "Systems Engineer"
                ],

                image:
                    "assets/specialization-networks.jpg",

                image2:
                    "assets/specialization-networks-2.jpg"
            },


            {
                title:
                    "CYBERSECURITY",

                category:
                    "DIGITAL SECURITY",

                description:
                    "Protects computer systems, networks, and data from cyber threats and unauthorized access.",

                applications: [
                    "Firewalls",
                    "Encryption",
                    "Ethical Hacking",
                    "Digital Forensics"
                ],

                careers: [
                    "Cybersecurity Analyst",
                    "Security Engineer",
                    "Penetration Tester"
                ],

                image:
                    "assets/specialization-cybersecurity.jpg",

                image2:
                    "assets/specialization-cybersecurity-2.jpg"
            },


            {
                title:
                    "SOFTWARE<br>DEVELOPMENT",

                category:
                    "SOFTWARE",

                description:
                    "Develops software applications and system software to solve real-world problems.",

                applications: [
                    "Mobile Apps",
                    "Desktop Software",
                    "Web Applications",
                    "Enterprise Systems"
                ],

                careers: [
                    "Software Engineer",
                    "Application Developer",
                    "Full-Stack Developer"
                ],

                image:
                    "assets/specialization-software.jpg",

                image2:
                    "assets/specialization-software-2.jpg"
            },


            {
                title:
                    "AI & MACHINE<br>LEARNING",

                category:
                    "INTELLIGENT SYSTEMS",

                description:
                    "Creates intelligent systems that can learn from data, recognize patterns, and make decisions.",

                applications: [
                    "Chatbots",
                    "Facial Recognition",
                    "Recommendation Systems",
                    "Autonomous Vehicles"
                ],

                careers: [
                    "AI Engineer",
                    "Machine Learning Engineer",
                    "AI Researcher"
                ],

                image:
                    "assets/specialization-ai.jpg",

                image2:
                    "assets/specialization-ai-2.jpg"
            },


            {
                title:
                    "DATA SCIENCE &<br>DATA ENGINEERING",

                category:
                    "DATA",

                description:
                    "Collects, processes, stores, and analyzes large amounts of data to support decision-making.",

                applications: [
                    "Business Analytics",
                    "Healthcare Analytics",
                    "Financial Forecasting",
                    "Big Data Platforms"
                ],

                careers: [
                    "Data Engineer",
                    "Data Scientist",
                    "Business Intelligence Engineer"
                ],

                image:
                    "assets/specialization-data.jpg",

                image2:
                    "assets/specialization-data-2.jpg"
            },


            {
                title:
                    "ROBOTICS &<br>AUTOMATION",

                category:
                    "AUTOMATION",

                description:
                    "Designs robots and automated systems that perform tasks with minimal human intervention.",

                applications: [
                    "Manufacturing Robots",
                    "Warehouse Automation",
                    "Medical Robots",
                    "Autonomous Drones"
                ],

                careers: [
                    "Robotics Engineer",
                    "Automation Engineer",
                    "Control Systems Engineer"
                ],

                image:
                    "assets/specialization-robotics.jpg",

                image2:
                    "assets/specialization-robotics-2.jpg"
            },


            {
                title:
                    "COMPUTER HARDWARE<br>& ARCHITECTURE",

                category:
                    "COMPUTER HARDWARE",

                description:
                    "Focuses on designing, testing, and improving computer hardware and processor architecture.",

                applications: [
                    "CPUs",
                    "GPUs",
                    "Motherboards",
                    "Memory Systems",
                    "High-Performance Computers"
                ],

                careers: [
                    "Hardware Engineer",
                    "Computer Architect",
                    "Electronics Engineer"
                ],

                image:
                    "assets/specialization-hardware.jpg",

                image2:
                    "assets/specialization-hardware-2.jpg"
            },


            {
                title:
                    "CLOUD & EDGE<br>COMPUTING",

                category:
                    "DISTRIBUTED COMPUTING",

                description:
                    "Develops systems that process and store data through cloud platforms and edge devices for faster and more efficient computing.",

                applications: [
                    "Cloud Services",
                    "Edge AI",
                    "Online Storage",
                    "Content Delivery Networks (CDNs)"
                ],

                careers: [
                    "Cloud Engineer",
                    "Cloud Solutions Architect",
                    "Edge Computing Engineer"
                ],

                image:
                    "assets/specialization-cloud.jpg",

                image2:
                    "assets/specialization-cloud-2.jpg"
            }

        ];


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


        const showcaseVisual =
            document.getElementById(
                "showcaseVisual"
            );

        const showcaseContent =
            document.getElementById(
                "showcaseContent"
            );


        const primaryImage =
            document.getElementById(
                "primaryImage"
            );

        const secondaryImage =
            document.getElementById(
                "secondaryImage"
            );


        const showcaseCounter =
            document.getElementById(
                "showcaseCounter"
            );

        const showcaseCategory =
            document.getElementById(
                "showcaseCategory"
            );

        const visualNumber =
            document.getElementById(
                "visualNumber"
            );

        const fieldTitle =
            document.getElementById(
                "fieldTitle"
            );

        const fieldDescription =
            document.getElementById(
                "fieldDescription"
            );

        const applicationTags =
            document.getElementById(
                "applicationTags"
            );

        const careerList =
            document.getElementById(
                "careerList"
            );


        const previousField =
            document.getElementById(
                "previousField"
            );

        const nextField =
            document.getElementById(
                "nextField"
            );


        const indexItems =
            document.querySelectorAll(
                ".field-index-item"
            );


        let activeIndex =
            0;

        let changing =
            false;


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
            170
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
           EXPLORE BUTTON
        ================================================= */

        if (exploreButton) {

            exploreButton.addEventListener(
                "click",
                function () {

                    const section =
                        document.getElementById(
                            "specializationShowcase"
                        );


                    if (section) {

                        section.scrollIntoView(
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
           REVEAL
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
           CREATE TAGS
        ================================================= */

        function createApplications(
            applications
        ) {

            if (!applicationTags) {
                return;
            }


            applicationTags.innerHTML =
                "";


            applications.forEach(
                function (application) {

                    const span =
                        document.createElement(
                            "span"
                        );


                    span.textContent =
                        application;


                    applicationTags
                        .appendChild(
                            span
                        );

                }
            );
        }


        /* =================================================
           CREATE CAREERS
        ================================================= */

        function createCareers(
            careers
        ) {

            if (!careerList) {
                return;
            }


            careerList.innerHTML =
                "";


            careers.forEach(
                function (career) {

                    const span =
                        document.createElement(
                            "span"
                        );


                    span.textContent =
                        career;


                    careerList
                        .appendChild(
                            span
                        );

                }
            );
        }


        /* =================================================
           UPDATE ACTIVE INDEX
        ================================================= */

        function updateIndexNavigation() {

            indexItems.forEach(
                function (
                    item,
                    index
                ) {

                    item.classList.toggle(
                        "active",
                        index === activeIndex
                    );

                }
            );
        }


        /* =================================================
           UPDATE FIELD
        ================================================= */

        function updateField(
            newIndex
        ) {

            if (
                changing ||
                newIndex === activeIndex
            ) {

                return;
            }


            changing =
                true;


            const field =
                fields[
                    newIndex
                ];


            if (showcaseVisual) {

                showcaseVisual
                    .classList
                    .remove(
                        "touch-reveal"
                    );


                showcaseVisual
                    .classList
                    .add(
                        "switching"
                    );
            }


            if (showcaseContent) {

                showcaseContent
                    .classList
                    .add(
                        "changing"
                    );
            }


            setTimeout(
                function () {

                    activeIndex =
                        newIndex;


                    const number =
                        String(
                            activeIndex + 1
                        ).padStart(
                            2,
                            "0"
                        );


                    if (primaryImage) {

                        primaryImage.src =
                            field.image;


                        primaryImage.alt =
                            field.title
                                .replace(
                                    /<br>/g,
                                    " "
                                );
                    }


                    if (secondaryImage) {

                        secondaryImage.src =
                            field.image2;


                        secondaryImage.alt =
                            field.title
                                .replace(
                                    /<br>/g,
                                    " "
                                ) +
                            " application";
                    }


                    if (showcaseCounter) {

                        showcaseCounter
                            .textContent =
                            number +
                            " / " +
                            String(
                                fields.length
                            ).padStart(
                                2,
                                "0"
                            );
                    }


                    if (showcaseCategory) {

                        showcaseCategory
                            .textContent =
                            field.category;
                    }


                    if (visualNumber) {

                        visualNumber
                            .textContent =
                            number;
                    }


                    if (fieldTitle) {

                        fieldTitle
                            .innerHTML =
                            field.title;
                    }


                    if (fieldDescription) {

                        fieldDescription
                            .textContent =
                            field.description;
                    }


                    createApplications(
                        field.applications
                    );


                    createCareers(
                        field.careers
                    );


                    const label =
                        showcaseContent
                            ? showcaseContent
                                .querySelector(
                                    ".showcase-field-label"
                                )
                            : null;


                    if (label) {

                        label.textContent =
                            "FIELD / " +
                            number;
                    }


                    updateIndexNavigation();


                    if (showcaseVisual) {

                        showcaseVisual
                            .classList
                            .remove(
                                "switching"
                            );
                    }


                    if (showcaseContent) {

                        showcaseContent
                            .classList
                            .remove(
                                "changing"
                            );
                    }


                    setTimeout(
                        function () {

                            changing =
                                false;

                        },
                        350
                    );

                },
                430
            );

        }


        /* =================================================
           NEXT FIELD
        ================================================= */

        function goNext() {

            if (changing) {
                return;
            }


            const newIndex =
                (
                    activeIndex + 1
                ) %
                fields.length;


            updateField(
                newIndex
            );
        }


        /* =================================================
           PREVIOUS FIELD
        ================================================= */

        function goPrevious() {

            if (changing) {
                return;
            }


            const newIndex =
                (
                    activeIndex -
                    1 +
                    fields.length
                ) %
                fields.length;


            updateField(
                newIndex
            );
        }


        if (nextField) {

            nextField.addEventListener(
                "click",
                goNext
            );
        }


        if (previousField) {

            previousField.addEventListener(
                "click",
                goPrevious
            );
        }


        /* =================================================
           INDEX CLICK
        ================================================= */

        indexItems.forEach(
            function (
                item,
                index
            ) {

                item.addEventListener(
                    "click",
                    function () {

                        if (
                            index ===
                            activeIndex
                        ) {

                            const showcase =
                                document.querySelector(
                                    ".showcase-section"
                                );


                            if (showcase) {

                                showcase
                                    .scrollIntoView(
                                        {
                                            behavior:
                                                "smooth",

                                            block:
                                                "start"
                                        }
                                    );

                            }


                            return;
                        }


                        updateField(
                            index
                        );


                        setTimeout(
                            function () {

                                const showcase =
                                    document.querySelector(
                                        ".showcase-section"
                                    );


                                if (showcase) {

                                    showcase
                                        .scrollIntoView(
                                            {
                                                behavior:
                                                    "smooth",

                                                block:
                                                    "start"
                                            }
                                        );

                                }

                            },
                            150
                        );

                    }
                );

            }
        );


        /* =================================================
           TOUCH IMAGE REVEAL
        ================================================= */

        if (showcaseVisual) {

            showcaseVisual.addEventListener(
                "click",
                function (event) {

                    if (
                        window.matchMedia(
                            "(hover: none)"
                        ).matches
                    ) {

                        event.preventDefault();


                        showcaseVisual
                            .classList
                            .toggle(
                                "touch-reveal"
                            );

                    }

                }
            );
        }


        /* =================================================
           SWIPE BETWEEN SPECIALIZATIONS
        ================================================= */

        let touchStartX =
            0;

        let touchEndX =
            0;


        if (showcaseVisual) {

            showcaseVisual.addEventListener(
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


            showcaseVisual.addEventListener(
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
                        ) < 75
                    ) {

                        return;
                    }


                    if (
                        distance < 0
                    ) {

                        goNext();

                    } else {

                        goPrevious();

                    }

                },
                {
                    passive: true
                }
            );
        }


        /* =================================================
           KEYBOARD CONTROLS
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                const showcase =
                    document.querySelector(
                        ".showcase-section"
                    );


                if (!showcase) {
                    return;
                }


                const rect =
                    showcase
                        .getBoundingClientRect();


                const visible =
                    rect.top <
                    window.innerHeight &&
                    rect.bottom > 0;


                if (!visible) {
                    return;
                }


                if (
                    event.key ===
                    "ArrowRight"
                ) {

                    goNext();
                }


                if (
                    event.key ===
                    "ArrowLeft"
                ) {

                    goPrevious();
                }

            }
        );


        /* =================================================
           DIRECTION BUTTONS
        ================================================= */

        const directionOptions =
            document.querySelectorAll(
                ".direction-option"
            );


        directionOptions.forEach(
            function (option) {

                option.addEventListener(
                    "click",
                    function () {

                        const indexes =
                            option
                                .dataset
                                .fields
                                .split(",")
                                .map(
                                    Number
                                );


                        const firstField =
                            indexes[0];


                        if (
                            firstField !==
                            activeIndex
                        ) {

                            updateField(
                                firstField
                            );
                        }


                        setTimeout(
                            function () {

                                const showcase =
                                    document.querySelector(
                                        ".showcase-section"
                                    );


                                if (showcase) {

                                    showcase
                                        .scrollIntoView(
                                            {
                                                behavior:
                                                    "smooth",

                                                block:
                                                    "start"
                                            }
                                        );

                                }

                            },
                            180
                        );

                    }
                );


                option.addEventListener(
                    "mouseenter",
                    function () {

                        const indexes =
                            option
                                .dataset
                                .fields
                                .split(",")
                                .map(
                                    Number
                                );


                        indexItems.forEach(
                            function (
                                item,
                                index
                            ) {

                                if (
                                    indexes.includes(
                                        index
                                    )
                                ) {

                                    item.style.opacity =
                                        "1";

                                }

                            }
                        );

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
                    document.createElement(
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


                if (pageTransition) {

                    pageTransition
                        .classList
                        .remove(
                            "entering",
                            "leaving"
                        );
                }


                revealElements.forEach(
                    function (element) {

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