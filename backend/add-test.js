   const pool = require('./db'); // import the connection

   //async function addMovieWithService(movieId, movieTitle, serviceId, serviceName) {
   const conn = await pool.getConnection();

   async function addStreamingService(serviceId, serviceName)
   {
      // add streaming service 
      await conn.query(
      `INSERT INTO streaming_services (id, name)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name)`,
      [serviceId, serviceName]
    );
   }

   async function addContentWithService(contentId, contentTitle, serviceId)
   {
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
            [movieId, serviceId]
        );
   }

  