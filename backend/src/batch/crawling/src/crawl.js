const axios = require("axios");
const cheerio = require("cheerio");

let html = "";
let searchKeyword = encodeURI("각산동");

async function getHtml() {
    try {
        return await axios.get("https://www.mangoplate.com/search/" + searchKeyword + "?keyword=" + searchKeyword + "&page=1");
    } catch (error) {
        console.error(error);
    }
}

async function getTestHtml() {
    if (!html) {
        html = await getHtml();
    }

    const $ = cheerio.load(html.data);
    let smp = {};
    $(".search-list-restaurants-inner-wrap li")
        .find("div")
        .each(function (index, elem) {
            console.log(
                $(this)
                    // .find("div")
                    .html()
                    // .find("div")
                    // .text()
                    // .trim()
                    // .replace(/(?:\t|\n|\s|\r|\r\n)/gi, "")
            );

            // switch (
            //     $(this)
            //         .find("div")
            //         .text()
            //         .trim()
            //     ) {
            //     case "거래일":
            //         smp[`date`] = $(this)
            //             .find("td")
            //             .text()
            //             .replace(/([\t|\n|\s])/gi, "");
            //         break;
            //     case "최대":
            //         smp[`max`] = $(this)
            //             .find("td")
            //             .text()
            //             .replace(/([\t|\n|\s])/gi, "");
            //         break;
            //     case "최소":
            //         smp[`min`] = $(this)
            //             .find("td")
            //             .text()
            //             .replace(/([\r|\n|\s])/gi, "");
            //         break;
            //     case "평균":
            //         smp[`avg`] = $(this)
            //             .find("td")
            //             .text()
            //             .replace(/([\r|\n|\s])/gi, "");
            //         break;
            // }
        });

    return smp;
}

module.exports = {getTestHtml};