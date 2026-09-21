document.addEventListener("DOMContentLoaded", () => {
    initHomeHero();
    renderHomeExpertise();
    renderHomeServices();
});


/* =========================================================
   HERO
========================================================= */

function initHomeHero() {
    const slides = Array.from(
        document.querySelectorAll(".home-hero-slide")
    );

    const prev = document.getElementById("homeHeroPrev");
    const next = document.getElementById("homeHeroNext");
    const dotsContainer = document.getElementById("homeHeroDots");

    if (!slides.length) return;

    let current = 0;
    let timer;

    slides.forEach((_, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

        dot.addEventListener("click", () => {
            showSlide(index);
            restart();
        });

        dotsContainer?.appendChild(dot);
    });

    const dots = Array.from(
        dotsContainer?.querySelectorAll("button") || []
    );

    function showSlide(index) {
        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === current);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === current);
        });
    }

    function start() {
        stop();

        timer = setInterval(() => {
            showSlide(current + 1);
        }, 6000);
    }

    function stop() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function restart() {
        start();
    }

    prev?.addEventListener("click", () => {
        showSlide(current - 1);
        restart();
    });

    next?.addEventListener("click", () => {
        showSlide(current + 1);
        restart();
    });

    const hero = document.querySelector(".home-hero");

    hero?.addEventListener("mouseenter", stop);
    hero?.addEventListener("mouseleave", start);

    showSlide(0);
    start();
}


/* =========================================================
   OUR EXPERTISE DATA
========================================================= */

const homeExpertise = [
    {
        icon: "fa-regular fa-heart",
        title: "LAPAROSCOPY",
        featured: false,
        items: [
            "Total Laparoscopic Hysterectomy.",
            "Laparoscopic myomectomy. (fibroid removal)",
            "Lap ovarian cystectomy- removal of ovarian cyst and wall.",
            "Laparoscopic endometriotic cystectomy.",
            "Laparoscopic Dermoid cystectomy",
            "Laparoscopic abdominal cerclage",
            "Laparoscopic ectopic pregnancy management.",
            "Lap ovarian drilling for PCOD (polycystic ovaries).",
            "Lap adhesiolysis.",
            "Lap tubal recanalization – post tubal sterilization",
            "Lap metroplasty"
        ]
    },
        {
        icon: "fa-solid fa-plus",
        title: "FAMILY PLANNING SURGERIES.",
        featured: false,
        items: [
            "Total abdominal hysterectomies",
            "Myomectomies",
            "Tuboplasty",
            "Tubal recanalisations",
            "vaginal prolapse surgeries",
            "Cystocele & rectocele",
            "MIRENA insertions for Abnormal uterine bleeding",
            "Cryocauterization & LLETZ of cervix for cervical erosions etc",
            "Cervical Conization for cervical dysplasias",
            "Colposcopy and Vaginoscopy",
            "Family planning and other surgeries"
        ]
    },
    
    {
        icon: "fa-regular fa-heart",
        title: "HIGH RISK OBSTETRICS",
        featured: true,
        items: [
            "Obstetrical emergencies: Emergency cerclage, Multiple pregnancies, Antepartum haemorrhage, PROM, Preterm, CPD, Malpresentations, Eclampsia, Severe PIH, Gestational DM, Pr LsCs, Rh Incompatibilities, Bad Obstetric histories, Postpartum haemorrhage",
            "Fibroids, Ovarian cysts complicating pregnancies",
            "Medical disorders complicating pregnancies - Heart disease, Diabetes, Epilepsy, Thyroid disorders, Chronic renal failure, Autoimmune conditions, Acute viral & bacterial illnesses, Liver disorders, blood disorders complicating pregnancies"
        ]
    },
     {
        icon: "fa-regular fa-clock",
        title: "MENOPAUSAL CLINICS",
        featured: false,
        items: [
            "Counselling",
            "Risk evaluation - Clinical examination, BMD, Mammogram etc",
            "Management - Hormonal replacement & Non-hormonal management."
        ]
    },

    {
        icon: "fa-solid fa-globe",
        title: "INFERTILITY",
        featured: false,
        items: [
            "Evaluation - male & female",
            "Endometrial and ovarian rejuvenation.",
            "Induction of ovulation",
            "Follicular tracking",
            "Intrauterine inseminations"
        ]
    },

    {
        icon: "fa-solid fa-link",
        title: "HYSTEROSCOPY",
        featured: false,
        items: [
            "Hysteroscopic septal resections for septate uterus",
            "Hysteroscopic myomectomies for submucosal fibroids",
            "Hysteroscopic polypectomies",
            "Hysteroscopic fallopian tube cannulation for cornual blocks of fallopian tube",
            "Hysteroscopic TCRE",
            "Hysteroscopic removal of missing IUCD",
            "Hysteroscopic Asherman's release"
        ]
    },

    {
        icon: "fa-solid fa-flask",
        title: "ROBOTIC SURGERIES",
        featured: true,
        items: [
            "Minimal access robotic hysterectomy",
            "Minimal Access robotic myomectomy",
            "Minimal access ovarian cystectomy."
        ]
    },


    {
        icon: "fa-solid fa-wand-magic-sparkles",
        title: "COSMETIC GYNECOLOGY",
        featured: false,
        items: [
            "Vaginal rejuvenation",
            "Signature kamasutra shots",
            "G Shot Amplification"
        ]
    },

   

    {
        icon: "fa-regular fa-comments",
        title: "COUNSELLING",
        featured: false,
        items: [
            "Premarital counseling",
            "Contraceptive counselling",
            "Preconceptional counseling"
        ]
    }
];


