(function () {
    "use strict";


    /* =========================================================
       PHOTO CARD
    ========================================================= */

    function createPhoto(item) {
        return `
            <a
                href="${item.image}"
                class="gallery-item"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="${item.title}"
            >
                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy"
                >
            </a>
        `;
    }


    /* =========================================================
       VIDEO CARD
    ========================================================= */

    function createVideo(item) {
        return `
            <article class="video-card">

                <div class="video-embed">

                    <iframe
                        src="${item.embed}"
                        title="${item.title}"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>

                </div>

                <div class="video-content">

                    <span>
                        ${item.category || "Women's Health"}
                    </span>

                    <h3>
                        ${item.title}
                    </h3>

                </div>

            </article>
        `;
    }


    /* =========================================================
       RENDER
    ========================================================= */

    function renderGallery(root) {

        if (!root || !window.GALLERY_DATA) {
            return;
        }


        const allPhotos =
            window.GALLERY_DATA.photos || [];

        const allVideos =
            window.GALLERY_DATA.videos || [];


        const isHomeGallery =
            root.hasAttribute("data-home-gallery");


        /* HOME = FIRST 8 PHOTOS / FIRST 4 VIDEOS
           GALLERY PAGE = ALL
        */

        const photos =
            isHomeGallery
                ? allPhotos.slice(0, 8)
                : allPhotos;


        const videos =
            isHomeGallery
                ? allVideos.slice(0, 4)
                : allVideos;


        root.innerHTML = `

            <div
                class="gallery-tabs"
                role="tablist"
                aria-label="Gallery categories"
            >

                <button
                    type="button"
                    class="gallery-tab active"
                    data-gallery-target="photos"
                    role="tab"
                    aria-selected="true"
                >
                    Photo Gallery
                </button>


                <button
                    type="button"
                    class="gallery-tab"
                    data-gallery-target="videos"
                    role="tab"
                    aria-selected="false"
                >
                    YouTube Videos
                </button>

            </div>


            <!-- ===============================
                 PHOTO PANEL
            ================================ -->

            <div
                class="gallery-content active"
                data-gallery-panel="photos"
            >

                <div class="gallery-grid">

                    ${photos.map(createPhoto).join("")}

                </div>

            </div>


            <!-- ===============================
                 VIDEO PANEL
            ================================ -->

            <div
                class="gallery-content"
                data-gallery-panel="videos"
            >

                <div class="video-grid">

                    ${videos.map(createVideo).join("")}

                </div>

            </div>


            ${
                isHomeGallery
                    ? `
                        <div class="gallery-view-more">

                            <a
                                href="gallery.html"
                                class="btn btn-outline"
                            >
                                View Full Gallery
                            </a>

                        </div>
                    `
                    : ""
            }
        `;
    }


    /* =========================================================
       TAB SWITCH
    ========================================================= */

    function initializeTabs(root) {

        const tabs =
            root.querySelectorAll(".gallery-tab");

        const panels =
            root.querySelectorAll(".gallery-content");


        tabs.forEach(tab => {

            tab.addEventListener("click", function () {

                const target =
                    this.dataset.galleryTarget;


                /* RESET TABS */

                tabs.forEach(item => {

                    item.classList.remove("active");

                    item.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });


                /* RESET PANELS */

                panels.forEach(panel => {

                    panel.classList.remove("active");

                });


                /* ACTIVE TAB */

                this.classList.add("active");

                this.setAttribute(
                    "aria-selected",
                    "true"
                );


                /* ACTIVE PANEL */

                const selectedPanel =
                    root.querySelector(
                        `[data-gallery-panel="${target}"]`
                    );


                if (selectedPanel) {

                    selectedPanel.classList.add("active");

                }

            });

        });

    }


    /* =========================================================
       INIT
    ========================================================= */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            const galleries =
                document.querySelectorAll(
                    "[data-gallery-component]"
                );


            galleries.forEach(root => {

                renderGallery(root);

                initializeTabs(root);

            });

        }
    );

})();