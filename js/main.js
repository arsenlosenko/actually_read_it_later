class SavedArticle {
    constructor(base) {
        this.base = base;
        this.render()
    }

    render() {
        this.createAddMoreBtn();
        this.base.appendChild(SavedArticle.createFormEntry());
        console.log(this.base);
    }

    createAddMoreBtn() {
        let addMoreBtn = document.createElement('button');
        let div = document.getElementById('addMoreBtn');
        addMoreBtn.textContent = '+';
        addMoreBtn.addEventListener('click', () => {
            this.base.appendChild(SavedArticle.createFormEntry());
        });

        div.appendChild(addMoreBtn);
        return div
    }

    static createFormEntry() {
        let div = document.createElement('div');
        div.appendChild(SavedArticle.createTextInput());
        div.appendChild(SavedArticle.createDateInput());
        div.appendChild(SavedArticle.createSubmitBtn());
        return div;
    }

    static createTextInput() {
        let urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.placeholder = 'Enter URL here';
        return urlInput;
    }

    static createDateInput() {
        let dateInput = document.createElement('input');
        dateInput.type = 'datetime-local';
        return dateInput;
    }

    static createSubmitBtn() {
        let btn = document.createElement('button');
        btn.textContent = 'Add';
        return btn;
    }

}

document.addEventListener('DOMContentLoaded', function () {
    let base = document.getElementById('app');
    new SavedArticle(base);
});

