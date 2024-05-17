
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL OF THE PAGE WE WANT TO SCRAPE
const url = "https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3";

// ASYNC FUNCTION TO SCRAPE THE DATA
async function scrapeData() {
    try {
        // FETCH THE HTML OF PAGE WE WANT TO SCRAPE
        const { data } = await axios.get(url);

        // LOAD HTML WE FETCHED IN PREVIOUS LINE
        const $ = cheerio.load(data);

        // SELECT ALL LIST ITEMS IN PLAINLIST CLASS
        const listItems = $(".plainlist ul li");

        // STORES DATA OF ALL COUNTRIES
        const countries = []

        listItems.each((idx, el) => {
            // OBJECT HOLDING DATA FOR EACH COUNTRY
            const country = { name: "", iso: "" };

            country.name = $(el).children("a").text();
            country.iso = $(el).children("span").text();
            // STORE COUNTRY DATA IN COUNTRIES ARRAY
            countries.push(country)
        });

        // SAVE THE COUNTRIES ARRAY IN JSON FILE
        fs.writeFile("coutries.json", JSON.stringify(countries, null, 2), (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Successfully written data to file");
        });
    } catch (err) {
        console.error(err);
    }
}


// CALLING FUNCTION
scrapeData();