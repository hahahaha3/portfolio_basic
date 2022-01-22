const vidList = document.querySelector('.vidList');
const key = 'AIzaSyAMeYaiQ_kCtY_ZWYUq46p2gSQZowgTuSA';
const playlistId = 'PLx62HH_9oB7gzkqn1mQQlLKcyMDYlWXPe';
const num = 12;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url)
.then(data => {
    return data.json();
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
            <article>
                <a href="${item.snippet.resourceId.videoId}" class="pic">
                    <img src="${item.snippet.thumbnails.medium.url}" alt="">
                </a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${con}</p>
                    <span>${date}</span>
                </div>
            </article>
        `;
    });
    vidList.innerHTML = result;
});

vidList.addEventListener('click', e => {
    e.preventDefault();

    if(!e.target.closest('a')) return;

    const vidId = e.target.closest('a').getAttribute('href');
    let pop = document.createElement('figure');
    pop.classList.add('pop');
    pop.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
            <span class="btnClose">Close</span>
    `;
    vidList.append(pop);
});

vidList.addEventListener('click', e => {
    const pop = vidList.querySelector('figure');
    if(pop != null) {
        const close = pop.querySelector('span');

        if(e.target == close) {
            e.target.closest('figure').remove();
        }
    }
})