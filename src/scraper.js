const cheerio = require("cheerio");
const axios = require("axios");
const router = require("express").Router();
const { generateFilename } = require("./utils");
const auth = require('./auth.js');


const baseUrl = "w";

router.get("/", (req, res) => {
  res.send("welcome to the gofundme scraper")
})

router.post("/scrape", auth.authenticateKey, async (req, res) => {
  // Get the URL from the request body
  const { url } = req.body;
  // Validate the URL
  if (!url.includes(baseUrl)) {
    console.log("Invalid URL");
    res.status(400).json({
      message: "Error scraping details",
    })
    return;
  }

  try {
    // Get the HTML from the URL
    axios.get(url).then((response) => {
      // Load the HTML into cheerio
      const $ = cheerio.load(response.data); // Cheerio takes the HTML and parses it into a format that is easy to use

      const title = $('meta[property="og:title"]').attr('content');
      const imageURL = $('meta[property="og:image"]').attr('content');
      const progressString = $("div.hrt-disp-inline").text().replace(/[^0-9]/g, '')
      const currency = $("div.hrt-disp-inline").text().replace(/[0-9,]/g, '')
      const targetString = $("span.hrt-text-body-sm").text().replace(/[^0-9]/g, '')

      res.json({
        progressString,
        targetString,
        currency,
        title,
        imageURL,
        message: "Details scraped successfully",
        filename: generateFilename(),
      });
    }).catch(error => {
      res.status(500).json({
        message: "Error retrieving GFM URL",
        error: error.message,
      });
    });
  } catch (error) {
    res.statusCode(500).json({
      message: "Error scraping products",
      error: error.message,
    });
  }
});

router.post("/bulk-scrape", auth.authenticateKey, async (req, res) => {
  // Get the URL from the request body
  const { urls } = req.body;
  // Validate the URL
  if (!urls[0].includes(baseUrl)) {
    console.log(urls[0])
    console.log("Invalid URL");
    res.status(400).json({
      message: "Error scraping details",
    })
    return;
  }

  try {
    // Get the HTML from the URL
    Promise.all(urls.map(url => axios.get(url).catch(err => Promise.resolve(""))))
      .then((responses) => {
        const GFMdata = responses.map(response => {

        if (!!response.data)  {
          const $ = cheerio.load(response.data); // Cheerio takes the HTML and parses it into a format that is easy to use
          
          const title = $('meta[property="og:title"]').attr('content');
          const imageURL = $('meta[property="og:image"]').attr('content');
          const progressString = $("div.hrt-disp-inline").text().replace(/[^0-9]/g, '')
          const currency = $("div.hrt-disp-inline").text().replace(/[0-9,]/g, '')
          const targetString = $("span.hrt-text-body-sm").text().replace(/[^0-9]/g, '')
          
          return {
            progressString,
            targetString,
            currency,
            title,
            imageURL,
          }
        }
        return {}
        })
        res.json({
          GFMdata,
          message: "Details scraped successfully"
        })
      })
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: "Error retrieving GFM URL",
        error: error.message,
      });
    })
  } catch (error) {
    res.status(500).json({
      message: "Error scraping all urls",
      error: error.message,
    });
  }
});

// Export the router so it can be used in the server.js file
module.exports = router;
