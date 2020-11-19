const axios = require("axios");
const cheerio = require("cheerio");

function getHtml(searchKeyword, pageCnt) {
    return new Promise(function (resolve, reject) {
        searchKeyword = encodeURI(searchKeyword);

        const param = {
            url: 'https://www.mangoplate.com',
            path: "/search/" + searchKeyword + "?keyword=" + searchKeyword + "&page=" + pageCnt,
        };


        // const url = "https://www.mangoplate.com/search/" + searchKeyword + "?keyword=" + searchKeyword + "&page=" + pageCnt;
        axios.get(param, function (response) {
            console.log(response);
            if (response) {
                resolve(response)
            }
            reject(new Error("Request is failed"));
        });
    });
}

function getTestHtml(searchKeyword, pageCnt) {
    const html = "";

    getHtml(searchKeyword, pageCnt).then(function (responseData) {
        html = responseData;
    }).catch(function (err) {
        console.log(err);
    });

    if(!html) return [];

    return new Promise(function (resolve, reject) {
        const $ = cheerio.load(html.data);
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
                    restaurantInfo.push(loopJson);
                }
            });

        resolve(restaurantInfo);
    });
}

module.exports = {getTestHtml, getHtml};