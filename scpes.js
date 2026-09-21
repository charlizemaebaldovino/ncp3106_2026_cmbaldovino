/* =========================================================
   SCPES PAGE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           BASIC ELEMENTS
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
           EXPLORE
        ================================================= */

        if (exploreButton) {

            exploreButton.addEventListener(
                "click",
                function () {

                    const about =
                        document.getElementById(
                            "about"
                        );


                    if (about) {

                        about.scrollIntoView(
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
           OFFICER DATA
        ================================================= */

        const officers = [

            {
                name:
                    "CHARLIZE MAE S. BALDOVINO",

                position:
                    "PRESIDENT",

                image:
                    "assets/officer-charlize-baldovino.jpg",

                description:
                    "Leads SCPES and works with the executive officers in coordinating the organization's programs, activities, projects, and student initiatives."
            },


            {
                name:
                    "JAWAD HADJI CASSAN M. MACAWADIB",

                position:
                    "VICE PRESIDENT FOR INTERNAL AFFAIRS",

                image:
                    "assets/officer-jawad-macawadib.jpg",

                description:
                    "Supports the organization's internal coordination and helps strengthen communication and collaboration among SCPES officers and members."
            },


            {
                name:
                    "JOSHUA R. MADRIAGA",

                position:
                    "VICE PRESIDENT FOR EXTERNAL AFFAIRS",

                image:
                    "assets/officer-joshua-madriaga.jpg",

                description:
                    "Supports external coordination and helps SCPES connect with groups and opportunities beyond its internal student community."
            },


            {
                name:
                    "GHENNY MAE A. MANABAT",

                position:
                    "VICE PRESIDENT FOR SECRETARIAT",

                image:
                    "assets/officer-ghenny-manabat.jpg",

                description:
                    "Supports organizational documentation, records, communication, and administrative coordination."
            },


            {
                name:
                    "JESSICA P. APOSTOL",

                position:
                    "VICE PRESIDENT FOR BUSINESS & FINANCE",

                image:
                    "assets/officer-jessica-apostol.jpg",

                description:
                    "Supports financial organization, budgeting, and business-related activities for SCPES projects and events."
            },


            {
                name:
                    "JOSHUA C. PURIFICACION",

                position:
                    "VICE PRESIDENT FOR CAREER DEVELOPMENT",

                image:
                    "assets/officer-joshua-purificacion.jpg",

                description:
                    "Supports programs that encourage career awareness, professional development, and learning opportunities for Computer Engineering students."
            },


            {
                name:
                    "ROSELLE GABRIELLE J. LANDAYAN",

                position:
                    "VICE PRESIDENT FOR EVENTS & PROGRAMS",

                image:
                    "assets/officer-roselle-landayan.jpg",

                description:
                    "Supports the planning and coordination of SCPES activities, programs, and student-centered events."
            },


            {
                name:
                    "EARL DUNCAN C. LORENZO",

                position:
                    "VICE PRESIDENT FOR OUTREACH & SOCIAL RESPONSIBILITY",

                image:
                    "assets/officer-earl-lorenzo.jpg",

                description:
                    "Supports outreach, community engagement, and socially responsible projects and initiatives."
            },


            {
                name:
                    "KRISELDA MEI G. RUPERA",

                position:
                    "VICE PRESIDENT FOR TECHNICAL OPERATIONS",

                image:
                    "assets/officer-kriselda-rupera.jpg",

                description:
                    "Supports technical requirements and operations involved in SCPES programs, projects, and activities."
            },


            {
                name:
                    "JIAN MIEL M. CRUZ",

                position:
                    "VICE PRESIDENT FOR CREATIVES & COMMUNICATIONS",

                image:
                    "assets/officer-jian-cruz.jpg",

                description:
                    "Supports the visual identity, creative materials, and communication needs of SCPES."
            },


            {
                name:
                    "JOEZER C. CORNITA",

                position:
                    "VICE PRESIDENT FOR MEDIA",

                image:
                    "assets/officer-joezer-cornita.jpg",

                description:
                    "Supports media coverage and helps document SCPES events, activities, and student experiences."
            },


            {
                name:
                    "BENCH CALVIN PAED",

                position:
                    "VICE PRESIDENT FOR LOGISTICS & EVENT COORDINATION",

                image:
                    "assets/officer-bench-paed.jpg",

                description:
                    "Supports logistical requirements and event coordination to help SCPES activities run efficiently."
            },


            {
                name:
                    "FELIX FREDERICK L. ADRIANO",

                position:
                    "VICE PRESIDENT FOR RECREATION & WELLNESS",

                image:
                    "assets/officer-felix-adriano.jpg",

                description:
                    "Supports recreation, engagement, and wellness-oriented activities for the Computer Engineering student community."
            }

        ];


        /* =================================================
           OFFICER MODAL
        ================================================= */

        const officerModal =
            document.getElementById(
                "officerModal"
            );

        const officerModalBackdrop =
            document.getElementById(
                "officerModalBackdrop"
            );

        const officerModalClose =
            document.getElementById(
                "officerModalClose"
            );

        const officerModalImage =
            document.getElementById(
                "officerModalImage"
            );

        const officerModalPosition =
            document.getElementById(
                "officerModalPosition"
            );

        const officerModalName =
            document.getElementById(
                "officerModalName"
            );

        const officerModalDescription =
            document.getElementById(
                "officerModalDescription"
            );

        const officerCounter =
            document.getElementById(
                "officerCounter"
            );

        const officerPrev =
            document.getElementById(
                "officerPrev"
            );

        const officerNext =
            document.getElementById(
                "officerNext"
            );


        let activeOfficer =
            0;


        function updateOfficer() {

            const officer =
                officers[
                    activeOfficer
                ];


            if (!officer) {
                return;
            }


            if (officerModalImage) {

                officerModalImage
                    .classList
                    .add(
                        "changing"
                    );


                setTimeout(
                    function () {

                        officerModalImage.src =
                            officer.image;


                        officerModalImage.alt =
                            officer.name;


                        officerModalImage
                            .classList
                            .remove(
                                "changing"
                            );

                    },
                    160
                );
            }


            if (officerModalPosition) {

                officerModalPosition
                    .textContent =
                    officer.position;
            }


            if (officerModalName) {

                officerModalName
                    .textContent =
                    officer.name;
            }


            if (officerModalDescription) {

                officerModalDescription
                    .textContent =
                    officer.description;
            }


            if (officerCounter) {

                officerCounter
                    .textContent =

                    String(
                        activeOfficer + 1
                    ).padStart(
                        2,
                        "0"
                    ) +

                    " / " +

                    String(
                        officers.length
                    ).padStart(
                        2,
                        "0"
                    );
            }
        }


        function openOfficer(
            index
        ) {

            activeOfficer =
                Number(index);


            updateOfficer();


            if (!officerModal) {
                return;
            }


            officerModal
                .classList
                .add(
                    "open"
                );


            officerModal
                .setAttribute(
                    "aria-hidden",
                    "false"
                );


            document.body
                .classList
                .add(
                    "viewer-open"
                );
        }


        function closeOfficer() {

            if (!officerModal) {
                return;
            }


            officerModal
                .classList
                .remove(
                    "open"
                );


            officerModal
                .setAttribute(
                    "aria-hidden",
                    "true"
                );


            document.body
                .classList
                .remove(
                    "viewer-open"
                );
        }


        function nextOfficer() {

            activeOfficer =
                (
                    activeOfficer + 1
                ) %
                officers.length;


            updateOfficer();
        }


        function previousOfficer() {

            activeOfficer =
                (
                    activeOfficer -
                    1 +
                    officers.length
                ) %
                officers.length;


            updateOfficer();
        }


        const officerCards =
            document.querySelectorAll(
                ".officer-card"
            );


        officerCards.forEach(
            function (card) {

                const viewButton =
                    card.querySelector(
                        ".officer-view"
                    );


                if (viewButton) {

                    viewButton.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();


                            openOfficer(
                                card.dataset.officer
                            );

                        }
                    );
                }


                card.addEventListener(
                    "touchstart",
                    function () {

                        officerCards.forEach(
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
                            .add(
                                "touch-active"
                            );

                    },
                    {
                        passive: true
                    }
                );

            }
        );


        if (officerModalClose) {

            officerModalClose
                .addEventListener(
                    "click",
                    closeOfficer
                );
        }


        if (officerModalBackdrop) {

            officerModalBackdrop
                .addEventListener(
                    "click",
                    closeOfficer
                );
        }


        if (officerNext) {

            officerNext
                .addEventListener(
                    "click",
                    nextOfficer
                );
        }


        if (officerPrev) {

            officerPrev
                .addEventListener(
                    "click",
                    previousOfficer
                );
        }


        /* =================================================
           IMAGE GALLERIES
        ================================================= */

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

        const viewerTitle =
            document.getElementById(
                "viewerTitle"
            );

        const viewerSubtitle =
            document.getElementById(
                "viewerSubtitle"
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


        let activeItems =
            [];

        let activeIndex =
            0;


        const galleries =
            document.querySelectorAll(
                "[data-gallery]"
            );


        galleries.forEach(
            function (gallery) {

                const items =
                    Array.from(
                        gallery.querySelectorAll(
                            "[data-image]"
                        )
                    );


                items.forEach(
                    function (
                        item,
                        index
                    ) {

                        item.addEventListener(
                            "click",
                            function () {

                                activeItems =
                                    items;


                                activeIndex =
                                    index;


                                openViewer();

                            }
                        );

                    }
                );

            }
        );


        function updateViewer() {

            if (
                !activeItems.length
            ) {

                return;
            }


            const item =
                activeItems[
                    activeIndex
                ];


            if (viewerImage) {

                viewerImage
                    .classList
                    .add(
                        "changing"
                    );


                setTimeout(
                    function () {

                        viewerImage.src =
                            item.dataset.image;


                        viewerImage.alt =
                            item.dataset.title ||
                            "";


                        viewerImage
                            .classList
                            .remove(
                                "changing"
                            );

                    },
                    160
                );
            }


            if (viewerTitle) {

                viewerTitle.textContent =
                    item.dataset.title ||
                    "";
            }


            if (viewerSubtitle) {

                viewerSubtitle.textContent =
                    item.dataset.subtitle ||
                    "SCPES / FEATURE";
            }


            if (viewerDescription) {

                viewerDescription.textContent =
                    item.dataset.description ||
                    "";
            }


            if (viewerCounter) {

                viewerCounter.textContent =

                    String(
                        activeIndex + 1
                    ).padStart(
                        2,
                        "0"
                    ) +

                    " / " +

                    String(
                        activeItems.length
                    ).padStart(
                        2,
                        "0"
                    );
            }
        }


        function openViewer() {

            if (!imageViewer) {
                return;
            }


            updateViewer();


            imageViewer
                .classList
                .add(
                    "open"
                );


            imageViewer
                .setAttribute(
                    "aria-hidden",
                    "false"
                );


            document.body
                .classList
                .add(
                    "viewer-open"
                );
        }


        function closeViewer() {

            if (!imageViewer) {
                return;
            }


            imageViewer
                .classList
                .remove(
                    "open"
                );


            imageViewer
                .setAttribute(
                    "aria-hidden",
                    "true"
                );


            document.body
                .classList
                .remove(
                    "viewer-open"
                );
        }


        function nextImage() {

            if (!activeItems.length) {
                return;
            }


            activeIndex =
                (
                    activeIndex + 1
                ) %
                activeItems.length;


            updateViewer();
        }


        function previousImage() {

            if (!activeItems.length) {
                return;
            }


            activeIndex =
                (
                    activeIndex -
                    1 +
                    activeItems.length
                ) %
                activeItems.length;


            updateViewer();
        }


        if (viewerClose) {

            viewerClose
                .addEventListener(
                    "click",
                    closeViewer
                );
        }


        if (viewerBackdrop) {

            viewerBackdrop
                .addEventListener(
                    "click",
                    closeViewer
                );
        }


        if (viewerNext) {

            viewerNext
                .addEventListener(
                    "click",
                    nextImage
                );
        }


        if (viewerPrev) {

            viewerPrev
                .addEventListener(
                    "click",
                    previousImage
                );
        }


        /* =================================================
           KEYBOARD
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    officerModal &&
                    officerModal
                        .classList
                        .contains(
                            "open"
                        )
                ) {

                    if (
                        event.key ===
                        "Escape"
                    ) {

                        closeOfficer();
                    }


                    if (
                        event.key ===
                        "ArrowRight"
                    ) {

                        nextOfficer();
                    }


                    if (
                        event.key ===
                        "ArrowLeft"
                    ) {

                        previousOfficer();
                    }


                    return;
                }


                if (
                    imageViewer &&
                    imageViewer
                        .classList
                        .contains(
                            "open"
                        )
                ) {

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

            }
        );


        /* =================================================
           VIDEO SELECTOR
        ================================================= */

        const featuredVideo =
            document.getElementById(
                "featuredVideo"
            );

        const featuredVideoSource =
            document.getElementById(
                "featuredVideoSource"
            );

        const featuredVideoTitle =
            document.getElementById(
                "featuredVideoTitle"
            );

        const featuredVideoNumber =
            document.getElementById(
                "featuredVideoNumber"
            );

        const videoOptions =
            document.querySelectorAll(
                ".video-option"
            );


        videoOptions.forEach(
            function (option) {

                option.addEventListener(
                    "click",
                    function () {

                        videoOptions.forEach(
                            function (item) {

                                item
                                    .classList
                                    .remove(
                                        "active"
                                    );

                            }
                        );


                        option
                            .classList
                            .add(
                                "active"
                            );


                        if (
                            featuredVideo &&
                            featuredVideoSource
                        ) {

                            featuredVideo.pause();


                            featuredVideoSource.src =
                                option.dataset.video;


                            featuredVideo.poster =
                                option.dataset.poster ||
                                "";


                            featuredVideo.load();
                        }


                        if (
                            featuredVideoTitle
                        ) {

                            featuredVideoTitle
                                .textContent =
                                option.dataset.title;
                        }


                        if (
                            featuredVideoNumber
                        ) {

                            featuredVideoNumber
                                .textContent =
                                option.dataset.number;
                        }


                        if (featuredVideo) {

                            featuredVideo.scrollIntoView(
                                {
                                    behavior:
                                        "smooth",

                                    block:
                                        "center"
                                }
                            );
                        }

                    }
                );

            }
        );


        /* =================================================
           IMAGE VIEWER SWIPE
        ================================================= */

        let touchStartX =
            0;


        let touchEndX =
            0;


        if (imageViewer) {

            imageViewer.addEventListener(
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


            imageViewer.addEventListener(
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

                        nextImage();

                    } else {

                        previousImage();

                    }

                },
                {
                    passive: true
                }
            );
        }


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