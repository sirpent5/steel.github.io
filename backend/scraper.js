const pool = require("./db");
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

// Ensure these functions are correctly exported from add-test.js
const { addStreamingService, addContentWithService } = require('./add-test.js');

const { API_KEY } = process.env;

const SOURCES = {
  NETFLIX: { id: 203, name: 'Netflix' },
  HULU: { id: 157, name: 'Hulu' },
  DISNEY: { id: 372, name: 'Disney Plus' },
  AMAZON: { id: 26, name: 'Amazon' },
  AppleTVPlus: { id: 371, name: 'AppleTVPlus' },
  PEACOCK: { id: 388, name: 'Peacock' },
  MAX: { id: 387, name: 'MAX' },
  TUBI: { id: 296, name: 'Tubi' },
  PARAMOUNT: { id: 444, name: 'Paramount' },
  FUBO: { id: 373, name: 'Fubo' },
  CRUNCHYROLL: { id: 79, name: 'Crunchyroll' },
};

async function allMovies(SERVICE_ID, SERVICE_NAME) {
  
  try {
    conn = await pool.getConnection();

    const url = `https://api.watchmode.com/v1/list-titles/?source_ids=${SERVICE_ID}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    // Add streaming service to the database
    await addStreamingService(SERVICE_ID, SERVICE_NAME, conn);

    if (data.titles && data.titles.length > 0) {
      console.log(`Successfully fetched ${data.titles.length} titles from ${SERVICE_NAME}.`);

      // Add each movie and its service link to the database
      for (const movie of data.titles) {
        await addContentWithService(movie.id, movie.title, SERVICE_ID, conn);
      }
      console.log(`Successfully added all titles from ${SERVICE_NAME} to the database.`);
    } else {
      console.log(`No titles found for ${SERVICE_NAME}.`);
    }

  } catch (error) {
    console.error(`Error during scraping and storing for ${SERVICE_NAME}:`, error);
  }
}

async function main() {
  await allMovies(79, CRUNCHYROLL.name);

  let conn;
  // for (const sourceName in SOURCES) {
  //   const source = SOURCES[sourceName];
  //   console.log(`\n--- Starting scrape for ${source.name} ---`);
  //   await allMovies(source.id, source.name); // 👈 Correct: Use await here
  //   console.log(`--- Finished scrape for ${source.name} ---`);
  // }
  console.log('\nAll scraping tasks completed.');
    conn.release();
  await pool.end(); // 👈 Correct: End the pool to allow process to exit
}

// Call the main function to start the process
main();

