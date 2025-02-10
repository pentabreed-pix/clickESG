var frontCommon = frontCommon || {};
frontCommon.Html = (function () {
    var instance = null;
    function init() {
    instance = {
        reset: function () {
            frontCommonResize();
            frontCommonScroll();
            lenis();
            header();
            activeAnimationType_1();
            //accordion();
            activeItemOnlyPc('.process, .feature');
            activeItemOnlyMo('.feature');
            scrollTopBtn();
            //footer();
            //localAnimations();
            //business_Interaction();
            //scrollTopBtn();
        },
    };
    return instance;
}
if (instance) {
    return instance;
} else {
    return init();
}
})();

let lenisBody, lenisNav;

function frontCommonResize() {
    window.addEventListener("resize", () => {
    });
}

function frontCommonScroll() {
    window.addEventListener("scroll", () => {
    });
}

// lenis
function lenis() {
    const $body = $('body');
    const $siteNavi = $('.site-navi');

    if ($body.length) {
        lenisBody = new Lenis({
            wrapper: $body[0],
            content: $body.find('#wrap')[0]
        });
    }

    if ($siteNavi.length) {
        lenisNav = new Lenis({
            wrapper: $siteNavi[0],
            content: $siteNavi.find('.depth1-list')[0],
            duration: 2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
    }

    function raf(time) {
        (lenisBody && lenisBody.raf(time)) || (lenisNav && lenisNav.raf(time));
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

function scrollTopBtn() {
    const quickScrollBtnToTop = document.querySelector('.btn-to-top .top-btn');
    const topButton = document.querySelector('.btn-to-top');

    quickScrollBtnToTop.addEventListener('click', function(){
        if (lenisBody) {
            lenisBody.scrollTo(0, { duration: 1.5 });
        } else {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const pageBodyHeight = parseInt(document.querySelector('#wrap').clientHeight);
        const showLine = pageBodyHeight * 0.05;
        const contentHeight = document.querySelector('#main').clientHeight;
        const hotLine = contentHeight - window.innerHeight;

        if (scrollTop >= showLine) {
            topButton.classList.add('active');
        } else {
            topButton.classList.remove('active');
        }
        if (scrollTop >= hotLine) {
            topButton.classList.add('fixed');
        } else {
            topButton.classList.remove('fixed');
        }
    });
}

// header
function header() {
    const $body = $('body');
    const $header = $('#header');
    const $depth1List = $('.depth1-list');
    const $depth1Item = $('.depth1-list .depth1-item');
    const $depth1Link = $('.depth1-list .depth1-item .depth1');
    const $pageControl = $('.page-control .goto-page-navi');
    const $firstDepth1Item = $('.depth1-list .depth1-item').first();
    const $firstDepth1 = $firstDepth1Item.find('.depth1').first();

    const isDesktop = () => window.innerWidth >= 1024;

    const addDesktopEvents = () => {
        let timerIdFocus = '';

        $depth1Item.on('mouseenter focusin', function() {
            $header.addClass('pc-menu-open');
            clearTimeout(timerIdFocus);
            $depth1Item.removeClass('on');
            $(this).addClass('on');
        });

        $header.on('mouseleave focusout', function() {
            timerIdFocus = setTimeout(function() {
                $header.removeClass('pc-menu-open');
                $depth1Item.removeClass('on');
            }, 200);
        });
    };

    const removeDesktopEvents = () => {
        $depth1Item.off('mouseenter focusin');
        $header.off('mouseleave focusout');
        $header.removeClass('pc-menu-open');
    };

    const removeMobileEvents = () => {
        $body.removeClass('mo-menu-open');
        $header.removeClass('mo-menu-open');

        $('.depth1-item').removeClass('open');
        $('.depth2-wrap').css({'height': 0 +'px'});
    };

    const initHeaderPcEvent = () => {
        if (isDesktop()) {
            addDesktopEvents();
            removeMobileEvents();
            lenisBody.start();
        } else {
            removeDesktopEvents();
        }
    };

    $pageControl.on('click', () => {
        if (isDesktop()) {
            return false;
        } else {
            if($header.hasClass('mo-menu-open')){
                $header.removeClass('mo-menu-open');
                setTimeout(() => {
                    $body.removeClass('mo-menu-open');
                }, 200);
                lenisBody.start();
            }else{
                $body.addClass('mo-menu-open');
                $header.addClass('mo-menu-open');
                lenisBody.stop();

                $(document).on('keydown', function(e) {
                    if (e.key === 'Tab') {
                        setTimeout(() => {
                            if ($firstDepth1.length) {
                                $firstDepth1.focus();
                                $(document).off('keydown');
                            }
                        }, 10);
                    }
                });
            }
        }
    });

    $depth1Link.click(function () {
        var $this = $(this);
        var $this2depthH = $this.next('.depth2-wrap').find('.depth2-list').innerHeight();

        if (isDesktop()) {
            return false;
        } else {
            if( $this.closest('.depth1-item').hasClass('open')){
                $this.closest('.depth1-item').removeClass('open');
                $this.next('.depth2-wrap').css({'height': 0 +'px'})

            }else{
                $('.depth1-item').removeClass('open');
                $('.depth2-wrap').css({'height': 0 +'px'});
                $this.closest('.depth1-item').addClass('open');
                $this.next('.depth2-wrap').css({'height': $this2depthH +'px'})
            }
        }
    });

    let lastScrollTop = 0;

    const handleScroll = () => {
        if($('#header').hasClass('mo-menu-open')) {
            return false;
        }else {
            let winScrollTop = $(window).scrollTop();

            $header.toggleClass('scroll', winScrollTop > 0);

            if (winScrollTop > lastScrollTop) {
                $header.css('white', 'translateY(-100px)');
            } else {
                $header.css('transform', 'translateY(0)');
            }
            lastScrollTop = winScrollTop;
        }
    };

    initHeaderPcEvent();

    window.addEventListener('resize', initHeaderPcEvent);
    window.addEventListener('scroll', handleScroll);
}

// tab
function tab() {

    const tabDisplay = document.querySelectorAll(".tab-display")
    tabDisplay.forEach(tab => {
        const firstTab = tab.querySelector(".tab-item:first-child")
        firstTab.classList.add("active")
        firstTab.querySelector(".tab-text").setAttribute("aria-selected", "true")

        const tabList = tab.querySelector(".tab-list")
        tabList.addEventListener("keydown", function(e) {
            e = event || window.event;
            let keycode = e.keyCode || e.which;

            if(!e.shiftKey && keycode === 9) {
                let tabItem = this.querySelectorAll(".tab-item");
                tabItem.forEach(item => {
                    if(item.classList.contains("active")) {
                        const button = item.querySelector(".tab-text");
                        button.setAttribute("tabindex", "0");
                        button.setAttribute("aria-selected", "true")
                    } else {
                        const button = item.querySelector(".tab-text");
                        button.setAttribute("tabindex", "-1");
                        button.setAttribute("aria-selected", "false");
                    }
                });

                let siblingTabPanels = document.querySelectorAll(".panel-item.hidden");
                siblingTabPanels.forEach(panel => {
                    // panel.tabIndex = "-1";
                });
            }
        })
        const tabButton = tab.querySelectorAll(".tab-text")
        tabButton.forEach(button => {
            button.addEventListener("keydown", function(e) {
                e = event || window.event;
                let keycode = e.keyCode || e.which;

                switch(keycode) {
                    case 37:
                        if(this.closest('.tab-item').previousElementSibling) {
                            this.setAttribute("tabindex", "-1")
                            this.closest('.tab-item').previousElementSibling.querySelector('.tab-text').setAttribute("tabindex", "0")
                            this.closest('.tab-item').previousElementSibling.querySelector('.tab-text').focus();
                        }
                        break;
                    case 39:
                        if(this.closest('.tab-item').nextElementSibling) {
                            this.setAttribute("tabindex", "-1")
                            this.closest('.tab-item').nextElementSibling.querySelector('.tab-text').setAttribute("tabindex", "0")
                            this.closest('.tab-item').nextElementSibling.querySelector('.tab-text').focus();
                        }
                        break;
                    case 32:
                    case 13:
                        if(this) {
                            tabButton.forEach(button => {
                                button.setAttribute("aria-selected", "false");
                            });
                            this.setAttribute("aria-selected", "true");
                        }
                        break;
                }
            })
        });
    });

    const panelDisplay = document.querySelectorAll(".panel-display")
    panelDisplay.forEach(panel => {
        const panelItems = panel.querySelectorAll(".panel-item")
        panelItems.forEach((item, i) => {
            i != 0 ? item.classList.add("hidden") : ""
        });
    });
    tabDisplay.forEach((tab, tabDisplayIndex) => {
        const tabItems = tab.querySelectorAll(".tab-item")
        tabItems.forEach((item, tabIndex) => {
            const button = item.querySelector(".tab-text")
            button.addEventListener("click", () => {
                const curTab = button.closest(".tab-item")
                tabItems.forEach(item => {
                    item.classList.remove("active")
                    item.querySelector('.tab-text').setAttribute("tabindex", "-1")
                    item.querySelector('.tab-text').setAttribute("aria-selected", "false")
                });
                curTab.classList.add("active")
                button.setAttribute("tabindex", "0")
                button.setAttribute("aria-selected", "true")

                panelDisplay.forEach((panelDisplay, panelDisplayIndex) => {
                    if(tabDisplayIndex == panelDisplayIndex) {
                        const panelItems = panelDisplay.querySelectorAll(".panel-item")
                        panelItems.forEach((item, panelIndex) => {
                            item.classList.add("hidden")
                            tabIndex == panelIndex ? item.classList.remove("hidden") : ""
                        });
                    }
                });
            })
        });
    });

    new Swiper(".tab-wrap", {
        slidesPerView: "auto",
        freeMode: true,
    });

    // jQuery Scroll Event
    $(function () {
        var $tabDisplay = $(".tab-display.module-b");

        // 요소가 존재할 때만 실행
        if ($tabDisplay.length) {
            var tabDisplayOffset = $tabDisplay.offset().top - 64;
            var placeholder = $("<div>").height($tabDisplay.outerHeight()).hide();
            $tabDisplay.before(placeholder);

            $(window).scroll(function () {
                var scrollTop = $(this).scrollTop();

                if (tabDisplayOffset <= scrollTop) {
                    $tabDisplay.addClass("fixed");
                    placeholder.show();
                    $("#header").css({ "box-shadow": "none" });
                } else {
                    $tabDisplay.removeClass("fixed");
                    placeholder.hide();
                    $("#header").css({ "box-shadow": "0px 4px 28px 0px rgba(0, 0, 0, 0.04)" });
                }
            });
        }
    });

}

// input
function input() {
    const form = document.querySelectorAll(".form")
    form.forEach(input => {
        if(input.classList.contains("input") || input.classList.contains("search")) {
            const inputRemove = input.querySelector(".remove")
            if(inputRemove) {
                input.addEventListener("keyup", () => {
                    const inputValue = input.querySelector(".input-elem").value;
                    inputValue ? inputRemove.style.display = "block" : inputRemove.style.display = "none";
                })
                inputRemove.addEventListener("click", () => {
                    let inputElem = input.querySelector(".input-elem");
                    inputElem.value = null;
                    inputRemove.style.display = "none";
                })
            }
            input.classList.contains("disabled") ? input.querySelector(".input-elem").setAttribute("disabled", "") : ""
        }
    });
}
// input
function activeAnimationType_1() {
    gsap.utils
    .toArray('[active-animation="type-1"]')
    .forEach((section, index) => {
        gsap.to(section, {
            scrollTrigger: {
                //markers: true,
                trigger: section,
                start: "top 98%",
                end: "top bottom",

                onEnter: function (self) {
                    section.classList.add("active-animation-01");
                },
                onLeaveBack: function (self) {
                    section.classList.remove("active-animation-01");
                },
            },
        });
    });
}

function activeItemOnlyMo(selector) {
    $(selector).each(function() {
        const $accordion = $(this);

        $accordion.find('[class*="-item"]').on('click', function () {
            if ($(window).width() < 1024) {
                const $this = $(this);
                $accordion.find('[class*="-item"]').removeClass('active');
                $this.addClass('active');
            }
        });
    });
}

function activeItemOnlyPc(selector) {
    $(selector).each(function() {
        const $accordion = $(this);

        $accordion.find('[class*="-item"]').on('click', function () {
            if ($(window).width() >= 1024) {
                const $this = $(this);
                $accordion.find('[class*="-item"]').removeClass('active');
                $this.addClass('active');
            }
        });
    });
}

/* s: 이미지 레이어 팝업 */
$(function(){
    var imgModalBox = $('.temp-img-modal-layer'),
        imgModalBody = $('.temp-modal-body'),
        imgModalOpener = $('.img-pop-more'),
        imgModalCloser = $('.temp-modal-close'),
        imgModalScale = $('.temp-modal-scale'),
        imgModalScaleTimes = 0,
        imgModalScaleTick = 0.125,
        imgModalTarget;

    // Lenis 인스턴스 생성 (이미 Lenis가 초기화되어 있다면 필요 없음)
    const lenis = new Lenis();

    imgModalOpener.on('click', function(e){
        $('body').addClass('sc-disable');
        lenis.start();
        imgModalTarget = $(this).next('div').clone(true, true);
        imgModalTarget.css({
            'max-height': '100%',
            'overflow' : 'auto',
        });
        imgModalTarget.attr('data-zoomstep', 0);
        imgModalBody.empty().append(imgModalTarget);
        imgModalBox.addClass('active');
    });

    imgModalCloser.on('click', function(e){
        $('body').removeClass('sc-disable');
        lenis.stop();
        imgModalBox.removeClass('active');
        imgModalScaleTimes = 0;
    });

    imgModalScale.on('click', function(e){
        switch ($(this).data('do')) {
            case 'up':
                if (imgModalScaleTimes === 0) return false;
                imgModalScaleTimes++;
                imgModalTarget.css('zoom', 1+imgModalScaleTimes*imgModalScaleTick);
                imgModalTarget.attr('data-zoomstep', imgModalScaleTimes)
                break;
            case 'dn':
                if (imgModalScaleTimes === -4) return false;
                imgModalScaleTimes--;
                imgModalTarget.css('zoom', 1+imgModalScaleTimes*imgModalScaleTick);
                imgModalTarget.attr('data-zoomstep', imgModalScaleTimes)
                break;
            default:
                console.log('정의되지 않은 동작');
                break;
        }
    });
});

/* e: // 이미지 레이어 팝업 */


// selectbox - dropdown
function dropdownTab() {
    $('.dropdown.tab').each(function() {
        const $this = $(this);
        const $dropdownMenu = $this.find('.dropdown-menu');
        const $buttonArea = $this.find('.btn');
        const $dropdownItem = $this.find('.dropdown-item');

        $buttonArea.on('click', function(event) {
            event.stopPropagation();

            $('.btn').not($buttonArea).removeClass('rotate');
            $('.dropdown-menu').not($dropdownMenu).hide();

            $dropdownMenu.toggle();
            $buttonArea.toggleClass('rotate');
        });

        $dropdownItem.on('click', function(event) {
            event.stopPropagation();

            $dropdownItem.removeClass('selected');
            $(this).addClass('selected');
            $('.dropdown-menu').hide();

            $buttonArea.html($(this).text() + ' <span class="arrow"></span>');


            $buttonArea.removeClass('rotate');

            $('.panel-list .panel').removeClass('active');
            $('#' + $(this).data('panel')).addClass('active');
        });
    });

    $(document).on('click', function() {
        $('.dropdown-menu').hide();
        $('.btn').removeClass('rotate');
    });

    $('.dropdown-menu').on('click', function(event) {
        event.stopPropagation();
    });
}


function dropdownSelect() {
    $('.dropdown.select').each(function() {
        const $this = $(this);
        const $dropdownMenu = $this.find('.dropdown-menu');
        const $buttonArea = $this.find('.btn');
        const $dropdownItem = $this.find('.dropdown-item');

        $buttonArea.on('click', function(event) {
            event.stopPropagation();

            $('.btn').not($buttonArea).removeClass('rotate');
            $('.dropdown-menu').not($dropdownMenu).hide();

            $dropdownMenu.toggle();
            $buttonArea.toggleClass('rotate');
        });

        $dropdownItem.on('click', function(event) {
            event.stopPropagation();

            $dropdownItem.removeClass('selected');
            $(this).addClass('selected');
            $('.dropdown-menu').hide();

            $buttonArea.html($(this).text() + ' <span class="arrow"></span>');


            $buttonArea.removeClass('rotate');
        });
    });

    $(document).on('click', function() {
        $('.dropdown-menu').hide();
        $('.btn').removeClass('rotate');
    });

    $('.dropdown-menu').on('click', function(event) {
        event.stopPropagation();
    });
}

