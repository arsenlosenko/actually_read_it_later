class AppStructureCreator {
    constructor() {
        this.articleData = {};
    }

    createFormEntry() {
        let div = document.createElement('div');
        div.appendChild(AppStructureCreator.createTextInput());
        div.appendChild(AppStructureCreator.createDateInput());
        div.appendChild(this.createSubmitBtn());
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

    createSubmitBtn() {
        let btn = document.createElement('button');
        btn.textContent = 'Add';
        btn.addEventListener('click', () => {
            this.articleData.url = btn.parentElement.children[0].value;
            this.articleData.time = btn.parentElement.children[1].value;
        });
        return btn;
    }
}


class AppLogicCreator extends AppStructureCreator {
    createFormEntry() {
        return super.createFormEntry();
    }

    constructor(base) {
        super();
        this.base = base;
        this.render()
    }

    render() {
        this.createAddMoreBtn();
        this.base.appendChild(this.createFormEntry());
        console.log(this.base);
    }

    createAddMoreBtn() {
        let formCount = 1;
        let addMoreBtn = document.createElement('button');
        let div = document.getElementById('addMoreBtn');
        addMoreBtn.textContent = '+';
        addMoreBtn.addEventListener('click', () => {
            if (formCount < 5) {
                this.base.appendChild(this.createFormEntry());
            }
            else {
                div.textContent = 'You can save only 5 articles at once!'
            }
            formCount++;
            console.log(formCount);
        });

        div.appendChild(addMoreBtn);
        return div
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let base = document.getElementById('app');
    new AppLogicCreator(base);
});

