const pool = require('./db');


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
        ORDER BY movie_count DESC;`,
        [genreIds]
    );

    return rows;
}

async function compareServices(serviceIdA, serviceIdB) {
    const [rows] = await pool.query(
        `
        SELECT
            COUNT(DISTINCT m1.content_id) AS overlap,
            (SELECT COUNT(*) FROM movie_sources WHERE service_id = ?) +
            (SELECT COUNT(*) FROM movie_sources WHERE service_id = ?) -
            COUNT(DISTINCT m1.content_id) AS union_size
        FROM movie_sources m1
        INNER JOIN movie_sources m2
            ON m1.content_id = m2.content_id
        WHERE m1.service_id = ? AND m2.service_id = ?;
        `,
        [serviceIdA, serviceIdB, serviceIdA, serviceIdB]
    );

    const jaccard = rows[0]?.overlap / (rows[0]?.union_size || 1);
    return jaccard * 100;
}


module.exports = {
  rankByGenre,
  compareServices
};

async function test() {
const fool = await compareServices('157', '372');
console.log(`Jaccard Index: ${fool}`);
}

test();
