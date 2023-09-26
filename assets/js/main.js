document.addEventListener('DOMContentLoaded', function () {

    /* Наведение на превью на главном экране карточки */
    // let previewDots = document.querySelectorAll('.preview-dots .preview-dots_img-container .preview-dots_img');

    // previewDots.forEach(item => {
    //     item.addEventListener('mouseover', (e) => {
    //         previewDots.forEach(el => { el.classList.remove('active'); });
    //         item.classList.add('active');
    //     });
    // });

    /* Зум на главном слайдере */
    $('.main-slider_item').zoom();


    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: false,
        vertical: false,
        infinite: false,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        arrows: true,
        vertical: true,
        infinite: false,
        focusOnSelect: true,
        prevArrow: '.preview-dots button.up',
        nextArrow: '.preview-dots button.down',
    });



    /* Переключение табов */
    var nestedTabSelect = (tabsElement, currentElement) => {
        const allCharacteristic = document.querySelector('.all-characteristic a');
        const tabs = tabsElement ?? 'ul.card-tabs';

        const currentClass = currentElement ?? 'active';

        document.querySelectorAll(tabs).forEach(function (tabContainer) {
            let activeLink,
                activeContent;
            const links = Array.from(tabContainer.querySelectorAll("a"));

            activeLink =
                links.find(function (link) {
                    return link.querySelector("href") === location.hash;
                }) || links[0];
            activeLink.classList.add(currentClass);
            activeLink.parentNode.classList.add('active');

            activeContent = document.querySelector(activeLink.getAttribute("href"));
            activeContent.classList.add(currentClass);

            links.forEach(function (link) {
                if (link !== activeLink) {
                    const content = document.querySelector(link.getAttribute("href"));
                    content.classList.remove(currentClass);
                }
            });

            tabContainer.addEventListener("click", function (e) {
                if (e.target.tagName === "A") {

                    activeLink.classList.remove(currentClass);
                    activeLink.parentNode.classList.remove('active');
                    activeContent.classList.remove(currentClass);

                    document.querySelector('.card-tabs li:nth-child(2)').classList.remove("active");
                    document.getElementById('characteristic').classList.remove("active");

                    activeLink = e.target;
                    activeContent = document.querySelector(activeLink.getAttribute("href"));

                    activeLink.classList.add(currentClass);
                    activeLink.parentNode.classList.add('active');
                    activeContent.classList.add(currentClass);

                    e.preventDefault();
                }
            });



            allCharacteristic.addEventListener("click", function (e) {
                activeLink.classList.remove(currentClass);
                activeLink.parentNode.classList.remove('active');
                activeContent.classList.remove(currentClass);

                document.querySelector('.card-tabs li:nth-child(2)').classList.add("active");
                document.getElementById('characteristic').classList.add("active");
                e.preventDefault();
            });

        });


    };
    nestedTabSelect('ul.card-tabs', 'active');


    /* Плавающая форма */
    if (window.matchMedia("(min-width: 1025px)").matches) {
        (function () {
            var a = document.querySelector('#card-form_sticky'),
                b = null,
                P = 0;
            window.addEventListener('scroll', Ascroll, false);
            document.body.addEventListener('scroll', Ascroll, false);
            function Ascroll() {
                if (b == null) {
                    var Sa = getComputedStyle(a, ''), s = '';
                    for (var i = 0; i < Sa.length; i++) {
                        if (Sa[i].indexOf('overflow') == 0 ||
                            Sa[i].indexOf('padding') == 0 ||
                            Sa[i].indexOf('border') == 0 ||
                            Sa[i].indexOf('outline') == 0 ||
                            Sa[i].indexOf('box-shadow') == 0 ||
                            Sa[i].indexOf('background') == 0) {
                            s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; '
                        }
                    }
                    b = document.createElement('div');
                    b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
                    a.insertBefore(b, a.firstChild);
                    var l = a.childNodes.length;
                    for (var i = 1; i < l; i++) {
                        b.appendChild(a.childNodes[1]);
                    }
                    a.style.height = b.getBoundingClientRect().height + 'px';
                    a.style.padding = '0';
                    a.style.border = '0';
                }
                var Ra = a.getBoundingClientRect(),
                    R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.card-main_bottom').getBoundingClientRect().bottom);
                if ((Ra.top - P) <= 0) {
                    if ((Ra.top - P) <= R) {
                        b.className = 'stop';
                        b.style.top = - R + 'px';
                    } else {
                        b.className = 'sticky';
                        b.style.top = P + 'px';
                    }
                } else {
                    b.className = '';
                    b.style.top = '';
                }
                window.addEventListener('resize', function () {
                    a.children[0].style.width = getComputedStyle(a, '').width
                }, false);
            }
        })();
    }



    /* Аккордион */
    const accordion = document.querySelectorAll('.accordion .question');
    let mainParent;
    let height;
    let answer;
    accordion.forEach(item => {
        item.addEventListener('click', () => {
            height = item.nextElementSibling.firstElementChild.offsetHeight;
            answer = item.nextElementSibling;
            mainParent = item.parentElement;
            if (mainParent.classList.contains('active')) {
                mainParent.classList.remove('active');
                answer.style.height = `0px`;
                answer.style.marginTop = '0px';
            } else {
                mainParent.classList.add('active');
                answer.style.height = `${height}px`;
                answer.style.marginTop = '30px';
            }
        });
    });




    /* Слайдер "Рекомендуем" */
    $(".card-recomendation_items").slick({
        dots: true,
        dotsClass: 'slide-dots',
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        infinite: false,
        autoplay: false,
        nextArrow: '.next-btn',
        prevArrow: '.prev-btn',
    });
    $(".prev-btn").click(function () {
        $(".slick-list").slick("slickPrev");
    });

    $(".next-btn").click(function () {
        $(".slick-list").slick("slickNext");
    });
    $(".prev-btn").addClass("slick-disabled");
    $(".slick-list").on("afterChange", function () {
        if ($(".slick-prev").hasClass("slick-disabled")) {
            $(".prev-btn").addClass("slick-disabled");
        } else {
            $(".prev-btn").removeClass("slick-disabled");
        }
        if ($(".slick-next").hasClass("slick-disabled")) {
            $(".next-btn").addClass("slick-disabled");
        } else {
            $(".next-btn").removeClass("slick-disabled");
        }
    });



});