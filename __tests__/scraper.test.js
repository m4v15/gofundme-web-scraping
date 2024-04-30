const request = require("supertest");
const fs = require("fs");
const server = require("../src/server");

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
        const response = await request(server).post("/scrape").send(body);
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
        const response = await request(server).post("/scrape").send(body);
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
        const response = await request(server).post("/scrape").send(body);
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
        const response = await request(server).post("/scrape").send(body);
        // Assert that the response status code is 200
        expect(response.body).toHaveProperty("targetString");
    });
});
// close the server and delete the test data directory after all tests have run
afterAll(() => {
    server.close();
});