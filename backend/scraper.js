const fetch = require("node-fetch");
const pool = require("./backend/db");

const API_KEY = process.env.API_KEY;

async function scrapeAndStore() {
  try {
    const url = `https://api.watchmode.com/v1/list-titles/?source_id=${NETFLIX_SOURCE_ID}&genres=rom-com&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const movies = await response.json();

    for (const content of movies) {
      await pool.execute(
        `INSERT INTO movies (watchmode_id, title, genres, sources, release_year, rating)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           title=VALUES(title),
           genres=VALUES(genres),
           sources=VALUES(sources),
           release_year=VALUES(release_year),
           rating=VALUES(rating)`,
        [
          movie.id,
          movie.title,
          JSON.stringify(movie.genres),
          JSON.stringify(movie.sources),
          movie.release_year,
          movie.rating
        ]
      );
    }

    console.log(`Scraped and stored ${movies.length} movies!`);
  } catch (err) {
    console.error("Error scraping movies:", err);
  }
}

module.exports = { scrapeAndStore };
