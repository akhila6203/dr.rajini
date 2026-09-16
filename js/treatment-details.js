(function () {
    "use strict";

    const treatments =
        Array.isArray(window.TREATMENTS)
            ? window.TREATMENTS
            : [];


    const params =
        new URLSearchParams(
            window.location.search
        );


    let currentSlug =
        params.get("slug");


    if (!currentSlug && treatments.length) {
        currentSlug =
            treatments[0].slug;
    }


    let currentTreatment =
        treatments.find(
            (item) =>
                item.slug === currentSlug
        );


    if (!currentTreatment && treatments.length) {

        currentTreatment =
            treatments[0];

        currentSlug =
            currentTreatment.slug;
    }


    const treatmentImage =
        document.getElementById(
            "treatmentImage"
        );

    const treatmentTitle =
        document.getElementById(
            "treatmentTitle"
        );

    const bannerTreatmentTitle =
        document.getElementById(
            "bannerTreatmentTitle"
        );

    const breadcrumbTreatmentName =
        document.getElementById(
            "breadcrumbTreatmentName"
        );

    const treatmentIntro =
        document.getElementById(
            "treatmentIntro"
        );

    const proceduralTitle =
        document.getElementById(
            "proceduralTitle"
        );

    const proceduralText =
        document.getElementById(
            "proceduralText"
        );

    const treatmentObjectives =
        document.getElementById(
            "treatmentObjectives"
        );

    const clinicalModuleList =
        document.getElementById(
            "clinicalModuleList"
        );


    /* =====================================================
       RENDER TREATMENT
    ====================================================== */

    function renderTreatment(treatment) {

        if (!treatment) {
            return;
        }


        if (treatmentImage) {

            treatmentImage.src =
                treatment.image;

            treatmentImage.alt =
                treatment.title;
        }


        if (treatmentTitle) {

            treatmentTitle.textContent =
                treatment.displayTitle ||
                treatment.title;
        }


        if (bannerTreatmentTitle) {

            bannerTreatmentTitle.textContent =
                treatment.title;
        }


        if (breadcrumbTreatmentName) {

            breadcrumbTreatmentName.textContent =
                treatment.title;
        }


        if (treatmentIntro) {

            treatmentIntro.textContent =
                treatment.intro || "";
        }


        if (proceduralTitle) {

            proceduralTitle.textContent =
                treatment.proceduralTitle ||
                "Procedural Depth";
        }


        if (proceduralText) {

            proceduralText.textContent =
                treatment.proceduralText || "";
        }


        if (treatmentObjectives) {

            treatmentObjectives.innerHTML = "";


            (treatment.objectives || [])
                .forEach(
                    function (objective) {

                        const li =
                            document.createElement(
                                "li"
                            );


                        const check =
                            document.createElement(
                                "span"
                            );

                        check.className =
                            "objective-check";

                        check.innerHTML =
                            '<i class="fa-solid fa-check"></i>';


                        const text =
                            document.createElement(
                                "span"
                            );

                        text.textContent =
                            objective;


                        li.appendChild(check);
                        li.appendChild(text);

                        treatmentObjectives
                            .appendChild(li);
                    }
                );
        }


        document.title =
            treatment.title +
            " | Dr. Muthineni Rajini";
    }


    /* =====================================================
       SIDEBAR
    ====================================================== */

    function renderSidebar() {

        if (!clinicalModuleList) {
            return;
        }


        clinicalModuleList.innerHTML = "";


        treatments.forEach(
            function (treatment) {

                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    "treatment-details.html?slug=" +
                    encodeURIComponent(
                        treatment.slug
                    );


                link.className =
                    "clinical-module-item";


                if (
                    treatment.slug ===
                    currentSlug
                ) {

                    link.classList.add(
                        "active"
                    );

                    link.setAttribute(
                        "aria-current",
                        "page"
                    );
                }


                const arrow =
                    document.createElement(
                        "span"
                    );

                arrow.className =
                    "module-arrow";

                arrow.innerHTML =
                    '<i class="fa-solid fa-arrow-right"></i>';


                const name =
                    document.createElement(
                        "span"
                    );

                name.className =
                    "module-name";

                name.textContent =
                    treatment.title;


                link.appendChild(arrow);
                link.appendChild(name);


                clinicalModuleList
                    .appendChild(link);
            }
        );
    }


    /* =====================================================
       INIT
    ====================================================== */

    if (!treatments.length) {

        console.error(
            "Treatments data not found."
        );

        return;
    }


    renderTreatment(
        currentTreatment
    );

    renderSidebar();

})();