# Webscraping GoFundMe with Nodejs and Cheerio

An application to accept post requests with a `url` prop in the body and scrape the progress, currency & target of a gofundme fundraiser

Forked & adapted from https://github.com/mwaz/cheerio-web-scraping.git 

# How to use the api

1. Send a `POST` request to `/scrape` with a body shape `{ url: //some gofundme fundraiser }`
2. Receive response in the form:
```
{
    "progressString": "30455",
    "targetString": "200000",
    "currency": "kr",
    "message": "Details scraped successfully",
    "filename": "2024-4-30-12-55-27.json"
}
```

### Notes:

This has not been tested thoroughly yet, needs more testing for currency and null responses.

# Dev Instructions

## 1. Clone repo

```bash
git clone https://github.com/m4v15/gofundme-web-scraping
```
## 2. Cd into cloned repository 
```bash
cd gofundme-web-scraping
```

## 3. Installl dependencies 
```bash
npm install
```
## 4. Start dev server

```bash
npm run dev
```

## 5. Run tests

```bash
npm run test
```

## About

This repo is built following a tutorial published on CircleCI blog under the CircleCI Guest Writer Program.

-   Blog post: [ Webscrapping with Nodejs and Cheerio ][blog]
-   Author's GitHub profile: [Waweru Mwaura][author]

### About CircleCI Guest Writer Program

[blog]: https://circleci.com/blog/webscrapping-with-nodejs-and-cheerio
[author]: https://github.com/mwaz
