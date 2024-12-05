interface Repo {
    name: string;
    // html_url: string;
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
                    repoDetail.innerHTML = '<p>Loading...</p>';

                    fetch('https://api.github.com/users/rhibro/repos')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Could not load repository details.');
                            }
                            return response.json() as Promise<Repo>;
                        })
                        .then(repoData => {
                            const details = `
                                <h3>${repoData.name}</h3>
                                <p>Description: ${repoData.description}</p>
                                <p>Private: ${repoData.private}</p>
                                <p>ID: ${repoData.id}</p>
                            `;
                            repoDetail.innerHTML = details;
                        })
                        .catch(error => {
                            repoDetail.innerHTML = `<p>${error.message}</p>`;
                        });
                });

                repoDisplay.appendChild(repoItem);
            });
        })
        .catch(error => {
            repoDisplay.innerHTML = `<li>${error.message}</li>`;
        });
});
