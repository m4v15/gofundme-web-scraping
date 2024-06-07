const { db, sql } = require("@vercel/postgres");

const router = require("express").Router();

async function getGFMs() {
  try {
    const client = await db.connect();


    const gfms = await sql`
    SELECT gfms.title, gfms.imageurl, gfms.url, gfms.progress
    FROM gfms`;

    await client.end();




    return gfms.rows;
  } catch (error) {
    console.error("Error retrieving gfms:", error);
    throw error;
  }
}

router.get(`/`, async (req, res) => {
  try {


    const rows = await getGFMs()

    res.json(rows)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Error retrieving data"
    });
  }


  
});

// Export the router so it can be used in the server.js file
module.exports = router;
