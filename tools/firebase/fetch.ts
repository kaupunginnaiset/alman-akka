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
const lastFetchTime = new Date(
  fs.existsSync(lastFetchFilePath)
    ? fs.readFileSync(lastFetchFilePath, "utf8")
    : 0
);

(async function () {
  // Fetch changed events from firestore
  const events = await db
    .collection("events")
    .where("lastModified", ">", lastFetchTime)
    .orderBy("lastModified", "asc")
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
    event.id = doc.id;
    event.startTime = event.startTime.toDate();
    event.endTime = event.endTime ? event.endTime.toDate() : null;
    event.lastModified = event.lastModified.toDate();

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
  const files = Object.keys(eventsToJSON).map((year) => {
    fs.mkdirSync(`./data/${year}`, { recursive: true });
    const months = Object.keys(eventsToJSON[year]).map((month) => {
      const events = eventsToJSON[year][month];
      const targetPath = `./data/${year}/${month}.json`;
      const prevEvents = fs.existsSync(targetPath)
        ? JSON.parse(fs.readFileSync(targetPath, "utf8"))
        : [];
      fs.writeFileSync(
        `./data/${year}/${month}.json`,
        JSON.stringify([...prevEvents, ...events])
      );
      return targetPath;
    });
    return { year, months };
  });

  console.log("Saved files: ", files);

  // Save current timestamp to file
  const now = new Date();
  fs.writeFileSync(lastFetchFilePath, now.toString());

  // Create index file for easy include
  const dataFolder = "./data";
  const indexFilePath = `${dataFolder}/index.js`;
  if (fs.existsSync(indexFilePath)) {
    fs.rmSync(indexFilePath);
  }
  const dataFiles = fs.readdirSync(dataFolder);
  const imports = dataFiles
    .filter((item) => fs.statSync(`${dataFolder}/${item}`).isDirectory())
    .reduce(
      (result, item, index) => {
        const monthFiles = fs.readdirSync(`./data/${item}`);
        return {
          res:
            result.res +
            monthFiles.reduce((mResult, mItem, mIndex) => {
              return (
                mResult +
                `import events${
                  (index + 1) * mIndex
                } from "./${item}/${mItem}";\n`
              );
            }, ""),
          count: result.count + monthFiles.length,
        };
      },
      { res: "", count: 0 }
    );
  const arrayContent = Array.from(Array(imports.count).keys()).map(
    (index) => `...events${index}`
  );
  const content = `${imports.res}\nconst data = [\n${arrayContent.join(
    ",\n"
  )}\n];\nexport default data;\n`;
  fs.writeFileSync(indexFilePath, content);
})();
