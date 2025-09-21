// // // const fetch = require("node-fetch");
const pool = require("./db");
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

const { API_KEY } = process.env;
const SOURCES = {
  NETFLIX: 203,
  HULU: 157,
  DISNEY: 372,
  AMAZON: 26,
  AppleTVPlus: 371,
  PEACOCK: 388,
  MAX: 387,
  TUBI: 296,
  PARAMOUNT: 444,
  FUBO: 373,
  CRUNCHYROLL: 79,
};



async function scrapeAndStore(SOURCE_ID) {
  let count = 0;
  try {
    const url = `https://api.watchmode.com/v1/list-titles/?source_ids=${SOURCE_ID}&apiKey=${API_KEY}`;
    let response = await fetch(url);
    let movies = await response.json();

    // console.log(movies);

    while (count < movies.titles.length)
    {
      if (count < 20)
      {
        console.log(movies.titles[count].watchid + ":" + movies.titles[count].title);
      }
        count ++;
    }
  }
catch (error) {
    console.error("Error during scraping and storing:", error);
  }
  console.log("Total movies found: " + count);}

// You can call this function to run it
async function main() {
  for (const sourceName in SOURCES) {
    // if (Object.hasOwnProperty.call(SOURCES, sourceName)) {
      const SOURCE_ID = SOURCES[sourceName];
      console.log(`\n--- Starting scrape for ${sourceName} ---`);
      await scrapeAndStore(SOURCE_ID);
      console.log(`--- Finished scrape for ${sourceName} ---`);
    
  }
  console.log('\nAll scraping tasks completed.');
}

// Call the main function to start the process
main();


// //const fetch = require('node-fetch');
// // const dotenv = require('dotenv');
// // dotenv.config({ path: './backend/.env' });

// // const API_KEY = process.env.API_KEY;

// // async function getGenres() {
// //     try {
// //         const url = `https://api.watchmode.com/v1/genres/?apiKey=${API_KEY}`;
// //         const response = await fetch(url);
// //         const genres = await response.json();

// //         if (genres && genres.length > 0) {
// //             console.log("Here is a list of all genres:");
// //             console.log("-------------------------------");
// //             genres.forEach(genre => {
// //                 console.log(`ID: ${genre.id} - Name: ${genre.name}`);
// //             });
// //         } else {
// //             console.log("No genres found. Check your API key or connection.");
// //         }
// //     } catch (err) {
// //         console.error("Error fetching genres:", err);
// //     }
// // }

// // getGenres();

// 

//const fetch = require('node-fetch');
// const dotenv = require('dotenv');
// dotenv.config({ path: './backend/.env' });

// const API_KEY = process.env.API_KEY;

// async function getServices() {
//     try {
//         const url = `https://api.watchmode.com/v1/sources/?apiKey=${API_KEY}`;
//         const response = await fetch(url);
//         const sources = await response.json();

//         if (sources && sources.length > 0) {
//             console.log("Here is a list of all streaming services and their IDs:");
//             console.log("-------------------------------------------------------");
//             sources.forEach(source => {
//                 console.log(`ID: ${source.id} - Name: ${source.name}`);
//             });
//         } else {
//             console.log("No services found. Check your API key or connection.");
//         }
//     } catch (err) {
//         console.error("Error fetching services:", err);
//     }
// }

// getServices();