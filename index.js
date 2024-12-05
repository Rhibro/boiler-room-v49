document.getElementById('fetchbtn').addEventListener('click', function () {
    var title = document.getElementById('title').value.toLocaleLowerCase();
    var url = "https://api.github.com/repos/Rhibro/".concat(title);
    fetch(url)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("There are no repositories by the name of ".concat(title, "... :( "));
        }
        return response.json();
    })
        .then(function (data) {
        var repoList = document.getElementById('repoList');
        repoList.innerHTML = '';
        var listItem = document.createElement('li');
        listItem.textContent = data.name;
        repoList.appendChild(listItem);
        console.log(data.name);
    })
        .catch(function (error) {
        var repoList = document.getElementById('repoList');
        repoList.innerHTML = "<li>".concat(error.message, "</li>");
    });
});
