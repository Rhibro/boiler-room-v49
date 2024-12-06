interface Repo {
    name: string;
    description: string;
    private: boolean;
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
                                <p>Private: ${repo.private}</p>
                                <p>ID: ${repo.id}</p>
                            `;
                            repoDetail.innerHTML = details;
                        });
                        repoDisplay.appendChild(repoItem);
                    });
                });
                      
                // .catch(error => {
                //     repoDetail.innerHTML = `<p>${error.message}</p>`;
                // });

            });