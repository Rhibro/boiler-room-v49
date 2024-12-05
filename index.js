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
                repoDetail.innerHTML = '<p>Loading...</p>';
                fetch('https://api.github.com/users/rhibro/repos')
                    .then(function (response) {
                    if (!response.ok) {
                        throw new Error('Could not load repository details.');
                    }
                    return response.json();
                })
                    .then(function (repoData) {
                    var details = "\n                                <h3>".concat(repoData.name, "</h3>\n                                <p>Description: ").concat(repoData.description, "</p>\n                                <p>Private: ").concat(repoData.private, "</p>\n                                <p>ID: ").concat(repoData.id, "</p>\n                            ");
                    repoDetail.innerHTML = details;
                })
                    .catch(function (error) {
                    repoDetail.innerHTML = "<p>".concat(error.message, "</p>");
                });
            });
            repoDisplay.appendChild(repoItem);
        });
    })
        .catch(function (error) {
        repoDisplay.innerHTML = "<li>".concat(error.message, "</li>");
    });
});
