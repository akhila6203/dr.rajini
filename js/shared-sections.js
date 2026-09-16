(function () {

    "use strict";


    /* =========================================================
       LOAD SHARED HTML COMPONENT
    ========================================================= */

    async function loadSharedComponent(element) {

        const file =
            element.getAttribute(
                "data-shared-component"
            );

        if (!file) return;


        try {

            const response =
                await fetch(
                    `components/${file}`
                );


            if (!response.ok) {

                throw new Error(
                    `Unable to load ${file}`
                );

            }


            element.innerHTML =
                await response.text();


        } catch (error) {

            console.error(
                "Shared component error:",
                error
            );

        }

    }



    /* =========================================================
       FAQ ACCORDION
       ONE OPEN = ALL OTHERS CLOSE
    ========================================================= */

    function initializeFaq() {

        document
            .querySelectorAll(
                ".shared-faq"
            )
            .forEach(section => {

                const items =
                    section.querySelectorAll(
                        ".shared-faq-item"
                    );


                items.forEach(item => {

                    const button =
                        item.querySelector(
                            ".shared-faq-question"
                        );

                    const icon =
                        item.querySelector(
                            ".shared-faq-icon"
                        );


                    if (!button) return;


                    button.addEventListener(
                        "click",
                        function () {

                            const wasOpen =
                                item.classList.contains(
                                    "active"
                                );


                            /* CLOSE EVERYTHING */

                            items.forEach(otherItem => {

                                otherItem.classList.remove(
                                    "active"
                                );


                                const otherButton =
                                    otherItem.querySelector(
                                        ".shared-faq-question"
                                    );


                                const otherIcon =
                                    otherItem.querySelector(
                                        ".shared-faq-icon"
                                    );


                                if (otherButton) {

                                    otherButton.setAttribute(
                                        "aria-expanded",
                                        "false"
                                    );

                                }


                                if (otherIcon) {

                                    otherIcon.textContent =
                                        "+";

                                }

                            });


                            /* OPEN CLICKED ITEM */

                            if (!wasOpen) {

                                item.classList.add(
                                    "active"
                                );


                                button.setAttribute(
                                    "aria-expanded",
                                    "true"
                                );


                                if (icon) {

                                    icon.textContent =
                                        "−";

                                }

                            }

                        }
                    );

                });

            });

    }



    /* =========================================================
       TESTIMONIALS
       DESKTOP = 3 CARDS
       TABLET = 2
       MOBILE = 1

       NEXT:
       1 -> 2 -> 3 -> 4 -> 1 -> 2...

       NO HORIZONTAL SCROLLBAR
    ========================================================= */

    function initializeTestimonials() {

        document
            .querySelectorAll(
                ".shared-testimonials"
            )
            .forEach(section => {

                const track =
                    section.querySelector(
                        ".shared-testimonial-track"
                    );


                const cards =
                    Array.from(
                        section.querySelectorAll(
                            ".shared-testimonial-card"
                        )
                    );


                const previous =
                    section.querySelector(
                        ".shared-testimonial-prev"
                    );


                const next =
                    section.querySelector(
                        ".shared-testimonial-next"
                    );


                const dotsContainer =
                    section.querySelector(
                        ".shared-testimonial-dots"
                    );


                if (
                    !track ||
                    !cards.length
                ) {
                    return;
                }


                let currentIndex = 0;

                let autoPlay = null;



                function getVisibleCards() {

                    if (
                        window.innerWidth <= 640
                    ) {
                        return 1;
                    }


                    if (
                        window.innerWidth <= 991
                    ) {
                        return 2;
                    }


                    return 3;

                }



                /* =============================================
                   CREATE DOTS
                ============================================= */

                if (dotsContainer) {

                    dotsContainer.innerHTML =
                        cards
                            .map(
                                (_, index) => `
                                    <button
                                        type="button"
                                        class="shared-testimonial-dot ${
                                            index === 0
                                                ? "active"
                                                : ""
                                        }"
                                        aria-label="Show testimonial ${index + 1}"
                                    ></button>
                                `
                            )
                            .join("");

                }



                function getDots() {

                    return Array.from(
                        section.querySelectorAll(
                            ".shared-testimonial-dot"
                        )
                    );

                }



                function updateSlider() {

                    const visibleCards =
                        getVisibleCards();


                    const gap = 22;


                    const viewport =
                        section.querySelector(
                            ".shared-testimonial-viewport"
                        );


                    if (!viewport) return;


                    const viewportWidth =
                        viewport.clientWidth;


                    const cardWidth =
                        (
                            viewportWidth -
                            gap *
                                (
                                    visibleCards -
                                    1
                                )
                        ) /
                        visibleCards;


                    cards.forEach(card => {

                        card.style.flex =
                            `0 0 ${cardWidth}px`;

                    });


                    /*
                     * Because we only have 4 original cards,
                     * when currentIndex moves beyond available
                     * desktop start position, wrap cleanly.
                     */

                    const offset =
                        currentIndex *
                        (
                            cardWidth +
                            gap
                        );


                    track.style.transform =
                        `translateX(-${offset}px)`;


                    const dots =
                        getDots();


                    dots.forEach(
                        (dot, index) => {

                            dot.classList.toggle(
                                "active",
                                index ===
                                    currentIndex
                            );

                        }
                    );

                }



                function goTo(index) {

                    if (
                        index >= cards.length
                    ) {

                        currentIndex = 0;

                    } else if (
                        index < 0
                    ) {

                        currentIndex =
                            cards.length - 1;

                    } else {

                        currentIndex =
                            index;

                    }


                    /*
                     * For 3-card desktop layout, showing
                     * index 3 directly would create empty area.
                     *
                     * Rotate DOM so 4 becomes first card.
                     * This produces:
                     *
                     * 1 2 3
                     * 2 3 4
                     * 3 4 1
                     * 4 1 2
                     * 1 2 3 ...
                     */

                    cards.forEach(
                        (card, originalIndex) => {

                            const position =
                                (
                                    originalIndex -
                                    currentIndex +
                                    cards.length
                                ) %
                                cards.length;


                            card.style.order =
                                position;

                        }
                    );


                    /*
                     * Cards are reordered, therefore
                     * track always starts from zero.
                     */

                    track.style.transform =
                        "translateX(0)";


                    const dots =
                        getDots();


                    dots.forEach(
                        (dot, dotIndex) => {

                            dot.classList.toggle(
                                "active",
                                dotIndex ===
                                    currentIndex
                            );

                        }
                    );

                }



                function goNext() {

                    goTo(
                        currentIndex + 1
                    );

                }



                function goPrevious() {

                    goTo(
                        currentIndex - 1
                    );

                }



                function stopAutoPlay() {

                    if (autoPlay) {

                        clearInterval(
                            autoPlay
                        );

                        autoPlay = null;

                    }

                }



                function startAutoPlay() {

                    stopAutoPlay();


                    autoPlay =
                        setInterval(
                            goNext,
                            5500
                        );

                }



                previous?.addEventListener(
                    "click",
                    function () {

                        goPrevious();

                        startAutoPlay();

                    }
                );


                next?.addEventListener(
                    "click",
                    function () {

                        goNext();

                        startAutoPlay();

                    }
                );


                getDots().forEach(
                    (dot, index) => {

                        dot.addEventListener(
                            "click",
                            function () {

                                goTo(index);

                                startAutoPlay();

                            }
                        );

                    }
                );


                section.addEventListener(
                    "mouseenter",
                    stopAutoPlay
                );


                section.addEventListener(
                    "mouseleave",
                    startAutoPlay
                );


                window.addEventListener(
                    "resize",
                    updateSlider
                );


                goTo(0);

                updateSlider();

                startAutoPlay();

            });

    }



    /* =========================================================
       INITIALIZE
    ========================================================= */

    async function initializeSharedSections() {

        const placeholders =
            Array.from(
                document.querySelectorAll(
                    "[data-shared-component]"
                )
            );


        await Promise.all(
            placeholders.map(
                loadSharedComponent
            )
        );


        initializeFaq();

        initializeTestimonials();

    }



    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeSharedSections
        );

    } else {

        initializeSharedSections();

    }

})();