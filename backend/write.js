const pool = require("./db");
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

const { API_KEY } = process.env;

// add a streaming service to the database
async function addStreamingService(serviceId, serviceName, conn) {
    await conn.query(
        `INSERT INTO streaming_services (id, name)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE name = VALUES(name)`,
        [serviceId, serviceName]
    );
}

// add a genre to the database
async function addGenre(genreId, genreName, conn) {
    await conn.query(
        `INSERT INTO genres (id, name)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE name = VALUES(name)`,
        [genreId, genreName]
    );
}

// add a movie to the content and sources
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

// add a movie to the content and sources
async function addContentWithGenre(contentId, genreId, conn) {
    const [rows] = await conn.query(
        'SELECT id FROM content WHERE id = ?',
        [contentId]
    );

    // don't add movie if it's not provided but one of the supported streaming services
    if (rows.length == 0)
    {
        return;
    }

    await conn.query(
        `INSERT INTO content_genres (content_id, genre_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE content_id = VALUES(content_id)`,
        [contentId, genreId]
    );
}


module.exports = {
    addStreamingService,
    addContentWithService,
    addGenre,
    addContentWithGenre
};