const URL = 'https://api.github.com/';

export class Api {
    async searchRepo(value){
        try{
        let a = await fetch(`${URL}search/repositories?q=${value}&per_page=5`);
        if(a.status != 422){
            return a;
        } else {
            alert('Репозитория с таким именем нет проверьте ввод')
            console.clear()
        }
        }catch(e){
            console.log(error)
        }
    }

    async searchRepoData(id){
        const urls = [
            `${URL}repositories/${id}`,
        ];
        const requests = urls.map(url => fetch(url));
        const responses = await Promise.all(requests);
        return await Promise.all((responses.map(r => r.json())));
    }
}