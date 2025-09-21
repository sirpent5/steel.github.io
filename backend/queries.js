const pool = require('./db');
const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

async function rankByGenre(genreIds)
{
    const[rows] = await pool.query(
        `SELECT streaming_services.id, streaming_services.name, COUNT(DISTINCT movie_sources.content_id) AS movie_count 
        FROM movie_sources
        JOIN streaming_services
            ON movie_sources.service_id = streaming_services.id
        JOIN content_genres
            ON movie_sources.content_id = content_genres.content_id
        WHERE content_genres.genre_id IN (?)
        GROUP BY streaming_services.id, streaming_services.name
        ORDER BY movie_count DESC;`
        [genreIds]
    );

    return rows;
}

async function compareServices(serviceIdA, serviceIdB)
{
    const [rows] = await pool.query(
        `
        WITH 
        A AS (
            SELECT content_id FROM movie_sources WHERE service_id = ?
        ),
        B AS (
            SELECT content_id FROM movie_sources WHERE service_id = ?
        ),
        Intersection AS (
            SELECT COUNT(*) AS overlap
            FROM A
            INNER JOIN B ON A.content_id = B.content_id
        ),
        UnionCounts AS (
            SELECT 
                (SELECT COUNT(*) FROM A) +
                (SELECT COUNT(*) FROM B) -
                (SELECT overlap FROM Intersection) AS union_size
        )
        SELECT 
            (SELECT overlap FROM Intersection) / union_size AS jaccard
        FROM UnionCounts;`,
        [serviceIdA, serviceIdB]
    );

    return rows[0].jaccard * 100; 
}

module.exports = {
  rankByGenre,
  compareServices
};

