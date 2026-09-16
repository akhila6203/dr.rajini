(function () {
    'use strict';

    var initialized = false;

    function getBasePath() {
        var script = document.querySelector('script[src*="components.js"]');
        var src = script ? script.getAttribute('src') || '' : '';
        if (src.indexOf('../') === 0) {
            return '../';
        }

        var path = (window.location.pathname || '').replace(/\\/g, '/');
        if (/\/treatments(\/|$)/i.test(path)) {
            return '../';
        }

        return '';
    }

    function isHomePage() {
        var current = (window.location.pathname || '').split('/').pop() || '';
        return !current || current === 'index.html';
    }

    function rewriteComponentPaths(root, basePath) {
        if (!root) {
            return;
        }

        root.querySelectorAll('[href]').forEach(function (el) {
            var href = el.getAttribute('href');
            if (!href || /^(https?:|mailto:|tel:|javascript:)/i.test(href) || href.indexOf('../') === 0) {
                return;
            }
            if (/^#/.test(href)) {
                if (isHomePage()) {
                    return;
                }
                el.setAttribute('href', basePath + 'index.html' + href);
                return;
            }
            if (/^index\.html#/i.test(href)) {
                if (isHomePage()) {
                    el.setAttribute('href', href.replace(/^index\.html/i, ''));
                } else {
                    el.setAttribute('href', basePath + href);
                }
                return;
            }
            if (href.indexOf('treatments/') === 0) {
                el.setAttribute('href', href.replace(/^treatments\//, ''));
            } else if (basePath) {
                el.setAttribute('href', basePath + href);
            }
        });

        root.querySelectorAll('[src]').forEach(function (el) {
            var src = el.getAttribute('src');
            if (!src || /^(https?:|data:)/i.test(src) || src.indexOf('../') === 0) {
                return;
            }
            el.setAttribute('src', basePath + src);
        });
    }

    function loadText(url) {
        return fetch(url).then(function (r) {
            if (!r.ok) {
                throw new Error('Request failed');
            }
            return r.text();
        }).catch(function () {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = function () {
                    if (xhr.status === 200 || xhr.status === 0) {
                        resolve(xhr.responseText);
                    } else {
                        reject(new Error('Component not found: ' + url));
                    }
                };
                xhr.onerror = function () {
                    reject(new Error('Component not found: ' + url));
                };
                xhr.send();
            });
        });
    }

    function loadPartial(id, file, basePath) {
        var el = document.getElementById(id);
        if (!el) {
            return Promise.resolve(null);
        }
        return loadText(basePath + 'components/' + file).then(function (html) {
            el.innerHTML = html;
            rewriteComponentPaths(el, basePath);
            return html;
        });
    }

    function loadComponents() {
        var headerPlaceholder =
            document.getElementById('site-header') ||
            document.getElementById('header-placeholder');
        var footerPlaceholder =
            document.getElementById('site-footer') ||
            document.getElementById('footer-placeholder');

        var basePath = getBasePath();

        Promise.all([
            headerPlaceholder
                ? loadText(basePath + 'components/header.html')
                : Promise.resolve(null),
            footerPlaceholder
                ? loadText(basePath + 'components/footer.html')
                : Promise.resolve(null),
            // loadPartial('services-carousel', 'services-carousel.html', basePath),
            loadPartial('contact-content', 'contact-section.html', basePath)
        ])
            .then(function (parts) {
                if (headerPlaceholder && parts[0] !== null) {
                    headerPlaceholder.innerHTML = parts[0];
                    rewriteComponentPaths(headerPlaceholder, basePath);
                }
                if (footerPlaceholder && parts[1] !== null) {
                    footerPlaceholder.innerHTML = parts[1];
                    rewriteComponentPaths(footerPlaceholder, basePath);
                }
                initHeader();
                initFooter();

                document.dispatchEvent(
                    new Event('components:loaded')
                );
                // document.dispatchEvent(new Event('components:loaded'));
                // initHeader();
                // initFooter();
            })
            .catch(function (err) {
                console.error('Failed to load site components:', err);
            });
    }

 function initHeader() {

    if (initialized) {
        return;
    }


    var header =
        document.querySelector('.site-header');

    var menuBtn =
        document.querySelector('.mobile-menu-btn');

    var mobileNav =
        document.querySelector('.mobile-navigation');


    if (!header || !menuBtn || !mobileNav) {
        return;
    }


    initialized = true;


    var menuClose =
        document.querySelector('.mobile-menu-close');

    var menuOverlay =
        document.querySelector('.mobile-menu-overlay');

    var treatToggle =
        document.querySelector('.mobile-treatment-toggle');

    var treatMenu =
        document.querySelector('.mobile-treatment-menu');

    var navDropdown =
        document.querySelector('.nav-dropdown');

    var dropdownToggle =
        document.querySelector('.nav-dropdown-toggle');

    var backToTop =
        document.querySelector('.back-to-top');


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function onScroll() {

        header.classList.toggle(
            'scrolled',
            window.scrollY > 10
        );


        if (backToTop) {

            var show =
                window.scrollY > 400;

            backToTop.classList.toggle(
                'show',
                show
            );

            backToTop.classList.toggle(
                'visible',
                show
            );
        }
    }


    window.addEventListener(
        'scroll',
        onScroll,
        { passive: true }
    );

    onScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function openMobileMenu() {

        mobileNav.classList.add('active');

        menuOverlay &&
            menuOverlay.classList.add('active');

        menuBtn.classList.add('active');

        menuBtn.setAttribute(
            'aria-expanded',
            'true'
        );

        document.body.classList.add(
            'menu-open'
        );
    }


    function closeMobileMenu() {

        mobileNav.classList.remove('active');

        menuOverlay &&
            menuOverlay.classList.remove('active');

        menuBtn.classList.remove('active');

        menuBtn.setAttribute(
            'aria-expanded',
            'false'
        );

        document.body.classList.remove(
            'menu-open'
        );
    }


    menuBtn.addEventListener(
        'click',
        function (e) {

            e.preventDefault();
            e.stopPropagation();

            if (
                mobileNav.classList.contains(
                    'active'
                )
            ) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
    );


    menuClose &&
        menuClose.addEventListener(
            'click',
            function (e) {

                e.preventDefault();

                closeMobileMenu();
            }
        );


    menuOverlay &&
        menuOverlay.addEventListener(
            'click',
            function () {

                closeMobileMenu();
            }
        );


    /* =====================================================
       MOBILE TREATMENTS DROPDOWN
    ===================================================== */

    if (treatToggle && treatMenu) {

        treatToggle.addEventListener(
            'click',
            function (e) {

                e.preventDefault();
                e.stopPropagation();


                var open =
                    treatMenu.classList.toggle(
                        'active'
                    );


                treatToggle.classList.toggle(
                    'active',
                    open
                );


                treatToggle.setAttribute(
                    'aria-expanded',
                    open
                        ? 'true'
                        : 'false'
                );
            }
        );
    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER LINK CLICK
    ===================================================== */

    mobileNav
        .querySelectorAll('a')
        .forEach(function (link) {

            link.addEventListener(
                'click',
                function () {

                    /*
                       Do not prevent normal navigation.
                       Browser must open href normally.
                    */

                    closeMobileMenu();
                }
            );
        });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        'keydown',
        function (e) {

            if (
                e.key === 'Escape' &&
                mobileNav.classList.contains(
                    'active'
                )
            ) {
                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       TABLET -> DESKTOP RESIZE
    ===================================================== */

    window.addEventListener(
        'resize',
        function () {

            if (window.innerWidth > 980) {

                closeMobileMenu();

                if (treatMenu) {
                    treatMenu.classList.remove(
                        'active'
                    );
                }

                if (treatToggle) {

                    treatToggle.classList.remove(
                        'active'
                    );

                    treatToggle.setAttribute(
                        'aria-expanded',
                        'false'
                    );
                }
            }
        }
    );


    /* =====================================================
       HOME HASH LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href*="#"]')
        .forEach(function (link) {

            link.addEventListener(
                'click',
                function (e) {

                    var href =
                        link.getAttribute(
                            'href'
                        ) || '';


                    var hashIndex =
                        href.indexOf('#');


                    if (hashIndex === -1) {
                        return;
                    }


                    var hash =
                        href.slice(hashIndex);


                    var page =
                        href.slice(
                            0,
                            hashIndex
                        ) || 'index.html';


                    var onHome =
                        isHomePage();


                    if (
                        onHome &&
                        (
                            page === '' ||
                            page === 'index.html' ||
                            page.endsWith('/')
                        )
                    ) {

                        var target =
                            document.querySelector(
                                hash
                            );


                        if (target) {

                            e.preventDefault();

                            closeMobileMenu();

                            scrollToSection(hash);
                        }
                    }
                }
            );
        });


    /* =====================================================
       DESKTOP DROPDOWN OUTSIDE CLICK
    ===================================================== */

    document.addEventListener(
        'click',
        function (e) {

            if (
                navDropdown &&
                !navDropdown.contains(e.target)
            ) {

                navDropdown.classList.remove(
                    'open'
                );


                if (dropdownToggle) {

                    dropdownToggle.setAttribute(
                        'aria-expanded',
                        'false'
                    );
                }
            }
        }
    );


    /* =====================================================
       ACTIVE PAGE
    ===================================================== */

    var path =
        (
            window.location.pathname || ''
        ).replace(/\\/g, '/');


    var current =
        path.split('/').pop() ||
        'index.html';


    var pageKey =
        current.replace(
            '.html',
            ''
        );


    document
        .querySelectorAll(
            '.desktop-navigation > a, ' +
            '.mobile-navigation-inner > a, ' +
            '.mobile-bottom-item'
        )
        .forEach(function (link) {

            var href =
                (
                    link.getAttribute(
                        'href'
                    ) || ''
                )
                    .split('#')[0]
                    .split('?')[0]
                    .split('/')
                    .pop() || '';


            var linkKey =
                href.replace(
                    '.html',
                    ''
                );


            var isActive =
                href === current ||
                linkKey === pageKey;


            if (
                pageKey === 'index' &&
                (
                    href === 'index.html' ||
                    href === ''
                )
            ) {
                isActive = true;
            }


            link.classList.toggle(
                'active',
                isActive
            );
        });


    if (
        navDropdown &&
        (
            pageKey === 'treatments' ||
            pageKey === 'treatment-details'
        )
    ) {

        var treatmentDesktopLink =
            navDropdown.querySelector(
                '.nav-dropdown-toggle'
            );


        treatmentDesktopLink &&
            treatmentDesktopLink.classList.add(
                'active'
            );
    }
}


    function scrollToSection(hash) {
        var target = document.querySelector(hash);
        if (!target) {
            return;
        }
        var header = document.querySelector('.site-header');
        var offset = header ? header.offsetHeight + 12 : 92;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
        history.pushState(null, '', hash);
    }

    window.scrollToSection = scrollToSection;

    function initFooter() {
        var yearEl = document.querySelector('.current-year');
        if (yearEl) {
            yearEl.textContent = String(new Date().getFullYear());
        }

        var backToTop = document.querySelector('.back-to-top');
        backToTop && backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComponents);
    } else {
        loadComponents();
    }
})();
