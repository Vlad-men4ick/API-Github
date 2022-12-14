export class Search{
    constructor(view, api){
        this.view = view;
        this.api = api;

        this.view.search.addEventListener('keyup', this.debounce(this.searchRepo.bind(this),700))
    }
    searchRepo(){
        const searchValue = this.view.search.value;
        if(searchValue){
            this.repoRequest(searchValue);
        } else {
            this.clearSearchRepo();
        }
    }

    async repoRequest(searchValue){
        try{
            await this.api.searchRepo(searchValue).then((res)=>{
                res.json().then(res => res.items.forEach(repository => this.view.createRepo(repository)))
            })
        } catch(e){
            alert('Error:' + e);
        }
    }
    
    clearSearchRepo(){
        this.view.autoComplite.textContent = '';
    }


    debounce(fn, debounceTime) {
        let timeOut;
        return function (){
            const callback = () => { 
                fn.apply(this, arguments)
            } 
            clearTimeout(timeOut);
            timeOut = setTimeout(callback, debounceTime)
        }
    }
}