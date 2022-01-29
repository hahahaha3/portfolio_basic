var mapContainer = document.getElementById('map');
const t_on = document.querySelectorAll('.traffic li')[0];
const t_off = document.querySelectorAll('.traffic li')[1];
const branch_btns = document.querySelectorAll('.branch li');

let drag = true; 
let zoom = true; 

    mapOption = { 
        center: new kakao.maps.LatLng(37.50896573660853, 127.06181652131768), 
        level: 3 
    };
var map = new kakao.maps.Map(mapContainer, mapOption); 
t_on.addEventListener('click', e => {
    e.preventDefault();
    if(t_on.classList.contains('on')) return;
    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
    t_on.classList.add('on');
    t_off.classList.remove('on');
});
t_off.addEventListener('click', e => {
    e.preventDefault();
    if(t_off.classList.contains('on')) return;
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);  
    t_off.classList.add('on');
    t_on.classList.remove('on');
});

window.onresize = () => {
    let active_btn = document.querySelector('.branch li.on');
    let active_index = active_btn.getAttribute('data-index');
    map.setCenter(markerOptions[active_index].latlng);
}

var markerOptions = [
    {
        title: '본점',
        latlng: new kakao.maps.LatLng(37.50896573660853, 127.06181652131768),
        imgSrc: 'img/llo.png',
        imageSize: new kakao.maps.Size(90, 90),
        imgPos: {offset: new kakao.maps.Point(116, 99)},
        button: branch_btns[0]
    },
    {
        title: '지점1',
        latlng: new kakao.maps.LatLng(33.518268193162946, 126.52308548747929),
        imgSrc: 'img/llo.png',
        imageSize: new kakao.maps.Size(90, 90),
        imgPos: {offset: new kakao.maps.Point(116, 99)},
        button: branch_btns[1]
    },
    {
        title: '지점2',
        latlng: new kakao.maps.LatLng(33.23249725539617, 126.3654200043578),
        imgSrc: 'img/llo.png',
        imageSize: new kakao.maps.Size(90, 90),
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

