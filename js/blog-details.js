(function () {
    "use strict";

    const blogs = window.BLOG_DATA || [];

    if (!blogs.length) return;


    const params =
        new URLSearchParams(window.location.search);

    const slug =
        params.get("slug") || blogs[0].slug;


    const current =
        blogs.find(blog => blog.slug === slug) ||
        blogs[0];


    document.title =
        current.title + " | Dr. Muthineni Rajini";


    document.getElementById(
        "detailBreadcrumb"
    ).textContent = current.title;


    document.getElementById(
        "detailBannerTitle"
    ).textContent = current.title;


    document.getElementById(
        "detailDate"
    ).textContent = current.date;


    document.getElementById(
        "detailCategory"
    ).textContent = current.category;


    const image =
        document.getElementById("detailImage");

    image.src = current.image;

    image.alt = current.title;


    document.getElementById(
        "detailContent"
    ).innerHTML = current.content
        .map(text => `<p>${text}</p>`)
        .join("");


    const recent =
        document.getElementById("recentPosts");


    recent.innerHTML = blogs
        .filter(blog => blog.slug !== current.slug)
        .map(blog => `

            <a
                href="blog-details.html?slug=${blog.slug}"
                class="recent-post"
            >

                <img
                    src="${blog.image}"
                    alt="${blog.title}"
                >

                <div>

                    <h4>
                        ${blog.title}
                    </h4>

                    <span>
                        ${blog.date}
                    </span>

                </div>

            </a>

        `)
        .join("");

})();