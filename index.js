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
                var details = "\n                                <h3>".concat(repo.name, "</h3>\n                                <p>Description: <span>").concat(repo.description || 'No description available', "</span></p>\n                                <p>Private: ").concat(repo.private, "</p>\n                                <p>ID: ").concat(repo.id, "</p>\n                            ");
                repoDetail.innerHTML = details;
            });
            repoDisplay.appendChild(repoItem);
        });
    });
    try { }
    catch (error) { }
    {
        repoDetail.innerHTML = "<p>".concat(error.message, "</p>");
    }
});
;
