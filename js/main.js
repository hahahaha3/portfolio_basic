// defer 덕에 사용 안해도 됨
// window.onload = function() {
//     // 실행코드
// }

// 변수 설정
const  btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

// 이벤트 바인딩(이벤트연결)
// btnCall을 클릭할 때 
btnCall.onclick = function(e) {
    // 링크이동금지
    e.preventDefault(); 

    // btnCall에 on이 있으면 제거, 없으면 추가
    btnCall.classList.toggle("on");
    // menuMo에 on이 있으면 제거, 없으면 추가
    menuMo.classList.toggle("on");
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