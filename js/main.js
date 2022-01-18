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


/* header ------------------------------- */
const gnb_lis = document.querySelectorAll('#gnb>li');
console.log(gnb_lis);

gnb_lis.forEach(li => {
    li.addEventListener('mouseenter', e => {
        const sub = e.currentTarget.querySelector('.sub');
        sub.style.display = 'block';

        const depth1 = e.currentTarget.children[0];
        depth1.classList.add('on');
    });

    li.addEventListener('mouseleave', e => {
        const sub = e.currentTarget.querySelector('.sub');
        sub.style.display = 'none';
        const depth1 = e.currentTarget.querySelector('a');
        depth1.classList.remove('on');
    });

    li.addEventListener('focusin', e => {
        const sub = e.currentTarget.querySelector('.sub');
        sub.style.display='block';
    });

    const sub = li.querySelector('.sub li');
    const lastEl = sub.lastElementChild;
    lastEl.addEventListener('focusout', e => {
        e.currentTarget.closest('.sub').style.display = 'none';
    });
})