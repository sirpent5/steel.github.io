// script.js

// ❗ WARNING: Not for production! Your API key is visible to anyone.
const API_KEY = 'TFycfvhaerWsiS9WkRk8KD5nb3kJKa8FtNbh77uP';

document.getElementById('fetch-data-btn').addEventListener('click', () => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('data-container');
            container.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.body}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('data-container').innerHTML = '<p>Failed to load data.</p>';
        });
});