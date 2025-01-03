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
        $('.swiper-pagination-bullet').css({'width':'18px'});
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
                $('.swiper-pagination-bullet').css({'width':'18px'});
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
            $('.swiper-pagination-bullet').css({'width':'18px'});
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

function another(){    
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

    var newSlider = new Swiper(".story-06 .swiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        navigation: {
            nextEl: ".story-06 .swiper-button-next",
            prevEl: ".story-06 .swiper-button-prev",
        },
    });
}