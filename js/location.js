var mapContainer = document.getElementById('map');
const t_on = document.querySelectorAll('.traffic li')[0];
const t_off = document.querySelectorAll('.traffic li')[1];
const branch_btns = document.querySelectorAll('.branch_btns');

let drag = true; 
let zoom = false; 

    mapOption = { 
        center: new kakao.maps.LatLng(37.459272748230944, 126.45974962289725),
        draggable: false,
        level: 7
    };
var map = new kakao.maps.Map(mapContainer, mapOption); 

window.onresize = () => {
    let active_btn = document.querySelector('.branch_btns.on');
    let active_index = active_btn.getAttribute('data-index');
    map.setCenter(markerOptions[active_index].latlng);
}

var markerOptions = [
    {
        title: '인천공항',
        latlng: new kakao.maps.LatLng(37.459272748230944, 126.45974962289725),
        imgSrc: 'img/llo.png',
        imageSize: new kakao.maps.Size(50, 50),
        imgPos: {offset: new kakao.maps.Point(116, 99)},
        button: branch_btns[0]
    },
    {
        title: '김포공항',
        latlng: new kakao.maps.LatLng(37.54700467448257, 126.81579726787132),
        imgSrc: 'img/llo.png',
        imageSize: new kakao.maps.Size(50, 50),
        imgPos: {offset: new kakao.maps.Point(116, 99)},
        button: branch_btns[1]
    },
    {
        title: '제주공항',
        latlng: new kakao.maps.LatLng(33.500263917139755, 126.51049639615015),
        imgSrc: 'img/llo.png',
        imageSize: new kakao.maps.Size(50, 50),
        imgPos: {offset: new kakao.maps.Point(116, 99)},
        button: branch_btns[2]
    }
];

for(let i = 0; i<markerOptions.length; i++) {
    new kakao.maps.Marker({
        map: map,
        position: markerOptions[i].latlng,
        title: markerOptions[i].title,
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imageSize, markerOptions[i].imgPos)
    });
    
    markerOptions[i].button.onclick = e => {
        e.preventDefault();
        for(let k=0; k<markerOptions.length; k++) {
            markerOptions[k].button.classList.remove('on');
        }
        markerOptions[i].button.classList.add('on');
        moveTo(markerOptions[i].latlng);
    }
}

var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
kakao.maps.event.addListener(map, 'zoom_changed', function() {        
    var level = map.getLevel();
});

setDraggable(drag);
function setDraggable(draggable) {
    map.setDraggable(draggable);    
}

setZoomable(zoom); 
function setZoomable(zoomable) {
    map.setZoomable(zoomable);    
}

function moveTo(target) {   
    var moveLatLon = target;   
    map.setCenter(moveLatLon);
}

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