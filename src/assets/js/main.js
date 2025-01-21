function mainVisual() {
    var slideData = [
        { name: 'ClickESG Service' },
        { name: 'ClickESG Solutions' },
        { name: 'About ClickESG' }
    ];

    var count = 0;
    var countId = '';
    let isCounterOn = false;
    let isSyncing = false;
    const isDesktop = () => window.innerWidth >= 1024;

    function syncSlider(source, target) {
        const sourceIndex = source.realIndex;
        const targetIndex = target.realIndex;

        if (sourceIndex === 0 && targetIndex === slideData.length - 1) {
            target.slideNext();
        } else if (sourceIndex === slideData.length - 1 && targetIndex === 0) {
            target.slidePrev();
        } else if (sourceIndex > targetIndex) {
            target.slideNext();
        } else if (sourceIndex < targetIndex) {
            target.slidePrev();
        }
    }

    function loadingBar() {
        var activeBulletTitleWidth = $('.swiper-pagination-bullet-active .timer-title').outerWidth();
        var loadingVal = (100 * count ) / 50

        $('.count_txt').text(count);
        $('.swiper-pagination-bullet .timer-percent').css({'width': 0 +'%'});
        $('.swiper-pagination-bullet-active .timer-percent').css({'width':loadingVal + '%'});

        if (isDesktop()) {
            $('.swiper-pagination-bullet').css({'width':'18px'});
        } else {
            $('.swiper-pagination-bullet').css({'width':'15px'});
        }

        $('.swiper-pagination-bullet-active').css({'width':activeBulletTitleWidth + 'px'});
    }

    function startCounter() {
        var activeBulletTitleWidth = $('.swiper-pagination-bullet-active .timer-title').outerWidth();
        $('.swiper-pagination-bullet-active').css({'width':activeBulletTitleWidth + 'px'});

        clearInterval(countId);
        countId = setInterval(() => {
            count++;
            if (count >= 50) {
                sliderTitle.slideNext();
                count = 0;
            }
            loadingBar();
        }, 100);
        isCounterOn = true;
    }

    function stopCounter() {
        clearTimeout(countId);
        isCounterOn = false;
    }

    function setTouchSensitivity(slider, isEnabled) {
        slider.params.touchRatio = isEnabled ? 1 : 0;
        slider.update();
    }

    var sliderLink = new Swiper(".swiper.link", {
        loop: true,
        //allowTouchMove: false,
        //touchRatio: 0,
        effect: 'fade',
    });

    var sliderBg = new Swiper(".swiper.bg", {
        slidesPerView: 1,
        loop: true,
        speed: 1200,
        pagination: {
            el: ".swiper-controls .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<div class="' + className + '"><span class="timer-title">'+ 0 + (index + 1) + ' ' + slideData[index].name +'</span>'+ '<span class="timer-bar"><span class="timer-percent"></span></span></div>';
            },
        },
        thumbs: {
            swiper: sliderLink
        }
    });



    var sliderTitle = new Swiper(".swiper.title", {
        loop: true,
        speed: 1200,

        on: {
            init: function () {
                if (isDesktop()) {
                    $('.swiper-pagination-bullet').css({'width':'18px'});
                } else {
                    $('.swiper-pagination-bullet').css({'width':'15px'});
                }
                setTimeout(function() {
                    startCounter();
                }, 100);
            },
            slideChangeTransitionStart: function () {
                setTouchSensitivity(this, false);
                count = 0;
                loadingBar();
                setTimeout(() => setTouchSensitivity(this, true), 1300);
            }
        }
    });

    sliderTitle.on('slideChangeTransitionStart', function () {
        if (!isSyncing) {
            isSyncing = true;
            syncSlider(sliderTitle, sliderBg);
            isSyncing = false;
        }
    });

    sliderTitle.on('touchEnd', function () {
        if (!isSyncing) {
            isSyncing = true;
            syncSlider(sliderTitle, sliderBg);
            isSyncing = false;

        }

        setTimeout(function() {
            var activeBulletTitleWidth = $('.swiper-pagination-bullet-active .timer-title').outerWidth();
            if (isDesktop()) {
                $('.swiper-pagination-bullet').css({'width':'18px'});
            } else {
                $('.swiper-pagination-bullet').css({'width':'15px'});
            }
            $('.swiper-pagination-bullet-active').css({'width':activeBulletTitleWidth + 'px'});
        }, 200);
    });

    $('.swiper-controls .swiper-pagination-bullet').on('click', function() {
        const index = $(this).index();
        sliderBg.slideToLoop(index, 1200);
        sliderTitle.slideToLoop(index, 1200);
        count = 0;
        isCounterOn ? startCounter() : loadingBar();
    });

    function updateToggleButton(isPlaying) {
        const toggleButton = document.getElementById('toggleButton');

        toggleButton.textContent = isPlaying ? 'Stop' : 'Play';
        toggleButton.classList.toggle('play', isPlaying);
        toggleButton.classList.toggle('stop', !isPlaying);
    }

    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', function () {
        isCounterOn ? stopCounter() : startCounter();
        updateToggleButton(isCounterOn);
    });

    window.addEventListener('resize', function () {
        sliderBg.update();
        sliderTitle.update();
    });

}
function mainInteraction(){
    rollingEvent01('.rolling-01');
    rollingEvent02('.rolling-02');
    rollingEvent01('.rolling-03');
    rollingEvent01('.rolling-04');
    rollingEvent02('.rolling-05');

    function rollingEvent01(selector) {
        $(selector).each(function() {
            var $selector = $(this);
            var $selectorList = $selector.find('.rolling-list');
            //let $roller = $('.rolling-display');

            if ($selector.length) {
                $selector.addClass('roller1');

                let $clone = $selector.clone(true);
                $clone.addClass('roller2');
                $selector.parent('.sub-section').append($clone);

                $selector.css('left', '0px');
                $clone.css('left', $selectorList.width() + 'px');

                $selector.addClass('original');
                $clone.addClass('clone');

            } else {
                console.error('Element with the class "rolling-display" not found.');
            }

        });
    }

    function rollingEvent02(selector) {
        $(selector).each(function() {
            var $selector = $(this);
            var $selectorList = $selector.find('.rolling-list');
            //let $roller = $('.rolling-display');

            if ($selector.length) {
                $selector.addClass('roller3');

                let $clone = $selector.clone(true);
                $clone.addClass('roller4');
                $selector.parent('.sub-section').append($clone);

                $selector.addClass('original');
                $clone.addClass('clone');

            } else {
                console.error('Element with the class "rolling-display" not found.');
            }

        });
    }

    var newSlider = new Swiper(".story-06 .swiper", {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 4,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 600,
        navigation: {
            nextEl: ".story-06 .swiper-button-next",
            prevEl: ".story-06 .swiper-button-prev",
        },
    });

    function commaSeparateNumber(val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var solutionSlider = new Swiper(".story-02 .swiper", {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 32,
        freeMode: true,
        autoplay: false,
        speed: 600,
        navigation: {
            nextEl: ".story-02 .swiper-button-next",
            prevEl: ".story-02 .swiper-button-prev",
        },
        pagination: {
            el: ".story-02 .swiper-pagination",
            type: "progressbar",
        },
        breakpoints: {
            768: {
                spaceBetween: 12,
            },
        },
    });

    gsap.utils
    .toArray('[active-animation="main"]')
    .forEach((section) => {
        gsap.to(section, {
            scrollTrigger: {
                //markers: true,
                trigger: section,
                start: "20% 98%",
                end: "top bottom",

                onEnter: () => {
                    section.classList.add("active-animation-main");

                    if (section.classList.contains('swiper-list')) {
                        solutionSlider.autoplay.start();
                    }

                    if (section.classList.contains('story-03')) {
                        document.querySelectorAll('.story-03 .data-info').forEach((el) => {
                            const targetValue = parseInt(el.textContent.replace(/,/g, ''), 10);
                            let counter = { value: 0 };

                            gsap.to(counter, {
                                value: targetValue,
                                duration: 2,
                                ease: "swing",
                                onUpdate: () => {
                                    el.textContent = commaSeparateNumber(Math.ceil(counter.value));
                                },
                            });
                        });
                    }
                },

                onLeaveBack: () => {
                    section.classList.remove("active-animation-main");

                    if (section.classList.contains('swiper-list')) {
                        solutionSlider.autoplay.stop();
                    }
                },
            },
        });
    });
}