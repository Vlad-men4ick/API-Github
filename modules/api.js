let baseURL = new URL('https://api.github.com');

export class Api {
    async searchRepo(valueSearch){
        try{
            const urlSearchRepositories = new URL(`/search/repositories`, baseURL);         // создаю новый объект с новыми значениями для поиска ревозиториев
            const encodeValueSearch = encodeURIComponent(`${valueSearch}`);                 // кодирую значение запроса что бы не сломать форматирование 
            urlSearchRepositories.searchParams.append('q', `${encodeValueSearch}`);         // добавляю в URL-запрос параметры запроса
            urlSearchRepositories.searchParams.set('per_page', '5')                         
            
            const requestRepositories = await fetch(`${urlSearchRepositories}`);
            return requestRepositories; 
            }catch(e){
                console.log(e)
                alert('Что-то пошло не так(. Проверьте ввод и повторите запрос')
            }
    }

    async searchRepoData(idRepos){
        const urlSearchRepository = new URL (`/repositories/${idRepos}`, baseURL);
        const requestRepository = await fetch(`${urlSearchRepository.href}`)
        return requestRepository.json();

        //убрал лишний код
        // const urls = [
        //     `${urlSearchRepository.href}`,
        // ];
        // const requests = urls.map(url => {
        //     console.log(url)
        //     return fetch(url)});
        // let responses = await Promise.all(requests);
        // console.log(responses, requests)
        // return await Promise.all((responses.map(r => {
        //     console.log(r)
        //     return r.json()})));
    }
}