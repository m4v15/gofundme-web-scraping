require('dotenv/config')

const request = require("supertest");
const fs = require("fs");
const server = require("../src/server");

const api_key = process.env.API_KEY

const fakeSpreadSheetData = [
    {
      url: 'https://www.gofundme.com/f/help-tasneem-hazem-families-to-escape-from-death?utm_campaign=p_cp+share-sheet&utm_medium=copy_link_all&utm_source=customer&utm_term=CP_SSS_control',
      progress: 2000,
      target: 10000,
      title: 'Donate to Help Families of Tasneem & Hazem Escape from Death, organised by Omar Musallam',
      imageurl: 'https://d2g8igdw686xgo.cloudfront.net/78145441_170998071241804_r.jpeg'
    },
    {
      url: 'https://www.gofundme.com/f/war-torn-dreams-help-gaza-engineer-family-rebuild',
      progress: 1982,
      target: 10000,
      title: 'Donate to War Torn Dreams: Help Gaza Engineer Family Rebuild, organized by Katherine Young',
      imageurl: 'https://d2g8igdw686xgo.cloudfront.net/78990895_1710862876796365_r.jpeg'
    },
    {
      url: 'https://www.gofundme.com/f/urgent-reliefevacuating-my-family-from-gazas-conflict-zone',
      progress: 2778,
      target: 10000,
      title: "Donate to Urgent Relief:Evacuating My Family from Gaza's Conflict Zone, organized by Mohammed Ahmed",
      imageurl: 'https://d2g8igdw686xgo.cloudfront.net/79353891_17130328322684_r.jpeg'
    },
    {
      url: 'https://www.gofundme.com/f/our-lives-were-full-of-happiness-but?utm_campaign=p_cp+fundraiser-sidebar&utm_medium=copy_link_all&utm_source=customer',
      progress: 3197,
      target: 10000,
      title: 'Donate to HELP Palestinian separated couple rebuild !, organized by Ritechal Joussef',
      imageurl: 'https://d2g8igdw686xgo.cloudfront.net/78518277_1712883660753044_r.png'
    }
  ]

// Scraper test suite
describe("scraper", () => {
    // Test the /scrape route (type of test: integration)
    test("POST /scrape returns a 200 status code", async () => {
        // Create a mock request body
        testScrapeUrl =
            "https://www.gofundme.com/f/help-hossam-abo-shab-to-evacuate-from-gaza?attribution_id=sl:dee3bec0-df6c-4d54-a165-13b9d8361a50&utm_campaign=p_cp+fundraiser-sidebar&utm_medium=chat&utm_source=whatsApp";

        const body = {
            url: testScrapeUrl,
        };
        // Make a POST request to the /scrape route
        const response = await request(server).post("/scrape").set({ 'x-api-key': process.env.API_KEY }).send(body);
        // Assert that the response status code is 200
        expect(response.statusCode).toBe(200);
        // Assert that the response body has a products property
        expect(response.body).toHaveProperty("progressString");
        expect(response.body).toHaveProperty("currency");
        expect(response.body).toHaveProperty("targetString");
    })
    test("POST /scrape returns with progressString prop", async () => {
        // Create a mock request body
        testScrapeUrl =
            "https://www.gofundme.com/f/help-hossam-abo-shab-to-evacuate-from-gaza?attribution_id=sl:dee3bec0-df6c-4d54-a165-13b9d8361a50&utm_campaign=p_cp+fundraiser-sidebar&utm_medium=chat&utm_source=whatsApp";

        const body = {
            url: testScrapeUrl,
        };
        // Make a POST request to the /scrape route
        const response = await request(server).post("/scrape").set({ 'x-api-key': process.env.API_KEY }).send(body);
        console.log(response.body)

        expect(response.body).toHaveProperty("progressString");
;
    })
    test("POST /scrape returns with currency prop", async () => {
        // Create a mock request body
        testScrapeUrl =
            "https://www.gofundme.com/f/help-hossam-abo-shab-to-evacuate-from-gaza?attribution_id=sl:dee3bec0-df6c-4d54-a165-13b9d8361a50&utm_campaign=p_cp+fundraiser-sidebar&utm_medium=chat&utm_source=whatsApp";

        const body = {
            url: testScrapeUrl,
        };
        // Make a POST request to the /scrape route
        const response = await request(server).post("/scrape").set({ 'x-api-key': process.env.API_KEY }).send(body);
        // Assert that the response body has a products property
        expect(response.body).toHaveProperty("currency");
    })
    test("POST /scrape returns with targetString prop", async () => {
        // Create a mock request body
        testScrapeUrl =
            "https://www.gofundme.com/f/help-hossam-abo-shab-to-evacuate-from-gaza?attribution_id=sl:dee3bec0-df6c-4d54-a165-13b9d8361a50&utm_campaign=p_cp+fundraiser-sidebar&utm_medium=chat&utm_source=whatsApp";

        const body = {
            url: testScrapeUrl,
        };
        // Make a POST request to the /scrape route
        const response = await request(server).post("/scrape").set({ 'x-api-key': process.env.API_KEY }).send(body);
        // Assert that the response status code is 200
        expect(response.body).toHaveProperty("targetString");
    });
    // describe("db", () => {
    //     test("POST DB route returns a 200 status code", async () => {
    //         // Create a mock request body
         
    //         const body = {
    //             "spreadsheetData": JSON.stringify(fakeSpreadSheetData),
    //         };


    //         // Make a POST request to the /scrape route
    //         const response = await request(server).post(`/${process.env.DBAPIURL}`).set({ 'x-api-key': process.env.API_KEY }).send(body);
    //         // Assert that the response status code is 200
    //         expect(response.statusCode).toBe(200);
    //         // Assert that the response body has a products property
    //     })
    // })
});
// close the server and delete the test data directory after all tests have run
afterAll(() => {
    server.close();
});