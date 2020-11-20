const axios = require("axios");
const cheerio = require("cheerio");

function getTestHtml(searchKeyword, pageCnt) {
    return new Promise(function (resolve, reject) {
        searchKeyword = encodeURI(searchKeyword);
        const url = "https://www.mangoplate.com/search/" + searchKeyword + "?keyword=" + searchKeyword + "&page=" + pageCnt;
        axios.get(url).then((response) => {
            const $ = cheerio.load(response.data);
            let restaurantInfo = [];
            $(".search-list-restaurants-inner-wrap")
                .find($(".list-restaurant-item"))
                .each(function (index, elem) {
                    const idx = pageCnt + "-" + (index + 1);
                    const aText = $(this).find("a").text().trim().replace(/(?:\t|\n|\s|\r|\r\n)/gi, "");
                    const pText = $(this).find("p").text().replace(/(?:\t|\n|[0-9]|,)/gi, "").trim();
                    const pArray = pText.split("-");
                    const pCategory = pArray[1].trim()
                    if (aText && pText) {
                        let loopJson = {};
                        loopJson["index"] = idx;
                        loopJson["nm"] = aText;
                        // loopJson["info"] = pText;
                        loopJson["locale"] = pArray[0].trim();
                        loopJson["category"] = pArray[1].trim();
                        console.log(loopJson);
                        restaurantInfo.push(loopJson);
                    }
                });

            resolve(restaurantInfo);

        }).catch((error) => {
            // console.log(error);
        });
    });
}

module.exports = {getTestHtml};