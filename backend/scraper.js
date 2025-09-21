// // // const fetch = require("node-fetch");
const pool = require("./db");
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

const { API_KEY } = process.env;
const NETFLIX_SOURCE_ID = 203;
const HULU_SOURCE_ID = 157;
const DISNEY_SOURCE_ID = 372;
const AMAZON_SOURCE_ID = 26;
const AppleTVPlus_SOURCE_ID = 371;
const PEACOCK_SOURCE_ID = 388;
const MAX_SOURCE_ID = 387;
const TUBI_SOURCE_ID = 296;
const PARAMOUNT_SOURCE_ID = 444;
const FUBO_SOURCE_ID = 373;
const CRUNCHYROLL_SOURCE_ID = 79;



async function scrapeAndStore() {
  try {
    const url = `https://api.watchmode.com/v1/list-titles/?source_ids=${DISNEY_SOURCE_ID}&apiKey=${API_KEY}`;
    let response = await fetch(url);
    let movies = await response.json();

    count = 0;
    // console.log(movies);

    while (count < movies.titles.length)
    {
      if (count < 20)
      {
        console.log(movies.titles[count].id + ":" + movies.titles[count].title);
      }
        count ++;
    }
  }
catch (error) {
    console.error("Error during scraping and storing:", error);
  }
  console.log("Total movies found: " + count);}

// You can call this function to run it
scrapeAndStore();


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