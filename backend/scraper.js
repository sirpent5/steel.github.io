const pool = require("./db");
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

// Ensure these functions are correctly exported from add-test.js
const { addStreamingService, addContentWithService, addGenre, addContentWithGenre} = require('./write.js');
const { SERVICES, GENRES } = require('./constants');

const { API_KEY } = process.env;

async function scrapeContentServices(SERVICE_ID, SERVICE_NAME)
{
  try 
  {
    conn = await pool.getConnection();

    await addStreamingService(SERVICE_ID, SERVICE_NAME, conn);

    let page = 1;
    let totalFetched = 0;
    let hasMore = true;

    while (hasMore)
    {
      const url = `https://api.watchmode.com/v1/list-titles/?source_ids=${SERVICE_ID}&apiKey=${API_KEY}&page=${page}&limit=250`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.titles && data.titles.length > 0) {
        console.log(`Fetched ${data.titles.length} titles from ${SERVICE_NAME} (page ${page}).`);

        // Add each movie and its service link to the database
        for (const movie of data.titles) {
          await addContentWithService(movie.id, movie.title, SERVICE_ID, conn);
          totalFetched++;
        }
        console.log(`Added titles from ${SERVICE_NAME} to the database (page ${page}).`);
        page++;
        hasMore = data.titles.length === 250;
      } 
      else 
      {
        hasMore = false;
      }
    }

    console.log(`Successfully added ${totalFetched} titles from ${SERVICE_NAME} to the database.`);

  }
  catch (error) 
  {
    console.error(`Error scraping ${SERVICE_NAME}:`, error);
  } 
  finally 
  {
    if (conn) conn.release();
  }
}

async function scrapeContentGenres(GENRE_ID, GENRE_NAME, conn)
{
  try 
  {
    conn = await pool.getConnection();

    await addGenre(GENRE_ID, GENRE_NAME, conn);

    let page = 1;
    let totalFetched = 0;
    let hasMore = true;

    while (hasMore)
    {
      const url = `https://api.watchmode.com/v1/list-titles/?genres=${GENRE_ID}&apiKey=${API_KEY}&page=${page}&limit=250`;
      const response = await fetch(url);  
      const data = await response.json();

      if (data.titles && data.titles.length > 0) {
        console.log(`Fetched ${data.titles.length} titles from ${GENRE_NAME} (page ${page}).`);

        // Add each movie and its service link to the database
        for (const movie of data.titles) {
          await addContentWithGenre(movie.id, GENRE_ID, conn);
          totalFetched++;
        }
        console.log(`Added titles from ${GENRE_NAME} to the database (page ${page}).`);
        page++;
        hasMore = data.titles.length === 250;
      } 
      else 
      {
        hasMore = false;
      }
    }

    console.log(`Successfully added ${totalFetched} titles from ${GENRE_NAME} to the database.`);

  }
  catch (error) 
  {
    console.error(`Error scraping ${GENRE_NAME}:`, error);
  } 
  finally 
  {
    if (conn) conn.release();
  }
}


/*
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
*/
async function main() {

  let conn;
  /*
  for (const serviceKey in SERVICES) {
    const service = SERVICES[serviceKey];
    console.log(`\n--- Starting scrape for ${service.name} ---`);
    await scrapeContentServices(service.id, service.name, conn); 
    console.log(`--- Finished scrape for ${service.name} ---`);
  }
    */

  for (const genreKey in GENRES) {
    const genre = GENRES[genreKey];
    console.log(`\n--- Starting scrape for ${genre.name} ---`);
    await scrapeContentGenres(genre.id, genre.name, conn); 
    console.log(`--- Finished scrape for ${genre.name} ---`);
  }
  console.log('\nAll scraping tasks completed.');
  if (conn)
    conn.release();
  await pool.end(); 
}

// Call the main function to start the process

main();