function renderHomeExpertise() {
    const grid = document.getElementById("homeExpertiseGrid");

    if (!grid) return;

    grid.innerHTML = homeExpertise.map(item => `
        <article
            class="home-expertise-detail-card
            ${item.featured ? "featured" : ""}"
        >
            <div class="home-expertise-card-head">

                <span class="home-expertise-card-icon">
                    <i class="${item.icon}"></i>
                </span>

                <h3>${item.title}</h3>

            </div>

            <div class="home-expertise-divider"></div>

            <ul>
                ${item.items.map(text => `
                    <li>
                        <span class="expertise-star">✦</span>
                        <span>${text}</span>
                    </li>
                `).join("")}
            </ul>
        </article>
    `).join("");
}


const homeServices = [
    {
        category: "CARE",
        title: "Obstetrics",
        text: "Comprehensive pregnancy care, delivery services, and maternal health management.",
        image: "assets/images/service3.png",
        url: "treatments.html?service=obstetrics"
    },

    {
        category: "CARE",
        title: "High Risk Obstetrics",
        text: "Advanced maternal-fetal care for complex and high-risk pregnancies.",
        image: "assets/images/highrisk.png",
        url: "treatments.html?service=high-risk-obstetrics"
    },

    {
        category: "WELLNESS",
        title: "General Gynecology",
        text: "Comprehensive routine check-ups, screenings, and preventive care.",
        image: "assets/images/service-general-gyn.jpg",
        url: "treatments.html?service=general-gynecology"
    },

    {
        category: "SURGERY",
        title: "Surgical Gynecology",
        text: "Expert surgical treatments for various complex gynecological conditions.",
        image: "assets/images/service5.png",
        url: "treatments.html?service=surgical-gynecology"
    },

    {
        category: "FERTILITY",
        title: "Infertility Care",
        text: "Personalized fertility evaluation and treatment support.",
        image: "assets/images/service-infertility.jpg",
        url: "treatments.html?service=infertility"
    },

    {
        category: "SURGERY",
        title: "Laparoscopic Surgery",
        text: "Advanced minimally invasive gynecological surgical procedures.",
        image: "assets/images/service4.png",
        url: "treatments.html?service=laparoscopy"
    },

     /* =====================================================
       NEW SERVICE - ROBOTIC SURGERY
    ===================================================== */
    {
        category: "ADVANCED SURGERY",
        title: "Robotic Surgery",
        text: "Advanced robotic-assisted gynecological surgery offering enhanced precision and minimally invasive care.",
        image: "assets/images/service1.png",
        url: "treatments.html?service=robotic-assisted-surgery"
    },

    /* =====================================================
       NEW SERVICE - COSMETIC GYNECOLOGY
    ===================================================== */
    {
        category: "WOMEN'S WELLNESS",
        title: "Cosmetic Gynecology",
        text: "Personalized cosmetic and functional gynecology care focused on women's comfort, confidence and well-being.",
        image: "assets/images/service7.png",
        url: "treatments.html?service=cosmetic-gynecology"
    },

    /* =====================================================
       NEW SERVICE - MENOPAUSE CLINIC
    ===================================================== */
    {
        category: "WELLNESS",
        title: "Menopause Clinic",
        text: "Comprehensive support for women through menopause, including evaluation and personalized symptom management.",
        image: "assets/images/service8.png",
        url: "treatments.html?service=menopausal-clinic"
    },

    /* =====================================================
       NEW SERVICE - COUNSELLING
    ===================================================== */
    {
        category: "SUPPORT",
        title: "Counselling Services",
        text: "Supportive counselling for preconception, contraception and important stages of women's reproductive health.",
        image: "assets/images/d9.png",
        url: "treatments.html?service=counselling-services"
    },
    {
        category: "PROCEDURE",
        title: "Hysteroscopy Procedures",
        text: "Advanced hysteroscopic procedures for the diagnosis and treatment of conditions affecting the uterine cavity.",
        image: "assets/images/service9.png",
        url: "treatments.html?service=hysteroscopy-procedures"
    },

    {
        category: "EMERGENCY CARE",
        title: "Emergency Surgeries",
        text: "Timely surgical care for urgent gynecological and obstetric conditions requiring immediate medical attention.",
        image: "assets/images/service6.png",
        url: "treatments.html?service=emergency-surgeries"
    },
];


