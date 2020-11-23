const {getRestaurantList} = require("./src/crawl.js");
const cheerio = require('cheerio');
const fs = require('fs');
const cron = require("node-cron");

const mysql = require("mysql");
const dbConnection = require('../../database/config/connectionConfig');
const query = require('../../database/query/crawlingQuery');
const connection = mysql.createConnection(dbConnection);

batchCrawling = callback => {
    connection.query(query.getSigungu, (err, rows) => {
        if (err) {
            console.log("Error : " + err);
        } else {
            let returnArr = [];
            for (let i in rows) {
                returnArr.push(rows[i]['location'] + " " + rows[i]['locationDetail']);
            }

            callback(returnArr);
        }
    });
}

batchCrawling((searchKeyword) => {
    getRestaurantList(searchKeyword).then(resolve => {
        let restaurantInfo = [];

        const result = Promise.all(resolve.map((html) => {
                const $ = cheerio.load(html);

                if ($(".list-restaurant").length < 1) return;

                $(".search-list-restaurants-inner-wrap")
                    .find($(".list-restaurant-item"))
                    .each(function (index, elem) {
                        const idx = 1 + "-" + (index + 1);
                        const aText = $(this).find("a").text().trim().replace(/(?:\t|\n|\s|\r|\r\n)/gi, "");
                        const pText = $(this).find("p").text().replace(/(?:\t|\n|[0-9]|,)/gi, "").trim();
                        const pArray = pText.split("-");
                        if (aText && pText) {
                            let loopJson = {};
                            loopJson["index"] = idx;
                            loopJson["nm"] = aText;
                            // loopJson["info"] = pText;
                            loopJson["locale"] = pArray[0].trim();
                            loopJson["category"] = pArray[1].trim();
                            restaurantInfo.push(loopJson);
                        }
                    })
            })
        );
        writeJsonFile(restaurantInfo);
    });

});

writeJsonFile = (restaurantList) => {
    const obj = {
        restaurantList : restaurantList
    };

    let json = JSON.stringify(obj);
    fs.writeFile('crawlData.json', json, 'utf8', res => {
        console.log("변환완료!");
    });
};


// cron.schedule("*/1 * * * *", async () => {
//     console.log("running a task every one minutes");
// });
