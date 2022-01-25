const frame = document.querySelector('.profile');
fetch('data/members.json')
    .then(data => {
        return data.json();
    })
    .then(json => {
        const memberInfo = json.data;
        let tags = '';
        memberInfo.map(member => {
            tags+= `
            <article class="member_article">
                <div class="line">
                    <img src="${member.pic}">
                    <span>
                    <div class="txtBox">
                        <h2>${member.name}</h2>
                        <span>${member.position}</span>
                        <p>${member.comment}</p>
                        <div class="icons">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fas fas fa-envelope"></i></a>
                        </div>
                    </div>
                    </span>
                </div>
            </article>
        `;
        })
        frame.innerHTML = tags;
    })