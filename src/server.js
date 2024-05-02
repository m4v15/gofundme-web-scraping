const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const scrapeProducts = require('./scraper');
const addToDB = require("./addToDB")

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// middleware for routes
app.use('/', scrapeProducts);
app.use('/', addToDB);


// Server listening
server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export server for testing
module.exports = server;



