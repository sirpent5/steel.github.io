// script.js

const API_KEY = 'TFycfvhaerWsiS9WkRk8KD5nb3kJKa8FtNbh77uP';


document.getElementById('fetch-data-btn').addEventListener('click', () => {
    // TMDB combination for "The Shawshank Redemption"
    const titleId = 'movie-278';
    
    // Construct the URL with the title ID
    const url = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${API_KEY}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Log the entire response to see all the details you can access
            console.log(data);

            const container = document.getElementById('data-container');
            container.innerHTML = `
                <h3>${data.title} (${data.year})</h3>
                <p>IMDB Score: ${data.imdb_rating}</p>
                <p>Runtime: ${data.runtime_minutes} minutes</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching title details:', error);
            document.getElementById('data-container').innerHTML = '<p>Failed to load title data. Check the console for errors.</p>';
        });
});