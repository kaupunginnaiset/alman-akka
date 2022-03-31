import * as fb from "firebase-admin";
import { fetchEventsToFile } from "./db";

const printUsage = () => {
  console.log("Usage: yarn tools:db:fetch -- <credFilePath>");
  process.exit(1);
};

if (process.argv.length < 3) {
  printUsage();
}

(async function () {
  const credFilePath = process.argv[2];
  const serviceAccount = require(credFilePath);

  fb.initializeApp({
    credential: fb.credential.cert(serviceAccount)
  });
  const lastFetchFilePath = "./data/last-fetch.txt";
  await fetchEventsToFile(lastFetchFilePath, "./data");
})();
