require("dotenv").config();
const { db, sql } = require("@vercel/postgres");
const router = require("express").Router();
const auth = require('./auth.js');

async function addRows(client, gfmData) {
  try {

    const insertedGfms = await sql.query(
      `INSERT INTO gfms (url, imageurl, title, progress)
       SELECT url, imageurl, title, progress FROM json_populate_recordset(NULL::gfms, $1)
       ON CONFLICT (url) DO UPDATE
       SET progress = EXCLUDED.progress`,
      [JSON.stringify(gfmData)]
    );

    return {
      addRows,
    };
  } catch (error) {
    console.error("Error adding gfms:", error);
    throw error;
  }
}

async function mainAdd(data) {
  const client = await db.connect();
  console.log("connected to db");

  // await createTable(client)
  // console.log('table created')
  const tableRows = data
  console.log({data})
  await addRows(client, tableRows)
  console.log(`added ${tableRows.length} lines of data to DB`);

  await client.end();
}


router.post(`/${process.env.DBAPIURL}`, auth.authenticateKey, async (req, res) => {
  // get list of URLS & progresses from googlesheet
  // clean them
  // Add to DB
  try {

    const { spreadsheetData } = req.body;
  
    await mainAdd(spreadsheetData)
    res.send("thanks, all done")
  } catch (error) {
    res.status(500).json({
      message: "Error adding to DB",
      error: error.message,
    });
  }


  
});

// Export the router so it can be used in the server.js file
module.exports = router;
