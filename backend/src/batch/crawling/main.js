const {getTestHtml} = require("./src/crawl.js");
const cron = require("node-cron");

const mysql = require("mysql");
const dbConnection = require('../../database/config/connectionConfig');
const query = require('../../database/query/crawlingQuery');
const connection = mysql.createConnection(dbConnection);

function getLoopParameter() {
    let returnArr = [];

    return new Promise(function (resolve, reject) {
        connection.query(query.getSigungu, (err, rows) => {
            for (let i in rows) {
                returnArr.push(rows[i]['location'] + " " + rows[i]['locationDetail']);
            }

            resolve(returnArr);
        });
    });
}

async function handleAsync(searchKeyword) {
    const returnArr = [];

    for (let i = 1; i < 11; i++) {
        const temp = await getTestHtml(searchKeyword, i);
        if (temp.length < 1) break;
        returnArr.push(...temp);
    }

    return returnArr;
}

function batchCrawling() {
    getLoopParameter().then(function (resolveData) {
        let code = resolveData;

        for (let value of code) {
            handleAsync(value).catch(function (err) {
                console.log(err);
            });
        }
    });
}

batchCrawling();


// cron.schedule("*/1 * * * *", async () => {
//     console.log("running a task every one minutes");
// });
