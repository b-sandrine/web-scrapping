
const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://www.scrapethissite.com/pages/simple/"

// function which will scrape the data from the website
async function scrapeData(url) {
    const data = [];

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        $('div.country').each((index, parentDiv) => {
            const countryName = $(parentDiv).find('h3').text().trim();

            $(parentDiv).find('div.country-info').each((index, childDiv) => {
                const capital = $(childDiv).find('span.country-capital').text().trim();
                const population = $(childDiv).find('span.country-population').text().trim();
                const area = $(childDiv).find('span.country-area').text().trim();
                
                if(capital && population && area) {
                    data.push({
                        countryName,
                        capital,
                        population,
                        area
                    });
                }
            })
        });
    }
    catch (error) {
        console.error("Error scraping data:", error);
    }

    console.log(data);
}

scrapeData(url);

