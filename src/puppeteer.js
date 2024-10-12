
const puppeteer = require("puppeteer")
const router = require("express").Router();


const getFigures = async (url) => {
  // Start a Puppeteer session with:
  // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
  // - no default viewport (`defaultViewport: null` - website page will in full width and height)
  const browser = await puppeteer.launch({
    headless: true,
  });

  // Open a new page
  const page = await browser.newPage();

  await page.goto(url);

  const figures = await page.evaluate(() => {

    const title = document.querySelector('meta[property="og:title"]').getAttribute('content');
    const imageURL = document.querySelector('meta[property="og:image"]').getAttribute('content');
    const progressString = document.querySelector(".hrt-text-body-sm").firstChild.innerText.replace(/[^0-9]/g, '');
    const currency = document.querySelector(".hrt-text-body-sm").firstChild.innerText.replace(/[0-9,]/g, '');


    return { title, imageURL, progressString, currency };
  });

  console.log({figures})
  await browser.close();
  return figures
  


};

router.post('/puppet', async (req, res) => {
  const { url } = req.body;

  const progress = await getFigures(url)

  res.json({...progress})

})

module.exports = router