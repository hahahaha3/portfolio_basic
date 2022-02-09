class Mytab {
    constructor(el) {
        this.init(el);
        this.bindingEvent();
    }

    init(el) {
        this.tab = document.querySelector(el);
        this.btns = this.tab.querySelectorAll('ul li');
        this.boxs = this.tab.querySelectorAll('article div');
    }
    bindingEvent() {
        this.btns.forEach((el, index) => {
            el.addEventListener('click', e => {
                e.preventDefault();
    
                this.activation(this.btns, index);
                this.activation(this.boxs, index);
            });
        });
    }

    activation(arr, index) {
        for(let el of arr) {
            el.classList.remove('on');
        }
        arr[index].classList.add('on');
    }
}