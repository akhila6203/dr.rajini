(function () {
    "use strict";


    function renderHomeBlogs() {

        const root =
            document.querySelector(
                "[data-home-blog-component]"
            );


        if (
            !root ||
            !Array.isArray(window.BLOG_DATA)
        ) {
            return;
        }


        /*
         * Home page:
         * only first 3 journal articles.
         */

        const blogs =
            window.BLOG_DATA.slice(0, 3);


        root.innerHTML =
            blogs.map(blog => `

                <article class="journal-card">

                    <a
                        href="blog-details.html?slug=${encodeURIComponent(blog.slug)}"
                        class="journal-image"
                        aria-label="${blog.title}"
                    >

                        <img
                            src="${blog.image}"
                            alt="${blog.title}"
                            loading="lazy"
                        >

                    </a>


                    <div class="journal-content">


                        <div class="journal-meta">

                            <span>
                                ${blog.category}
                            </span>

                            <span>
                                ${blog.readTime}
                            </span>

                        </div>


                        <h3>
                            ${blog.title}
                        </h3>


                        <p>
                            ${blog.excerpt}
                        </p>


                        <a
                            href="blog-details.html?slug=${encodeURIComponent(blog.slug)}"
                            class="journal-link"
                        >
                            Read Article
                        </a>


                    </div>

                </article>

            `).join("");

    }


    document.addEventListener(
        "DOMContentLoaded",
        renderHomeBlogs
    );

})();