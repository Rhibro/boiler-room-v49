// define an interface for repo data
interface Repo {
    name: string;
    description: string;
    language: string,
    html_url: string;
}

// add event listeners to html elements 
document.addEventListener('DOMContentLoaded', async () => {

    // declaring variables with explicit types
    const repoDisplay = document.getElementById('repoDisplay') as HTMLUListElement | null;
    const repoDetail = document.getElementById('repoDetail') as HTMLDivElement | null;

    // first tried to use just fetch but you cannot use catch without try
   try {
    const response = await fetch('https://api.github.com/users/rhibro/repos');
    if (!repoDisplay || !repoDetail) {
        console.error('Required elements are missing in the HTML.');
        return;
    }

    const data: Repo[] = await response.json();

            repoDisplay.innerHTML = '';

            data.forEach(repo => {
                const repoItem = document.createElement('li');
                repoItem.classList.add('repo-item');
                repoItem.textContent = repo.name;

                    repoItem.addEventListener('click', () => {

                            const details = `
                                <h3>${repo.name}</h3>
                                <p>Description: ${repo.description || 'No description available'}</p>
                                <p>Language: ${repo.language}</p>
                                <p>URL: <a href="${repo.html_url}" target="_blank">${repo.html_url}</a></p>
                            `;
                            console.log('Repository Details:', repo);
                            repoDetail.innerHTML = details;
                        });
                        repoDisplay.appendChild(repoItem);
                    });
                } catch (error) {
                    console.log('Error fetching repositories:', error);
                    if (repoDetail) {
                        repoDetail.innerHTML = `
                            <p>Oops! Something went wrong while fetching the repositories.</p>
                            <p>Please try again later.</p>
                        `;
                    }
                    if (repoDisplay) {
                        repoDisplay.innerHTML = `
                            <li>No repositories to display due to an error.</li>
                        `;
                    }
                }
            });
                      
       