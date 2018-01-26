class AppStructureCreator {
    static createFormEntry() {
        let div = document.createElement('div');
        div.appendChild(AppStructureCreator.createTextInput());
        div.appendChild(AppStructureCreator.createDateInput());
        div.appendChild(AppStructureCreator.createSubmitBtn());
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


class AppLogicCreator extends AppStructureCreator {
    constructor(base) {
        super();
        this.base = base;
        this.render()
    }

    render() {
        this.createAddMoreBtn();
        this.base.appendChild(AppLogicCreator.createFormEntry());
        console.log(this.base);
    }

    createAddMoreBtn() {
        let addMoreBtn = document.createElement('button');
        let div = document.getElementById('addMoreBtn');
        addMoreBtn.textContent = '+';
        addMoreBtn.addEventListener('click', () => {
            this.base.appendChild(AppLogicCreator.createFormEntry());
        });

        div.appendChild(addMoreBtn);
        return div
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let base = document.getElementById('app');
    new AppLogicCreator(base);
});

