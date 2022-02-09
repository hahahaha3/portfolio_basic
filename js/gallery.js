const body = document.querySelector('body');
const frame = document.querySelector('#list');
const loading = document.querySelector('.loading');
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');
const base = 'https://www.flickr.com/services/rest/?';
const method1 = 'flickr.interestingness.getList';
const method2 = 'flickr.photos.search';
const key = 'afa267e57b8885c90d6e77c92d86a32f';
const per_page = 8;
const format = 'json';

const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

callData(url);

btnSearch.addEventListener('click', e => {
    let tag = input.value;
    tag = tag.trim();
    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

    if(tag != '') {
        callData(url);
    } else {
        alert('검색어를 입력하세요');

        frame.innerHTML = '';
        frame.classList.remove('on');
        frame.style.height = 'auto';
        
        const errMsgs = frame.parentElement.querySelectorAll('p');
        if(errMsgs.length > 0) frame.parentElement.querySelector('p').remove();

        const errMsg = document.createElement('p');
        errMsg.append('검색어를 입력하세요');
        frame.parentElement.append(errMsg);
    }
});

input.addEventListener('keyup', e => {
    if(e.key == "Enter") {
        let tag = input.value;
        tag = tag.trim();
        const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
        if(tag != '') {
            callData(url);
        } else {
            frame.innerHTML = '';
            frame.classList.remove('on');
            frame.style.height = 'auto';
            
            const errMsgs = frame.parentElement.querySelectorAll('p');
            if(errMsgs.length > 0) frame.parentElement.querySelector('p').remove();
            
            const errMsg = document.createElement('p');
            errMsg.append('검색어를 입력하세요');
            frame.parentElement.append(errMsg);
        }
    }
});

frame.addEventListener('click', e => {
    e.preventDefault();
    let target = e.target.closest('.item').querySelector('.thumb');
    if(e.target == target) {
        let imgSrc = target.parentElement.getAttribute('href');
        let pop = document.createElement('aside');
        pop.classList.add('pop');
        let pops = `
                            <div class="con">
                                <img src=${imgSrc}>
                            </div>
                            <span class="close">CLOSE</span>
        `;
        pop.innerHTML = pops;
        body.append(pop);
        body.style.overflow = 'hidden';
    }
})

body.addEventListener('click', e=>{
    let pop = body.querySelector('.pop');
    if(pop != null) {
        let close = pop.querySelector('.close');
        if(e.target == close) {
            pop.remove();
            body.style.overflow = 'auto';
        }
    }
});

function callData(url) {
    frame.innerHTML = '';
    loading.classList.remove('off');
    frame.classList.remove('on');
    fetch(url)
    .then(data => {
        return data.json();
    })
    .then(json => {
        let items = json.photos.photo;
        if(items.length > 0) {
            const errMsgs = frame.parentElement.querySelectorAll('p');
            if(errMsgs.length > 0) frame.parentElement.querySelector('p').remove();
            createList(items);
            delayLoading();
        } else {
            loading.classList.add('off');
            const errMsgs = frame.parentElement.querySelectorAll('p');
            if(errMsgs.length > 0) frame.parentElement.querySelector('p').remove();
            const errMsg = document.createElement('p');
            errMsg.append('검색어의 이미지가 없습니다.');
            frame.parentElement.append(errMsg);
            frame.classList.remove('on');
            frame.style.height = 'auto';
        }
    });
}

function createList(items) {
    let htmls = '';
    items.map(data => {
        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
    
        let imgSrcBig =`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        htmls += `
        <li class="item">
            <div class="e_item">
                <span>
                    <strong>${data.owner}</strong>
                    <img class="profile" src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                </span>
                <div class="title_p">
                    <h2>${data.title}</h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.</p>
                    <a class="viewBtn">View More</a>
                </div>
                <a href=${imgSrcBig}>
                    <img src=${imgSrc} class="thumb">
                </a>
            </div>
        </li>
        `;
})
frame.innerHTML = htmls; 
}; 

function delayLoading() {
    const imgs = frame.querySelectorAll('img');
    const len = imgs.length;
    let count = 0;

    for(let el of imgs) {
        el.onload = () => {
            count++;

            if(count == len) isoLayout();
        }
        let thumb = el.closest('.item').querySelector('.thumb');
        thumb.onerror = e => {
            e.currentTarget.closest('.item').querySelector('.thumb').setAttribute('src', '../img/k1.jpeg');
        }
        let profile = el.closest('.item').querySelector('.profile');
        profile.onerror = e => {
            e.currentTarget.closest('.item').querySelector('.profile').setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
        }
    }
}

function clickAside(item) {
    item.addEventListener('click', e => {
        e.preventDefault();
        let target = e.target.closest('.item').querySelector('.thumb');
        if(e.target == target) {
            let imgSrc = target.parentElement.getAttribute('href');
            let pop = document.createElement('aside');
            pop.classList.add('pop');
            let pops = `
                                <div class="con">
                                    <img src=${imgSrc}>
                                </div>
                                <span class="close">CLOSE</span>
            `;
            pop.innerHTML = pops;
            body.append(pop);
            body.style.overflow = 'hidden';
        }
    })
}

function isoLayout() {
    loading.classList.add('off');
    frame.classList.add('on');

    new Isotope('#list', {
        itemSelector: '.item',
        columnWidth: '.item',
        transitionDuration: '0.5s'
    });
}
