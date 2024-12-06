document.addEventListener('DOMContentLoaded', function () {
    var repoDisplay = document.getElementById('repoDisplay');
    var repoDetail = document.getElementById('repoDetail');
    if (!repoDisplay || !repoDetail) {
        console.error('Required elements are missing in the HTML.');
        return;
    }
    fetch('https://api.github.com/users/rhibro/repos')
        .then(function (response) {
        if (!response.ok) {
            throw new Error('Could not load repositories... :(');
        }
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        repoDisplay.innerHTML = '';
        data.forEach(function (repo) {
            var repoItem = document.createElement('li');
            repoItem.classList.add('repo-item');
            repoItem.textContent = repo.name;
            repoItem.addEventListener('click', function () {
                var details = "\n                                <h3>".concat(repo.name, "</h3>\n                                <p>Description: <span>").concat(repo.description || 'No description available', "</span></p>\n                                <p>URL: <a href=\"").concat(repo.html_url, "\" target=\"_blank\">").concat(repo.html_url, "</a></p>\n                                <p>ID: ").concat(repo.id, "</p>\n                            ");
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
