//    const pool = require('./db'); // import the connection

//    //async function addMovieWithService(movieId, movieTitle, serviceId, serviceName) {
//    const conn = await pool.getConnection();



//    async function addStreamingService(serviceId, serviceName)
//    {
//       // add streaming service 
//       await conn.query(
//       `INSERT INTO streaming_services (id, name)
//        VALUES (?, ?)
//        ON DUPLICATE KEY UPDATE name = VALUES(name)`,
//       [serviceId, serviceName]
//     );
//    }

//    async function addContentWithService(contentId, contentTitle, serviceId)
//    {
//         await conn.query(
//             `INSERT INTO content (id, title)
//             VALUES (?, ?)
//             ON DUPLICATE KEY UPDATE title = VALUES(title), last_updated = CURRENT_TIMESTAMP`,
//             [contentId, contentTitle]
//         );

//         await conn.query(
//             `INSERT INTO movie_sources (content_id, service_id)
//             VALUES (?, ?)
//             ON DUPLICATE KEY UPDATE last_updated = CURRENT_TIMESTAMP`,
//             [movieId, serviceId]
//         );
//    }

//   const pool = require("./db");
//   const dotenv = require('dotenv');
//   dotenv.config({ path: './backend/.env' });

  const pool = require("./db");
  const dotenv = require('dotenv');
  dotenv.config({ path: './backend/.env' });

const { API_KEY } = process.env;

const NETFLIX_ID = 203;


//   async function oneMovie(SOURCE_ID) {
//   try {
//     const url = `https://api.watchmode.com/v1/list-titles/?source_ids=${SOURCE_ID}&limit=1&apiKey=${API_KEY}`;
//     let response = await fetch(url);
//     let movie = await response.json();
//     console.log(movie);

    


//   }
// catch (error) {
//     console.error("Error during scraping and storing:", error);
//   }
//   }
// const pool = require("./db");
// const dotenv = require('dotenv');
// dotenv.config({ path: './backend/.env' });

// const { API_KEY } = process.env;
//const NETFLIX_ID = 203;
const NETFLIX_NAME = 'Netflix';

// Function to add a single streaming service to the database
async function addStreamingService(serviceId, serviceName, conn) {
    await conn.query(
        `INSERT INTO streaming_services (id, name)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE name = VALUES(name)`,
        [serviceId, serviceName]
    );
}

// Function to add a movie and its service link to the database
async function addContentWithService(contentId, contentTitle, serviceId, conn) {
    await conn.query(
        `INSERT INTO content (id, title)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE title = VALUES(title), last_updated = CURRENT_TIMESTAMP`,
        [contentId, contentTitle]
    );

    await conn.query(
        `INSERT INTO movie_sources (content_id, service_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE last_updated = CURRENT_TIMESTAMP`,
        [contentId, serviceId]
    );
}

// Main function to fetch one movie and store it
//finds service. for us, netflix
// add streaming service attributes to db
//
async function oneMovie(SERVICE_ID) {
    let conn; 
    try {
        conn = await pool.getConnection(); 
        
        // 1. Fetch data from Watchmode API
        const url = `https://api.watchmode.com/v1/list-titles/?source_ids=${SERVICE_ID}&limit=1&apiKey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        // Check if data and titles exist
        if (data.titles && data.titles.length > 0) {
            const movie = data.titles[0];
            const movieId = movie.id;
            const movieTitle = movie.title;
            
            console.log(`Fetched movie: ${movieTitle} (ID: ${movieId})`);
            
            // service to database
            await addStreamingService(NETFLIX_ID, NETFLIX_NAME, conn);
            
            // add movie link to service
            await addContentWithService(movieId, movieTitle, NETFLIX_ID, conn);
            
            console.log(`Successfully added movie "${movieTitle}" and linked it to Netflix.`);

            // Removed the `return;` statement here
        } else {
            console.log('No titles found for Netflix. Check your API key or data source.');
        }

    } catch (error) {
        console.error("Error during scraping and storing:", error);
    } finally {
        // This is where conn.release() must be.
        // It runs whether the try or catch block finishes.
        if (conn) {

            conn.release();

            
        }
    }
 
}

oneMovie(NETFLIX_ID)
    .then(() => {
        // Once the oneMovie() promise resolves, gracefully end the connection pool
        console.log("Ending database connection pool.");
        return pool.end();
    })
    .then(() => {
        console.log("Process exited successfully.");
    })
    .catch(err => {
        console.error("Error ending the pool:", err);
    });

