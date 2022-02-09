const body = document.querySelector('body');
const vidList = document.querySelector('.vidList');
const vidMain = document.querySelector('#vidMain');
const key = 'AIzaSyAMeYaiQ_kCtY_ZWYUq46p2gSQZowgTuSA';
const playlistId = 'PLx62HH_9oB7gzkqn1mQQlLKcyMDYlWXPe';
const num = 8;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

const slider = document.querySelector('#slider');
const ul = slider.querySelector('ul');
const lis = ul.querySelectorAll('li');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const speed = 1000;
let len = lis.length;
let enableClick = true;

vidMain.innerHTML = `<iframe width="580" height="320" src="https://www.youtube-nocookie.com/embed/M2jhYbUIEyU?controls=0" frameborder="0" allowfullscreen></iframe>`;

init();
callData(url);
clickPop(vidList);
close(vidList);

next.addEventListener('click', e => {
    e.preventDefault();
    if(enableClick) {
        nextSlide();
        enableClick = false;
    }
})

prev.addEventListener('click', e => {
    e.preventDefault();
    if(enableClick) {
        prevSlide();
        enableClick = false;
    }
})

function init() {
    ul.style.left = '-50%';
    ul.prepend(ul.lastElementChild);
    ul.style.width = `${50 * len}%`;
    lis.forEach(li => {
        li.style.width = `${100 / len}%`;
    })
}

function prevSlide() {
    new Anim(ul, {
        prop: 'left',
        value: '0%',
        duration: speed,
        callback: () => {
            ul.style.left = '-50%';
            ul.prepend(ul.lastElementChild);
            enableClick = true;
        }
    })
}

function nextSlide() {
    new Anim(ul, {
        prop: 'left',
        value: '-100%',
        duration: speed,
        callback: () => {
            ul.style.left = '-50%';
            ul.append(ul.firstElementChild);
            enableClick = true;
        }
    })
}

function callData(url) {
    fetch(url)
    .then(data => {
        let result = data.json();
        return result;
    })
    .then(json => {
        let items = json.items;
        let result = '';
        items.map(item => {
            let title = item.snippet.title;
            if(title.length > 50) {
                title = title.substr(0, 50) + '...';
            }
    
            let con = item.snippet.description;
            if(con.length > 150) {
                con = title.substr(0, 150) + '...';
            }
    
            let date = item.snippet.publishedAt;
            date = date.split('T')[0];
            result += `
                <article class="article">
                    <a href="${item.snippet.resourceId.videoId}" class="pic">
                        <img src="${item.snippet.thumbnails.medium.url}" alt="">
                        <div class="con">
                            <h2>${title}</h2>
                            <p>${con}</p>
                            <span>${date}</span>
                        </div>
                    </a>
                </article>
            `;
        });
        vidList.innerHTML = result;
    });
}

function clickPop(items) {
    items.addEventListener('click', e => {
        e.preventDefault();
        if(!e.target.closest('a')) return;
        const vidId = e.target.closest('a').getAttribute('href');
        let pop = document.createElement('figure');
        pop.classList.add('pop');
        pop.innerHTML = `
                <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="70%" height="90%" allowfullscreen></iframe>
                <span class="btnClose">Close</span>
        `;
        items.append(pop);
        body.style.overflow = 'hidden';
    });
}

function close(items) {
    items.addEventListener('click', e => {
        const pop = items.querySelector('figure');
        if(pop != null) {
            const close = pop.querySelector('span');
            if(e.target == close) {
                e.target.closest('figure').remove();
                body.style.overflow = 'auto';
            }
        }
    })
}