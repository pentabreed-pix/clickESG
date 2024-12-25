function mainVisual() {
    var slideData = [
        { name: 'ClickESG Service' },
        { name: 'ClickESG Solutions' },
        { name: 'About ClickESG' }
    ];

    var count = 0;
    var countId = '';
    var isCounterOn;

    function loadingBar() {
        var activeBulletTitleWidth = $('.swiper-pagination-bullet-active .timer-title').outerWidth();
        var loadingVal = (100 * count ) / 50
        $('.count_txt').text(count);
        $('.swiper-pagination-bullet .timer-percent').css({'width': 0 +'%'});
        $('.swiper-pagination-bullet-active .timer-percent').css({'width':loadingVal + '%'});
        $('.swiper-pagination-bullet').css({'width':'18px'});
        $('.swiper-pagination-bullet-active').css({'width':activeBulletTitleWidth + 'px'});
    }

    function startCounter() {
        var activeBulletTitleWidth = $('.swiper-pagination-bullet-active .timer-title').outerWidth();
        $('.swiper-pagination-bullet-active').css({'width':activeBulletTitleWidth + 'px'});

        clearTimeout(countId);
        countId = setInterval(function() {
            count += 1;
            if(count === 50){
                sliderBg.slideNext();
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

    var sliderLink = new Swiper(".swiper.link", {
        loop: true,
        //allowTouchMove: false,
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
        },
        on: {
            init: function () {
                $('.swiper-pagination-bullet').css({'width':'18px'});
                setTimeout(function() {
                    startCounter();
                }, 100);
            },
            slideChangeTransitionStart: function () {
                count = 0;
                loadingBar();
            }
        }
    });

    var sliderTitle = new Swiper(".swiper.title", {
        loop: true,
        speed: 1200,
    });

    sliderBg.controller.control = sliderTitle;
    sliderTitle.controller.control = sliderBg;

    var toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', function() {
        if (isCounterOn === true) {
            stopCounter();
            toggleButton.textContent = 'Play';
            toggleButton.classList.remove('play');
            toggleButton.classList.add('stop');

        } else {
            startCounter();
            toggleButton.textContent = 'Stop';
            toggleButton.classList.add('play');
            toggleButton.classList.remove('stop');
        }
    });

    $('.swiper.bg .swiper-pagination-bullet').on('click', function() {
        count = 0;
        if (isCounterOn === true) {
            startCounter();
        } else {
            loadingBar();
        }
    });

    var solutionSlider = new Swiper(".story-02 .swiper", {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 32,
        freeMode: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".story-02 .swiper-button-next",
            prevEl: ".story-02 .swiper-button-prev",
        },
        pagination: {
            el: ".story-02 .swiper-pagination",
            type: "progressbar",
        },
    });

    window.addEventListener('resize', function () {
        sliderBg.update();
        sliderTitle.update();
    });

    rollingEvent('.rolling-01');
    rollingEvent('.rolling-02');
    rollingEvent('.rolling-03');
    rollingEvent('.rolling-04');
    rollingEvent('.rolling-05');

    function rollingEvent(selector) {        
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

    var newSlider = new Swiper(".story-06 .swiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
            nextEl: ".story-06 .swiper-button-next",
            prevEl: ".story-06 .swiper-button-prev",
        },
    });
}



