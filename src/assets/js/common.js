var frontCommon = frontCommon || {};
frontCommon.Html = (function () {
    var instance = null;
    function init() {
    instance = {
        reset: function () {
            frontCommonResize();
            header();

            //frontCommonScroll();
            //footer();
            //localAnimations();
            //lenis();
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

function frontCommonResize() {
    window.addEventListener("resize", () => {

    });
}

function frontCommonScroll() {
    window.addEventListener("scroll", () => {

    });
}
function lenis() {
    let lenis = new Lenis()
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    const _header = document.getElementById("header")
    const siteNavi = _header.querySelector(".site-navi")
    const menuHeader = _header.querySelector(".btn.menu-header")
    const modalData = document.querySelectorAll('[data-bs-toggle="modal"]')
    const modal = document.querySelectorAll(".modal");


    window.addEventListener("scroll", () => {
        if(lenis.direction == -1) {
            _header.classList.add("up-color")
            _header.classList.remove("regular")
            _header.classList.remove("regular-focus")
            siteNavi.classList.remove("close")
            if(lenis.animatedScroll < 5) {
                _header.classList.remove("up-color")
            }
        } else {
            siteNavi.classList.add("close")
            const focusedElement = document.activeElement
            if(focusedElement.closest(".depth1-item") || _header.classList.contains("hover")) {
                _header.classList.add("regular-focus")
                _header.classList.remove("regular")
                if(lenis.animatedScroll < 5) {
                    _header.classList.remove("regular-focus")
                }
            } else {
                if(!_header.classList.contains("open")) {
                    _header.classList.add("regular")
                    _header.classList.remove("regular-focus")
                    if(lenis.animatedScroll < 5) {
                        _header.classList.remove("up-color")
                        _header.classList.remove("regular")
                    }
                }
            }
        }
    })

    if(lenis.animatedScroll < window.innerHeight) {
        _header.classList.remove("regular")
        _header.classList.remove("regular-focus")
    } else {
        _header.classList.add("regular")
    }

    // Mo 헤더 메뉴 클릭시 lenis stop
    menuHeader.addEventListener("click", function() {
        const wrap = document.getElementById("wrap")
        if(_header.classList.contains("open")) {
            lenis = new Lenis()
        } else {
            wrap.removeAttribute("style")
            lenis.destroy();
        }
    })
    window.addEventListener("resize", () => {
        const _width = window.innerWidth
        if(_width >= 1024) {
            if(modal) {
                modal.forEach(modal => {
                    if(modal.classList.contains("show")) {
                        return;
                    } else {
                        lenis = new Lenis()
                    }
                });
            }
        } else {
            // lenis.destroy();
        }
    })


    // 팝업창 lenis 스크롤 destroy
    if(modalData) {
        modalData.forEach(modalData => {
            modalData.addEventListener("click", function() {
                _header.style.top = "-7.2rem"
                modal.forEach(modal => {
                    if(modal.classList.contains("show")) {
                        lenis.destroy();
                    }
                });
            });
        });
    }

    modal.forEach(modal => {
        if(modal) {
            const close = modal.querySelector(".modal-close")
            close.addEventListener("click", function() {
                lenis = new Lenis()
                _header.removeAttribute("style")
            })
        }
    });

    const main = document.getElementById("main")
    if(main.classList.contains("sk-main")) {
        const media = document.querySelector(".section.media")
        let press = media.querySelector(".press-media")
        const sns = media.querySelector(".sns-media")
        if(media && sns) {
            gsap.to(press, {
                scrollTrigger: {
                    trigger: sns,
                    start: "top bottom",
                    end: "top bottom",

                    onEnter: function() {
                        const _width = window.innerWidth
                        if(_width >= 1024) {
                            press.style.top = window.innerHeight - press.offsetHeight + "px"
                        }
                    },

                    onLeave: function() {
                        const _width = window.innerWidth
                        if(_width >= 1024) {
                            lenis.stop();
                            media.classList.add("active2")
                            press = media.querySelector(".press-media")

                            sns.style.marginTop = -press.offsetHeight + "px"

                            setTimeout(() => {
                                lenis.start();
                            }, 1000);
                        }
                    },
                    onEnterBack: function() {
                        const _width = window.innerWidth
                        if(_width >= 1024) {
                            lenis.stop();
                            media.classList.remove("active2")
                            sns.style.marginTop = "0"
                            press.style.top = window.innerHeight - press.offsetHeight + "px"
                            setTimeout(() => {
                                lenis.start();
                            }, 1000);
                        }
                    }

                }
            })
        }
    }

    document.addEventListener("keydown", (e) => {
        if(e.key === 'Tab') {
            setTimeout(() => {
                const media = document.querySelector(".sk-main .section.media")
                const focusedElement = document.activeElement
                if(media) {
                    let press = media.querySelector(".press-media")
                    if(focusedElement.closest(".press-media")) {
                        window.scrollTo(0, media.offsetTop + press.style.getPropertyValue(top))
                    }
                    if(focusedElement.classList.contains("newest-link") && !e.shiftKey) {
                        window.scrollTo(0, press.offsetTop - press.offsetHeight + 300)
                    }
                }
            }, 0);
        }
    })
}

// header
function header() {
    const $header = $('#header');
    const $depth1List = $('.depth1-list');
    const $menu = $('.site-control .menu');

    const isDesktop = () => window.innerWidth >= 1024;

    const addDesktopEvents = () => {
        $depth1List.on('mouseenter focusin', () => $header.addClass('active'));
        $header.on('mouseleave focusout', () => $header.removeClass('active'));
    };

    const removeDesktopEvents = () => {
        $depth1List.off('mouseenter focusin');
        $header.off('mouseleave focusout');
    };

    const initResponsiveEvents = () => {
        if (isDesktop()) {
            addDesktopEvents();
        } else {
            removeDesktopEvents();
        }
    };

    let lastScrollTop = 0;

    const handleScroll = () => {
        let winScrollTop = $(window).scrollTop();

        $header.toggleClass('scroll', winScrollTop > 0);

        if (winScrollTop > lastScrollTop) {
            $header.css('transform', 'translateY(-100px)');
        } else {
            $header.css('transform', 'translateY(0)');
        }

        lastScrollTop = winScrollTop;
    };

    // mobile
    const handleMobileMenuToggle = () => {
        $menu.on('click', () => {
            $header.toggleClass('menu-bar');
        });
    };

    $('.depth1-item').click(function () {
        var $this = $(this);
        $this.find('.depth2-wrap').stop().slideToggle();
        $this.toggleClass('open');
    });

    initResponsiveEvents();
    handleMobileMenuToggle();

    window.addEventListener('resize', initResponsiveEvents);
    window.addEventListener('scroll', handleScroll);
}

function Tab() {
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
}

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