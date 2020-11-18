const { getTestHtml } = require("./src/crawl.js");
const cron = require("node-cron");

async function handleAsync() {
    const test = await getTestHtml();
    console.log("test", test);
}

handleAsync();

// cron.schedule("*/1 * * * *", async () => {
//     console.log("running a task every two minutes");
//     await handleAsync();
// });