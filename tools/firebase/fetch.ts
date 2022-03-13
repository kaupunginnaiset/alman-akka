import * as fs from "fs";
import * as fb from "firebase-admin";

const printUsage = () => {
  console.log("Usage: yarn tools:db:fetch -- <credFilePath>");
  process.exit(1);
};

if (process.argv.length < 3) {
  printUsage();
}

const credFilePath = process.argv[2];
const serviceAccount = require(credFilePath);

fb.initializeApp({
  credential: fb.credential.cert(serviceAccount),
});

const db = fb.firestore();
const lastFetchFilePath = "./data/last-fetch.txt";
const lastFetchTime = new Date(fs.readFileSync(lastFetchFilePath, "utf8"));

(async function () {
  // Fetch events from firestore
  const events = await db
    .collection("events")
    .where("startTime", ">", lastFetchTime)
    .orderBy("startTime", "asc")
    .get();

  console.log(
    "Event count: ",
    events.size,
    "since last fetch time:",
    lastFetchTime
  );
  const eventsToJSON = events.docs.reduce((result: any, doc) => {
    const event = doc.data();
    event.startTime = event.startTime.toDate();
    event.endTime = event.endTime ? event.endTime.toDate() : null;

    const year = event.startTime.getFullYear();
    const monthNbr = event.startTime.getMonth() + 1;
    const month = monthNbr < 10 ? `0${monthNbr}` : monthNbr;
    const prevYearData = result[year] || {};
    const prevMonthData = prevYearData[month] || {};
    return {
      ...result,
      [year]: {
        ...prevYearData,
        [month]: [...prevMonthData, event],
      },
    };
  }, {});

  // Store events to json
  Object.keys(eventsToJSON).map((year) => {
    Object.keys(eventsToJSON[year]).map((month) => {
      const events = eventsToJSON[year][month];
      const eventsJSON = JSON.stringify(events, null, 2);
      fs.mkdirSync(`./data/${year}`, { recursive: true });
      fs.writeFileSync(`./data/${year}/${month}.json`, eventsJSON);
    });
  });

  // Save current timestamp to file
  const now = new Date();
  fs.writeFileSync(lastFetchFilePath, now.toString());
})();
