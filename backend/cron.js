const cron = require("node-cron");
const { scrapeAndStore } = require("./scraper");

// Run every day at 2am
cron.schedule("0 2 * * *", () => {
  console.log("Running daily movie scrape...");
  scrapeAndStore();
});
