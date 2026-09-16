

document.addEventListener(
    "DOMContentLoaded",
    () => {
        initFadeUp();
        scrollToHash();
    }
);


document.addEventListener(
    "components:loaded",
    () => {
        initFadeUp();
        scrollToHash();
    }
);


window.addEventListener(
    "hashchange",
    scrollToHash
);


/* =========================================================
   HASH SCROLL
========================================================= */

function scrollToHash() {

    const hash =
        window.location.hash;

    if (!hash) return;


    setTimeout(() => {

        if (
            typeof window.scrollToSection
            === "function"
        ) {

            window.scrollToSection(hash);

            return;
        }


        const target =
            document.querySelector(hash);

        if (!target) return;


        const header =
            document.querySelector(
                ".site-header"
            );


        const offset =
            header
                ? header.offsetHeight + 12
                : 140;


        const top =
            target
                .getBoundingClientRect()
                .top
            +
            window.scrollY
            -
            offset;


        window.scrollTo({
            top,
            behavior: "smooth"
        });

    }, 220);
}



/* =========================================================
   SCROLL REVEAL
========================================================= */

function initFadeUp() {

    const items =
        document.querySelectorAll(
            ".fade-up:not([data-fade-initialized])"
        );


    if (!items.length) {
        return;
    }


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        items.forEach(item => {

            item.dataset.fadeInitialized =
                "true";

            item.classList.add(
                "visible"
            );

        });


        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");


                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    items.forEach(item => {

        item.dataset.fadeInitialized =
            "true";

        observer.observe(item);

    });
}