var frontCommon=frontCommon||{};function frontCommonResize(){window.addEventListener("resize",()=>{var e=document.getElementById("header");document.querySelector(".modal.show")&&e.classList.add("regular")})}function frontCommonScroll(){window.addEventListener("scroll",()=>{})}function lenis(){let i=new Lenis;requestAnimationFrame(function e(t){i.raf(t),requestAnimationFrame(e)});let t=document.getElementById("header"),e=t.querySelector(".site-navi");var s=t.querySelector(".btn.menu-header"),a=document.querySelectorAll('[data-bs-toggle="modal"]');let r=document.querySelectorAll(".modal");if(window.addEventListener("scroll",()=>{-1==i.direction?(t.classList.add("up-color"),t.classList.remove("regular"),t.classList.remove("regular-focus"),e.classList.remove("close"),i.animatedScroll<5&&t.classList.remove("up-color")):(e.classList.add("close"),document.activeElement.closest(".depth1-item")||t.classList.contains("hover")?(t.classList.add("regular-focus"),t.classList.remove("regular"),i.animatedScroll<5&&t.classList.remove("regular-focus")):t.classList.contains("open")||(t.classList.add("regular"),t.classList.remove("regular-focus"),i.animatedScroll<5&&(t.classList.remove("up-color"),t.classList.remove("regular"))))}),i.animatedScroll<window.innerHeight?(t.classList.remove("regular"),t.classList.remove("regular-focus")):t.classList.add("regular"),s.addEventListener("click",function(){var e=document.getElementById("wrap");t.classList.contains("open")?i=new Lenis:(e.removeAttribute("style"),i.destroy())}),window.addEventListener("resize",()=>{1024<=window.innerWidth&&r&&r.forEach(e=>{e.classList.contains("show")||(i=new Lenis)})}),a&&a.forEach(e=>{e.addEventListener("click",function(){t.style.top="-7.2rem",r.forEach(e=>{e.classList.contains("show")&&i.destroy()})})}),r.forEach(e=>{e&&e.querySelector(".modal-close").addEventListener("click",function(){i=new Lenis,t.removeAttribute("style")})}),document.getElementById("main").classList.contains("sk-main")){let e=document.querySelector(".section.media"),t=e.querySelector(".press-media"),s=e.querySelector(".sns-media");e&&s&&gsap.to(t,{scrollTrigger:{trigger:s,start:"top bottom",end:"top bottom",onEnter:function(){1024<=window.innerWidth&&(t.style.top=window.innerHeight-t.offsetHeight+"px")},onLeave:function(){1024<=window.innerWidth&&(i.stop(),e.classList.add("active2"),t=e.querySelector(".press-media"),s.style.marginTop=-t.offsetHeight+"px",setTimeout(()=>{i.start()},1e3))},onEnterBack:function(){1024<=window.innerWidth&&(i.stop(),e.classList.remove("active2"),s.style.marginTop="0",t.style.top=window.innerHeight-t.offsetHeight+"px",setTimeout(()=>{i.start()},1e3))}}})}document.addEventListener("keydown",i=>{"Tab"===i.key&&setTimeout(()=>{var e,t=document.querySelector(".sk-main .section.media"),s=document.activeElement;t&&(e=t.querySelector(".press-media"),s.closest(".press-media")&&window.scrollTo(0,t.offsetTop+e.style.getPropertyValue(top)),s.classList.contains("newest-link"))&&!i.shiftKey&&window.scrollTo(0,e.offsetTop-e.offsetHeight+300)},0)})}function localAnimations(){$header=$("header"),$breadcrumb=$(".data-list.breadcrumb"),$('[data-local-animation="case-1"]').each(function(){($this=$(this)).addClass("active"),$breadcrumb.removeClass("case1").addClass("case2")})}function header(){let t=$("#header");var e=$(".depth1-list");let s=$(".depth2-wrap"),i=0,a=e=>{s.css("visibility",e?"visible":"hidden")},r=void(t.hover(()=>{t.addClass("white")},()=>{t.removeClass("white")}),e.on("mouseenter",()=>{t.addClass("active"),a(!0)}),t.on("mouseleave",e=>{$(e.relatedTarget).closest("#header").length||(t.removeClass("active"),a(!1))}));window.addEventListener("scroll",()=>{var e=window.scrollY;r=e>i?"down":"up",0===e?t.removeClass("white"):"up"==r?gsap.to(t,{duration:.3,y:0,autoAlpha:1,onStart:()=>t.addClass("white")}):gsap.to(t,{duration:.3,y:-100,autoAlpha:0,onComplete:()=>t.removeClass("white")}),i=e})}function Tab(){var e=document.querySelectorAll(".tab-display");e.forEach(e=>{var t=e.querySelector(".tab-item:first-child");t.classList.add("active"),t.querySelector(".tab-text").setAttribute("aria-selected","true"),e.querySelector(".tab-list").addEventListener("keydown",function(e){var t=(e=event||window.event).keyCode||e.which;e.shiftKey||9!==t||(this.querySelectorAll(".tab-item").forEach(e=>{var t;e.classList.contains("active")?((t=e.querySelector(".tab-text")).setAttribute("tabindex","0"),t.setAttribute("aria-selected","true")):((t=e.querySelector(".tab-text")).setAttribute("tabindex","-1"),t.setAttribute("aria-selected","false"))}),document.querySelectorAll(".panel-item.hidden").forEach(e=>{}))});let s=e.querySelectorAll(".tab-text");s.forEach(e=>{e.addEventListener("keydown",function(e){switch((e=event||window.event).keyCode||e.which){case 37:this.closest(".tab-item").previousElementSibling&&(this.setAttribute("tabindex","-1"),this.closest(".tab-item").previousElementSibling.querySelector(".tab-text").setAttribute("tabindex","0"),this.closest(".tab-item").previousElementSibling.querySelector(".tab-text").focus());break;case 39:this.closest(".tab-item").nextElementSibling&&(this.setAttribute("tabindex","-1"),this.closest(".tab-item").nextElementSibling.querySelector(".tab-text").setAttribute("tabindex","0"),this.closest(".tab-item").nextElementSibling.querySelector(".tab-text").focus());break;case 32:case 13:this&&(s.forEach(e=>{e.setAttribute("aria-selected","false")}),this.setAttribute("aria-selected","true"))}})})});let r=document.querySelectorAll(".panel-display");r.forEach(e=>{e.querySelectorAll(".panel-item").forEach((e,t)=>{0!=t&&e.classList.add("hidden")})}),e.forEach((e,i)=>{let a=e.querySelectorAll(".tab-item");a.forEach((e,s)=>{let t=e.querySelector(".tab-text");t.addEventListener("click",()=>{var e=t.closest(".tab-item");a.forEach(e=>{e.classList.remove("active"),e.querySelector(".tab-text").setAttribute("tabindex","-1"),e.querySelector(".tab-text").setAttribute("aria-selected","false")}),e.classList.add("active"),t.setAttribute("tabindex","0"),t.setAttribute("aria-selected","true"),r.forEach((e,t)=>{i==t&&e.querySelectorAll(".panel-item").forEach((e,t)=>{e.classList.add("hidden"),s==t&&e.classList.remove("hidden")})})})})}),new Swiper(".tab-wrap",{slidesPerView:"auto",freeMode:!0})}function input(){document.querySelectorAll(".form").forEach(s=>{if(s.classList.contains("input")||s.classList.contains("search")){let t=s.querySelector(".remove");t&&(s.addEventListener("keyup",()=>{var e=s.querySelector(".input-elem").value;t.style.display=e?"block":"none"}),t.addEventListener("click",()=>{s.querySelector(".input-elem").value=null,t.style.display="none"})),s.classList.contains("disabled")&&s.querySelector(".input-elem").setAttribute("disabled","")}})}frontCommon.Html=(()=>{var e=null;return e=e||{reset:function(){frontCommonResize(),header()}}})(),$(document).ready(header);