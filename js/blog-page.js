(function () {
    "use strict";

    const root =
        document.getElementById("blogList");

    if (!root || !window.BLOG_DATA) return;


    root.innerHTML = window.BLOG_DATA.map(blog => `

        <article class="blog-list-card">

            <a
                href="blog-details.html?slug=${blog.slug}"
                class="blog-card-image"
            >
                <img
                    src="${blog.image}"
                    alt="${blog.title}"
                >

                <span class="blog-date">
                    ${blog.date}
                </span>
            </a>


            <div class="blog-card-meta">

                <span>
                    <i class="fa-solid fa-user"></i>
                    admin
                </span>

                <span class="meta-dot"></span>

                <span>
                    <i class="fa-solid fa-comment"></i>
                    0 Comments
                </span>

            </div>


            <div class="blog-card-content">

                <h3>

                    <a href="blog-details.html?slug=${blog.slug}">
                        ${blog.title}
                    </a>

                </h3>


                <p>
                    ${blog.excerpt}
                </p>


                <a
                    href="blog-details.html?slug=${blog.slug}"
                    class="blog-read-more"
                >
                    Read More

                    <i class="fa-solid fa-arrow-right"></i>
                </a>

            </div>

        </article>

    `).join("");

})();