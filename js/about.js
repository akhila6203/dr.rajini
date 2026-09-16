(function () {

    "use strict";


    async function loadComponent(element) {

        const source =
            element.dataset.componentSrc;

        if (!source) return;


        try {

            const response =
                await fetch(source);

            if (!response.ok) {
                throw new Error(
                    `Failed to load: ${source}`
                );
            }

            element.innerHTML =
                await response.text();

        } catch (error) {

            console.error(
                "Component loading failed:",
                source,
                error
            );

        }

    }


    function initFaq() {

        const faqItems =
            document.querySelectorAll(
                ".faq-item"
            );


        faqItems.forEach(item => {

            const question =
                item.querySelector(
                    ".faq-question"
                );

            const icon =
                item.querySelector(
                    ".faq-icon"
                );


            if (!question) return;


            question.addEventListener(
                "click",
                function () {

                    const currentlyOpen =
                        item.classList.contains(
                            "active"
                        );


                    faqItems.forEach(otherItem => {

                        otherItem.classList.remove(
                            "active"
                        );

                        const otherButton =
                            otherItem.querySelector(
                                ".faq-question"
                            );

                        const otherIcon =
                            otherItem.querySelector(
                                ".faq-icon"
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


                    if (!currentlyOpen) {

                        item.classList.add(
                            "active"
                        );

                        question.setAttribute(
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

    }


    function initTestimonials() {

        const sliders =
            document.querySelectorAll(
                ".testimonial-slider"
            );


        sliders.forEach(slider => {

            const track =
                slider.querySelector(
                    ".testimonial-track"
                );

            const previous =
                slider.querySelector(
                    ".testimonial-prev"
                );

            const next =
                slider.querySelector(
                    ".testimonial-next"
                );


            if (!track) return;


            function scrollAmount() {

                const card =
                    track.querySelector(
                        ".testimonial-card"
                    );

                if (!card) {
                    return 350;
                }

                const styles =
                    window.getComputedStyle(
                        track
                    );

                const gap =
                    parseFloat(
                        styles.columnGap ||
                        styles.gap ||
                        22
                    );

                return (
                    card.getBoundingClientRect()
                        .width + gap
                );

            }


            previous?.addEventListener(
                "click",
                function () {

                    track.scrollBy({
                        left:
                            -scrollAmount(),

                        behavior:
                            "smooth"
                    });

                }
            );


            next?.addEventListener(
                "click",
                function () {

                    track.scrollBy({
                        left:
                            scrollAmount(),

                        behavior:
                            "smooth"
                    });

                }
            );

        });

    }


    async function initializeAboutPage() {

        const components =
            document.querySelectorAll(
                "[data-component-src]"
            );


        await Promise.all(
            Array.from(components)
                .map(loadComponent)
        );


        initFaq();

        initTestimonials();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initializeAboutPage
        );

    } else {

        initializeAboutPage();

    }


})();