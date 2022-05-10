import * as fs from "fs";
import * as fb from "firebase-admin";

import { EventFromJSON } from "../../data";

export const addEventsFromFile = async (filePath: string): Promise<number> => {
  const events = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const db = fb.firestore();
  const eventsDb = db.collection("events");

  // TODO: use batch write
  const res = await Promise.all(
    events.map((event: EventFromJSON) => {
      const eventWithTs = {
        ...event,
        startTime: new Date(event.startTime),
        endTime: event.endTime ? new Date(event.endTime) : null,
        lastModified: new Date(event.lastModified)
      };
      const eventDoc = eventsDb.doc();
      return eventDoc.set(eventWithTs);
    })
  );
  return res.length;
};

export const fetchEventsToFile = async (lastFetchFilePath: string, dataFolderPath: string) => {
  const db = fb.firestore();

  const lastFetchTime = new Date(fs.existsSync(lastFetchFilePath) ? fs.readFileSync(lastFetchFilePath, "utf8") : 0);

  // Fetch changed events from firestore
  const events = await db
    .collection("events")
    .where("lastModified", ">", lastFetchTime)
    .orderBy("lastModified", "asc")
    .orderBy("startTime", "asc")
    .get();

  console.log("Event count: ", events.size, "since last fetch time:", lastFetchTime);
  const eventsToJSON = events.docs.reduce((result: any, doc) => {
    const event = doc.data();
    event.id = doc.id;

    // convert timestamps to dates
    event.startTime = event.startTime.toDate();
    event.endTime = event.endTime ? event.endTime.toDate() : null;
    event.lastModified = event.lastModified.toDate();

    const year = event.startTime.getFullYear();
    const monthNbr = event.startTime.getMonth() + 1;
    const month = monthNbr < 10 ? `0${monthNbr}` : monthNbr;
    const prevYearData = result[year] || {};
    const prevMonthData = prevYearData[month] || [];
    return {
      ...result,
      [year]: {
        ...prevYearData,
        [month]: [...prevMonthData, event]
      }
    };
  }, {});

  // Store events to json
  const files = Object.keys(eventsToJSON).map(year => {
    fs.mkdirSync(`${dataFolderPath}/${year}`, { recursive: true });
    const months = Object.keys(eventsToJSON[year]).map(month => {
      const events = eventsToJSON[year][month];
      const targetPath = `${dataFolderPath}/${year}/${month}.json`;
      const prevEvents = fs.existsSync(targetPath) ? JSON.parse(fs.readFileSync(targetPath, "utf8")) : [];
      fs.writeFileSync(`${dataFolderPath}/${year}/${month}.json`, JSON.stringify([...prevEvents, ...events]));
      return targetPath;
    });
    return { year, months };
  });

  console.log("Saved files: ", files);

  // Save current timestamp to file
  const now = new Date();
  fs.writeFileSync(lastFetchFilePath, now.toString());

  // Create index file for easy include
  const indexFilePath = `${dataFolderPath}/index.js`;
  if (fs.existsSync(indexFilePath)) {
    fs.rmSync(indexFilePath);
  }
  const dataFiles = fs.readdirSync(dataFolderPath);
  const imports = dataFiles
    .filter(item => fs.statSync(`${dataFolderPath}/${item}`).isDirectory())
    .reduce(
      (result, item, index) => {
        const monthFiles = fs.readdirSync(`${dataFolderPath}/${item}`);
        return {
          res:
            result.res +
            monthFiles.reduce((mResult, mItem, mIndex) => {
              return mResult + `import events${result.count + mIndex} from "./${item}/${mItem}";\n`;
            }, ""),
          count: result.count + monthFiles.length
        };
      },
      { res: "", count: 0 }
    );
  const arrayContent = Array.from(Array(imports.count).keys()).map(index => `...events${index}`);
  const content = `${imports.res}\nconst data = [\n${arrayContent.join(",\n")}\n];\nexport default data;\n`;

  // write result file
  fs.writeFileSync(indexFilePath, content);
};
