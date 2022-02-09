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

document.querySelector('.gototop').addEventListener("click", (e) => { 
    e.preventDefault(); 
    window.scroll({ 
        top: 0, 
        left: 0, 
        behavior: "smooth" 
    }); 
});

counter('.counter', 445, 4000);
function counter(el, num, time) {
    const item = document.querySelector(el);
    let current_num = parseInt(item.innerText);
    let count_num = num - current_num;
    let interval = parseInt(time/count_num);
    let timer = setInterval(function() {
        current_num++;
    
        if(current_num == num) {
            clearInterval(timer);
        }
        item.innerText = current_num;
    }, interval);
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