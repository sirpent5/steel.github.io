// const fetch = require("node-fetch");
const pool = require("./db");

const API_KEY = process.env.API_KEY;
const NETFLIX_SOURCE_ID = 8;

async function scrapeAndStore() {
  try {
    const url = `https://api.watchmode.com/v1/list-titles/?source_id=${NETFLIX_SOURCE_ID}&limit=20&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const movies = await response.json();

    if (movies.titles && movies.titles.length > 0) {
      for (const movie of movies.titles) {
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
      console.log(`Scraped and stored ${movies.titles.length} movies!`);
    } else {
      console.log("No movies found.");
    }
  } catch (err) {
    console.error("Error scraping movies:", err);
  }
}

// You can call this function to run it
scrapeAndStore();