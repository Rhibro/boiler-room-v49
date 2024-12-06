interface Repo {
    name: string;
    description: string;
    html_url: string;
    id: number;
}

document.addEventListener('DOMContentLoaded', () => {
    const repoDisplay = document.getElementById('repoDisplay') as HTMLUListElement | null;
    const repoDetail = document.getElementById('repoDetail') as HTMLDivElement | null;

    if (!repoDisplay || !repoDetail) {
        console.error('Required elements are missing in the HTML.');
        return;
    }

    fetch('https://api.github.com/users/rhibro/repos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load repositories... :(');
            }
            return response.json() as Promise<Repo[]>;
        })
        .then(data => {
            console.log(data);
            repoDisplay.innerHTML = '';

            data.forEach(repo => {
                const repoItem = document.createElement('li');
                repoItem.classList.add('repo-item');
                repoItem.textContent = repo.name;

                    repoItem.addEventListener('click', () => {

                            const details = `
                                <h3>${repo.name}</h3>
                                <p>Description: <span>${repo.description || 'No description available'}</span></p>
                                <p>URL: <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>
                                <p>ID: ${repo.id}</p>
                            `;
                            console.log('Repository Details:', repo);
                            repoDetail.innerHTML = details;
                        });
                        repoDisplay.appendChild(repoItem);
                    });
                });
                      
                // .catch(error => {
                //     repoDetail.innerHTML = `<p>${error.message}</p>`;
                // });

            });