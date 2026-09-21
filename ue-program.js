/* =========================================================
   UE PROGRAM PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const themeToggle = document.getElementById("themeToggle");
    const clock = document.getElementById("clock");
    const pageTransition = document.getElementById("pageTransition");
    const exploreButton = document.getElementById("exploreButton");


    /* =====================================================
       PAGE ENTRANCE
    ===================================================== */

    if (pageTransition) {
        pageTransition.classList.add("entering");

        setTimeout(function () {
            pageTransition.classList.remove("entering");
        }, 1050);
    }

    setTimeout(function () {
        document.body.classList.add("loaded");
    }, 180);


    /* =====================================================
       THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("cpe-theme") || "light";

    document.documentElement.dataset.theme = savedTheme;

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {

            const current =
                document.documentElement.dataset.theme;

            const next =
                current === "dark"
                    ? "light"
                    : "dark";

            document.documentElement.dataset.theme = next;

            localStorage.setItem(
                "cpe-theme",
                next
            );
        });
    }


    /* =====================================================
       MANILA CLOCK
    ===================================================== */

    function updateClock() {

        if (!clock) return;

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
            "MANILA " +
            formatter.format(new Date());
    }

    updateClock();

    setInterval(
        updateClock,
        1000
    );


    /* =====================================================
       EXPLORE BUTTON
    ===================================================== */

    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            function () {

                const overview =
                    document.getElementById(
                        "overview"
                    );

                if (overview) {
                    overview.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        );
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
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
                    threshold: 0.1,
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

                element.classList.add(
                    "visible"
                );

            }
        );
    }


    /* =====================================================
       FEATURE VIEWER
    ===================================================== */

    const viewer =
        document.getElementById(
            "featureViewer"
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


    let activeItems = [];
    let activeIndex = 0;


    /* =====================================================
       REGISTER ALL NORMAL GALLERIES

       Learning Experiences
       Laboratories
       Student Projects
       Research galleries
    ===================================================== */

    const galleryContainers =
        document.querySelectorAll(
            "[data-gallery]"
        );

    galleryContainers.forEach(
        function (gallery) {

            const items =
                Array.from(
                    gallery.querySelectorAll(
                        "[data-image]"
                    )
                );

            items.forEach(
                function (item, index) {

                    item.addEventListener(
                        "click",
                        function () {

                            activeItems = items;
                            activeIndex = index;

                            openViewer();
                        }
                    );
                }
            );
        }
    );


    /* =====================================================
       RESEARCH IMAGE GALLERIES

       This also works if the research images are not
       wrapped in data-gallery.
    ===================================================== */

    const researchGroups =
        document.querySelectorAll(
            ".research-expand"
        );

    researchGroups.forEach(
        function (group) {

            /*
             * If this group already uses data-gallery,
             * the normal gallery code above handles it.
             */

            if (
                group.hasAttribute(
                    "data-gallery"
                )
            ) {
                return;
            }

            const items =
                Array.from(
                    group.querySelectorAll(
                        ".research-image[data-image]"
                    )
                );

            items.forEach(
                function (item, index) {

                    item.addEventListener(
                        "click",
                        function (event) {

                            event.stopPropagation();

                            activeItems = items;
                            activeIndex = index;

                            openViewer();
                        }
                    );
                }
            );
        }
    );


    /* =====================================================
       UPDATE FEATURE VIEWER
    ===================================================== */

    function updateViewer() {

        if (!activeItems.length) {
            return;
        }

        const item =
            activeItems[
                activeIndex
            ];

        const image =
            item.dataset.image;

        const title =
            item.dataset.title || "";

        const subtitle =
            item.dataset.subtitle ||
            "UE CPE / FEATURE";

        const description =
            item.dataset.description || "";


        if (viewerImage) {

            viewerImage.classList.add(
                "changing"
            );

            setTimeout(
                function () {

                    viewerImage.src =
                        image;

                    viewerImage.alt =
                        title;

                    viewerImage
                        .classList
                        .remove(
                            "changing"
                        );

                },
                170
            );
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


        if (viewerCounter) {

            const current =
                String(
                    activeIndex + 1
                ).padStart(
                    2,
                    "0"
                );

            const total =
                String(
                    activeItems.length
                ).padStart(
                    2,
                    "0"
                );

            viewerCounter.textContent =
                current +
                " / " +
                total;
        }
    }


    /* =====================================================
       OPEN VIEWER
    ===================================================== */

    function openViewer() {

        if (!viewer) return;

        updateViewer();

        viewer.classList.add(
            "open"
        );

        viewer.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body
            .classList
            .add(
                "viewer-open"
            );
    }


    /* =====================================================
       CLOSE VIEWER
    ===================================================== */

    function closeViewer() {

        if (!viewer) return;

        viewer.classList.remove(
            "open"
        );

        viewer.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body
            .classList
            .remove(
                "viewer-open"
            );
    }


    /* =====================================================
       NEXT FEATURE
    ===================================================== */

    function nextFeature() {

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


    /* =====================================================
       PREVIOUS FEATURE
    ===================================================== */

    function previousFeature() {

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


    /* =====================================================
       VIEWER BUTTONS
    ===================================================== */

    if (viewerNext) {

        viewerNext.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                nextFeature();
            }
        );
    }


    if (viewerPrev) {

        viewerPrev.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                previousFeature();
            }
        );
    }


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


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !viewer ||
                !viewer.classList.contains(
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
                "ArrowRight"
            ) {
                nextFeature();
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {
                previousFeature();
            }
        }
    );


    /* =====================================================
       PHONE SWIPE FOR FEATURE VIEWER
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    if (viewer) {

        viewer.addEventListener(
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


        viewer.addEventListener(
            "touchend",
            function (event) {

                touchEndX =
                    event
                        .changedTouches[0]
                        .screenX;

                handleSwipe();
            },
            {
                passive: true
            }
        );
    }


    function handleSwipe() {

        const distance =
            touchEndX -
            touchStartX;

        /*
         * Ignore small movement so the
         * user can still scroll normally.
         */

        if (
            Math.abs(
                distance
            ) < 55
        ) {
            return;
        }


        if (distance < 0) {

            nextFeature();

        } else {

            previousFeature();

        }
    }


    /* =====================================================
       RESEARCH ACCORDION
       THINK. TEST. CREATE.
    ===================================================== */

    const researchBoxes =
        document.querySelectorAll(
            ".research-expand"
        );


    researchBoxes.forEach(
        function (box) {

            const trigger =
                box.querySelector(
                    ".research-trigger"
                );

            const panel =
                box.querySelector(
                    ".research-panel"
                );


            if (
                !trigger ||
                !panel
            ) {
                return;
            }


            trigger.setAttribute(
                "aria-expanded",
                "false"
            );


            trigger.addEventListener(
                "click",
                function () {

                    const opening =
                        !box.classList.contains(
                            "active"
                        );


                    /*
                     * Close all other boxes first.
                     */

                    researchBoxes.forEach(
                        function (otherBox) {

                            const otherPanel =
                                otherBox.querySelector(
                                    ".research-panel"
                                );

                            const otherTrigger =
                                otherBox.querySelector(
                                    ".research-trigger"
                                );


                            otherBox.classList.remove(
                                "active"
                            );


                            if (otherPanel) {

                                otherPanel.style.maxHeight =
                                    null;
                            }


                            if (otherTrigger) {

                                otherTrigger.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );
                            }
                        }
                    );


                    /*
                     * Open selected research box.
                     */

                    if (opening) {

                        box.classList.add(
                            "active"
                        );

                        trigger.setAttribute(
                            "aria-expanded",
                            "true"
                        );


                        panel.style.maxHeight =
                            panel.scrollHeight +
                            "px";


                        /*
                         * Small second calculation after
                         * layout finishes. This helps when
                         * images affect panel height.
                         */

                        setTimeout(
                            function () {

                                if (
                                    box.classList.contains(
                                        "active"
                                    )
                                ) {

                                    panel.style.maxHeight =
                                        panel.scrollHeight +
                                        "px";
                                }

                            },
                            350
                        );
                    }
                }
            );


            /*
             * Images can change panel height after loading.
             */

            const panelImages =
                panel.querySelectorAll(
                    "img"
                );


            panelImages.forEach(
                function (image) {

                    image.addEventListener(
                        "load",
                        function () {

                            if (
                                box.classList.contains(
                                    "active"
                                )
                            ) {

                                panel.style.maxHeight =
                                    panel.scrollHeight +
                                    "px";
                            }
                        }
                    );
                }
            );
        }
    );


    /* =====================================================
       PROJECT IMAGE TRANSITION
       FROM IDEA TO PROTOTYPE
    ===================================================== */

    const projectFeatures =
        document.querySelectorAll(
            ".project-feature"
        );


    projectFeatures.forEach(
        function (project) {

            /*
             * Desktop transition is handled by CSS hover.
             *
             * On touchscreen:
             * first tap activates the second image.
             */

            project.addEventListener(
                "touchstart",
                function () {

                    projectFeatures.forEach(
                        function (otherProject) {

                            if (
                                otherProject !==
                                project
                            ) {

                                otherProject
                                    .classList
                                    .remove(
                                        "touch-active"
                                    );
                            }
                        }
                    );


                    project.classList.add(
                        "touch-active"
                    );

                },
                {
                    passive: true
                }
            );
        }
    );


    /*
     * Tap outside a project to return its
     * first image on mobile.
     */

    document.addEventListener(
        "touchstart",
        function (event) {

            const touchedProject =
                event.target.closest(
                    ".project-feature"
                );

            if (touchedProject) {
                return;
            }


            projectFeatures.forEach(
                function (project) {

                    project.classList.remove(
                        "touch-active"
                    );
                }
            );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       RECALCULATE OPEN RESEARCH PANEL
       ON SCREEN RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            const openBox =
                document.querySelector(
                    ".research-expand.active"
                );

            if (!openBox) {
                return;
            }


            const panel =
                openBox.querySelector(
                    ".research-panel"
                );


            if (panel) {

                panel.style.maxHeight =
                    panel.scrollHeight +
                    "px";
            }
        }
    );


    /* =====================================================
       PAGE TRANSITIONS
    ===================================================== */

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


                    /*
                     * Don't interfere with:
                     * CTRL + click
                     * CMD + click
                     * SHIFT + click
                     * ALT + click
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


    /* =====================================================
       CURSOR TRAIL
    ===================================================== */

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

        const circleCount = 12;

        const circles = [];

        let mouseX = -100;
        let mouseY = -100;
        let mouseActive = false;


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
                    i * 0.65
                );


            circle.style.width =
                size + "px";

            circle.style.height =
                size + "px";


            document.body.appendChild(
                circle
            );


            circles.push({
                element: circle,
                x: mouseX,
                y: mouseY
            });
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

            let x = mouseX;
            let y = mouseY;


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
                        0.30;


                    circle.y +=
                        (
                            y -
                            circle.y
                        ) *
                        0.30;


                    const size =
                        Math.max(
                            3,
                            12 -
                            index * 0.65
                        );


                    const opacity =
                        mouseActive
                            ? Math.max(
                                0.05,
                                0.46 -
                                index * 0.035
                            )
                            : 0;


                    circle.element.style.opacity =
                        opacity;


                    circle.element.style.transform =
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


                    x = circle.x;
                    y = circle.y;
                }
            );


            requestAnimationFrame(
                animateTrail
            );
        }


        animateTrail();
    }


    /* =====================================================
       BACK BUTTON / PAGE RESTORE FIX
    ===================================================== */

    window.addEventListener(
        "pageshow",
        function () {

            document.body
                .classList
                .add(
                    "loaded"
                );


            /*
             * Always reset the transition.
             * This prevents the page from staying
             * covered after browser Back.
             */

            if (pageTransition) {

                pageTransition
                    .classList
                    .remove(
                        "entering",
                        "leaving"
                    );
            }


            /*
             * Reveal sections already visible
             * when returning to this page.
             */

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


            /*
             * Recalculate research box if one
             * was open before navigating away.
             */

            const openResearch =
                document.querySelector(
                    ".research-expand.active"
                );


            if (openResearch) {

                const panel =
                    openResearch.querySelector(
                        ".research-panel"
                    );


                if (panel) {

                    panel.style.maxHeight =
                        panel.scrollHeight +
                        "px";
                }
            }
        }
    );

});