function renderHomeServices() {
    const track = document.getElementById("homeServicesTrack");

    if (!track) return;

    track.innerHTML = homeServices.map(service => `
        <article class="home-healthcare-card">

            <img
                src="${service.image}"
                alt="${service.title}"
                loading="lazy"
            >

            <div class="home-healthcare-overlay"></div>

            <div class="home-healthcare-card-content">

                <span class="home-healthcare-category">
                    ${service.category}
                </span>

                <h3>
                    ${service.title}
                </h3>

                <p>
                    ${service.text}
                </p>

                <a
                    href="${service.url}"
                    class="home-healthcare-btn"
                >
                    KNOW MORE

                    <i class="fa-solid fa-arrow-right"></i>
                </a>

            </div>

        </article>
    `).join("");

    initHomeServicesCarousel();
}


function initHomeServicesCarousel() {

    const track =
        document.getElementById("homeServicesTrack");

    const viewport =
        document.getElementById("homeServicesViewport");

    const prev =
        document.querySelector(".healthcare-prev");

    const next =
        document.querySelector(".healthcare-next");

    if (!track || !viewport) return;

    /* Prevent duplicate initialization */
    if (track.dataset.infiniteInitialized === "true") {
        return;
    }

    track.dataset.infiniteInitialized = "true";


    /* =====================================================
       ORIGINAL CARDS
    ===================================================== */

    const originalCards =
        Array.from(
            track.querySelectorAll(".home-healthcare-card")
        );

    if (!originalCards.length) return;


    const originalCount =
        originalCards.length;


    /* =====================================================
       CLONE FULL SET BEFORE + AFTER

       Original:
       1 2 3 4

       DOM becomes:
       1 2 3 4 | 1 2 3 4 | 1 2 3 4

       User visually gets:
       1 2 3 4 1 2 3 4 1 2...
    ===================================================== */

    originalCards.forEach(card => {

        const clone =
            card.cloneNode(true);

        clone.setAttribute(
            "aria-hidden",
            "true"
        );

        track.appendChild(clone);

    });


    [...originalCards]
        .reverse()
        .forEach(card => {

            const clone =
                card.cloneNode(true);

            clone.setAttribute(
                "aria-hidden",
                "true"
            );

            track.insertBefore(
                clone,
                track.firstChild
            );

        });


    let currentIndex =
        originalCount;

    let cardWidth = 0;

    let gap = 18;

    let moving = false;

    let autoplay = null;


    /* =====================================================
       VISIBLE CARDS
    ===================================================== */

    function getVisibleCount() {

        if (window.innerWidth <= 640) {
            return 1;
        }

        if (window.innerWidth <= 991) {
            return 2;
        }

        return 4;
    }


    /* =====================================================
       GET ALL CARDS INCLUDING CLONES
    ===================================================== */

    function getAllCards() {

        return Array.from(
            track.querySelectorAll(
                ".home-healthcare-card"
            )
        );

    }


    /* =====================================================
       CALCULATE CARD WIDTH
    ===================================================== */

    function calculateSizes() {

        const visible =
            getVisibleCount();

        cardWidth =
            (
                viewport.clientWidth -
                gap * (visible - 1)
            ) / visible;


        getAllCards().forEach(card => {

            card.style.flex =
                `0 0 ${cardWidth}px`;

        });

    }


    /* =====================================================
       MOVE
    ===================================================== */

    function moveTo(index, animate = true) {

        currentIndex = index;

        track.style.transition =
            animate
                ? "transform 0.48s ease"
                : "none";


        const position =
            currentIndex *
            (cardWidth + gap);


        track.style.transform =
            `translate3d(-${position}px, 0, 0)`;

    }


    /* =====================================================
       NEXT
    ===================================================== */

    function goNext() {

        if (moving) return;

        moving = true;

        moveTo(
            currentIndex + 1,
            true
        );

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function goPrev() {

        if (moving) return;

        moving = true;

        moveTo(
            currentIndex - 1,
            true
        );

    }


    /* =====================================================
       INFINITE RESET

       Reset happens without transition,
       therefore user cannot see jump.
    ===================================================== */

    track.addEventListener(
        "transitionend",
        () => {

            moving = false;


            /*
             Reached cloned right side
            */

            if (
                currentIndex >=
                originalCount * 2
            ) {

                currentIndex =
                    originalCount;

                moveTo(
                    currentIndex,
                    false
                );

            }


            /*
             Reached cloned left side
            */

            if (
                currentIndex <
                originalCount
            ) {

                currentIndex =
                    currentIndex +
                    originalCount;

                moveTo(
                    currentIndex,
                    false
                );

            }

        }
    );


    /* =====================================================
       BUTTONS
    ===================================================== */

    next?.addEventListener(
        "click",
        () => {

            stopAutoplay();

            goNext();

            startAutoplay();

        }
    );


    prev?.addEventListener(
        "click",
        () => {

            stopAutoplay();

            goPrev();

            startAutoplay();

        }
    );


    /* =====================================================
       AUTO SLIDE
    ===================================================== */

    function startAutoplay() {

        stopAutoplay();

        autoplay =
            setInterval(
                goNext,
                3500
            );

    }


    function stopAutoplay() {

        if (autoplay) {

            clearInterval(autoplay);

            autoplay = null;

        }

    }


    /* =====================================================
       PAUSE ON HOVER
    ===================================================== */

    viewport.addEventListener(
        "mouseenter",
        stopAutoplay
    );


    viewport.addEventListener(
        "mouseleave",
        startAutoplay
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer =
                setTimeout(
                    () => {

                        calculateSizes();

                        moveTo(
                            currentIndex,
                            false
                        );

                    },
                    120
                );

        }
    );


    /* =====================================================
       INITIAL POSITION
    ===================================================== */

    calculateSizes();

    moveTo(
        currentIndex,
        false
    );

    startAutoplay();

}
