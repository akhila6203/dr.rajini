/* =========================================================
   REUSABLE CONTACT COMPONENT

   Used by:
   - index.html
   - contact.html

   IMPORTANT:
   Form submission is NOT handled here.
   Original form posts directly to send-mail.php.
========================================================= */

(function () {

    "use strict";


    async function loadContactComponent() {

        const placeholders =
            document.querySelectorAll(
                "[data-contact-component]"
            );


        if (!placeholders.length) {
            return;
        }


        try {

            const response =
                await fetch(
                    "components/contact-section.html"
                );


            if (!response.ok) {

                throw new Error(
                    "Unable to load contact component."
                );

            }


            const html =
                await response.text();


            placeholders.forEach(
                placeholder => {

                    placeholder.innerHTML =
                        html;

                }
            );


            /*
             * Tell global scripts that
             * dynamically loaded content
             * is now available.
             */

            document.dispatchEvent(
                new CustomEvent(
                    "contact:loaded"
                )
            );


        } catch (error) {

            console.error(
                "Contact component loading failed:",
                error
            );

        }

    }



    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            loadContactComponent
        );

    } else {

        loadContactComponent();

    }

})();