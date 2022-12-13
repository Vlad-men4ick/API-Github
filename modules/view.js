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
        let y = autoCompliteItem.addEventListener('click',() => {
            this.showRepoData(repoData.id);
        })
        autoCompliteItem.innerHTML = `${repoData.name}`;
        this.autoComplite.append(autoCompliteItem);
    }

    showRepoData(id){
        const list = this.createElement('ul', 'list')
        this.autoComplite.innerHTML = '';
        this.search.value = '';
        this.api.searchRepoData(id)
            .then(res => {
                const arrItem = [res[0].name, res[0]['owner'].login, res[0].stargazers_count];
                const [name, owner, stars] = arrItem;
                const repList = this.createRepoList(name, owner, stars);
                list.innerHTML = repList;

        }).then(() => {
            const btn = document.querySelectorAll('.list-item___closed')
                btn.forEach(el => el.addEventListener('click', this.cleerRepoList))
            
        })
        this.wrapperList.append(list)
    }

    createRepoList(name, owner, stars){
        const list = this.createElement('ul', 'list');
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
        
        return list.innerHTML;
    }
    
    cleerRepoList(e){
        e.target.parentNode.remove()
    }
}