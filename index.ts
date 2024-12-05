// define an interface for the repo data
interface Repo {
    name: string;
    url: string;
    description: string;
    private: boolean;
    id: number;
}

document.getElementById('fetchbtn')!.addEventListener('click', function() {
    const title: string = (document.getElementById('title') as HTMLInputElement).value.toLocaleLowerCase();
    const url: string = `https://api.github.com/users/rhibro/repos`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`There are no repositories by the name of ${title}... :( `);
            }
            return response.json() as Promise<Repo>;
        })
        .then(data => {
            const repoList = document.getElementById('repoList') as HTMLUListElement;
            repoList.innerHTML = '';

            const listItem = document.createElement('li');
            listItem.textContent = data.name 
            repoList.appendChild(listItem);
            console.log(data.name);
            console.log(data.id);
            console.log(data.description);
        })
        .catch(error => {
            const repoList = document.getElementById('repoList') as HTMLUListElement;
            repoList.innerHTML = `<li>${error.message}</li>`;
        });
});