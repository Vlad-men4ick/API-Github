export class View{
    constructor(api){
        this.wrapper = document.querySelector('.wrapper');

        this.api = api;

        this.wrapperSearch = this.createElement('div', 'wrapper__search');

        this.searchContainer  = this.createElement('label', 'search___container');
        this.wrapperSearch.append(this.searchContainer);

        this.search = this.createElement('input', 'search');
        this.searchContainer.append(this.search);

        this.autoComplite = this.createElement('ul', 'autoComplite');
        this.wrapperSearch.append(this.autoComplite);

        this.wrapperList = this.createElement('div', 'wrapper__list');

        this.wrapper.append(this.wrapperSearch)
        this.wrapper.append(this.wrapperList)
    }

    createElement(elementTag, elementClass){
        const element = document.createElement(elementTag);
        if(elementClass){
            element.classList.add(elementClass);
        }
        return element;
    }

    createRepo(repoData){
        let autoCompliteItem = this.createElement('li', 'autoComplite__item');
        autoCompliteItem.addEventListener('click',() => {
            this.showRepoData(repoData.id);
        })
        autoCompliteItem.textContent = `${repoData.name}`;
        this.autoComplite.append(autoCompliteItem);
    }
    
    showRepoData(id){
        const list = this.createElement('ul', 'list')

        this.autoComplite.remove();                                     // после запуска функции которая отрисовывает список репозиториев удаляю autoComplite
        this.autoComplite = this.createElement('ul', 'autoComplite');   // после удаления autoComplite создаю новый элемент autoComplite 
        this.wrapperSearch.append(this.autoComplite);                   // добавляю его во wrapperSearch

        this.search.value = '';                                         // очищаю поисковую строку
        this.api.searchRepoData(id)
            .then(res => {
                const arrItem = [res.name, res['owner'].login, res.stargazers_count];
                const [name, owner, stars] = arrItem;

                const listItemName = this.createElement('li', 'list__item');
                const listItemOwner = this.createElement('li', 'list__item');
                const listItemStars = this.createElement('li', 'list__item');
                const listItemClosed = this.createElement('div', 'list-item___closed');
                
                listItemName.textContent = `Name: ${name}`; 
                listItemOwner.textContent = `Owner: ${owner}`; 
                listItemStars.textContent = `Stars: ${stars}`; 
                
                list.append(listItemName);
                list.append(listItemOwner);
                list.append(listItemStars);
                list.append(listItemClosed);
        }).then(() => {
            const btn = document.querySelectorAll('.list-item___closed')
                btn.forEach(el => el.addEventListener('click', this.cleerRepoList))
        })
        this.wrapperList.append(list)
    }
    
    cleerRepoList(e){
        e.target.parentNode.remove()
    }
}