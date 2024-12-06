"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// add event listeners to html elements 
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    // declaring variables with explicit types
    const repoDisplay = document.getElementById('repoDisplay');
    const repoDetail = document.getElementById('repoDetail');
    try {
        const response = yield fetch('https://api.github.com/users/rhibro/repos');
        if (!repoDisplay || !repoDetail) {
            console.error('Required elements are missing in the HTML.');
            return;
        }
        const data = yield response.json();
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
    }
    catch (error) {
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
}));
