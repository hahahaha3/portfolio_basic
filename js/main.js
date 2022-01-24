class BtnCall {
    constructor() {
        this.init();
        this.bindingEvent();
    }
    init() {
        this.btnCall = document.querySelector(".btnCall");
        this.menuMo = document.querySelector(".menuMo");
    }

    bindingEvent() {
        this.btnCall.addEventListener('click', e => {
            e.preventDefault(); 
            this.btnCall.classList.toggle("on");
            this.menuMo.classList.toggle("on");
        });
    }
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    keyboard: {
        enabled: true,
    },
    mousewheel: true,        
});