class SavedArticle {
    constructor(base) {
        this.url = "";
        this.time = "";
        this.base = base;
        this.title = "";
        this.icon = ""
    }

    createTextInput() {
        let urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.placeholder = 'Enter URL here';
        return urlInput;
    }

    createDateInput() {
        let dateInput = document.createElement('input');
        dateInput.type = 'datetime-local';
        return dateInput;
    }

    createSubmitBtn() {
        let btn = document.createElement('button');
        btn.textContent = 'Add';
        btn.addEventListener('click', ()=>{
           this.render();
        });
        return btn;
    }


    createForm() {
        let form = document.createElement('form');
        let input = this.createTextInput();
        let date = this.createDateInput();
        let btn = this.createSubmitBtn();
        form.appendChild(input);
        form.appendChild(date);
        form.appendChild(btn);
        return form;
    }

    render() {
        let form = this.createForm();
        this.base.appendChild(form);
        console.log(this.base, form);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let base = document.getElementById('app');
    let article = new SavedArticle(base);
    article.render();
});

