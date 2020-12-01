const {getMangoplateHtml, getKakaoMapJson} = require("../util/axiosModule.js");
const cheerio = require('cheerio');
const fs = require('fs');
const cron = require("node-cron");

const mysql = require("mysql");
const dbConnection = require('../database/config/connectionConfig');
const query = require('../database/query/crawlingQuery');
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
    console.log("검색 지역 : " + searchKeyword);
    let localeArray = String(searchKeyword).split(" ");
    let locale = localeArray[0];
    getMangoplateHtml(searchKeyword).then(resolve => {
        let restaurantInfo = [];
        const result = Promise.all(resolve.map((html) => {
                try {
                    const $ = cheerio.load(html);

                    if ($(".list-restaurant").length < 1) return;

                    $(".search-list-restaurants-inner-wrap")
                        .find($(".list-restaurant-item"))
                        .each(function (index, elem) {
                            const aText = $(this).find("a").text().trim().replace(/(?:\t|\n|\s|\r|\r\n)/gi, "");
                            const pText = $(this).find("p").text().replace(/(?:\t|\n|[0-9]|,)/gi, "").trim();
                            const pArray = pText.split("-");
                            const pArraySplit = pArray[0].split(" ");
                            if (aText && pText) {
                                let loopJson = [];
                                loopJson.push(pArraySplit[1].trim() == "" ? locale : pArraySplit[0].trim());
                                loopJson.push(pArraySplit[1].trim() == "" ? pArraySplit[0].trim() : pArraySplit[1].trim());
                                loopJson.push(aText);
                                loopJson.push(pArray[1].trim());
                                loopJson.push("Y");
                                loopJson.push("망고플레이트");
                                restaurantInfo.push(loopJson);
                            }
                        })
                } catch (error) {
                    console.log(error);
                }
            })
        );
        writeJsonFile(restaurantInfo);
    });
});

writeJsonFile = (restaurantList) => {
    const obj = {
        restaurantList: restaurantList
    };
    let json = JSON.stringify(obj);
    fs.writeFile('isResult.json', json, 'utf8', res => {
        connection.query(query.setCrawlingRestaurantList, [restaurantList], (err, row) => {
            if (err) {
                console.log(err);
            }
            console.log("변환완료!");
        });
    });
};


// cron.schedule("*/1 * * * *", async () => {
//     console.log("running a task every one minutes");
// });
