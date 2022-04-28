import * as fs from "fs";
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
  const folderName = `./data/${process.env.NODE_ENV || "development"}`;
  const lastFetchFilePath = `${folderName}/last-fetch.txt`;

  const lastFetchTime = new Date(fs.existsSync(lastFetchFilePath) ? fs.readFileSync(lastFetchFilePath, "utf8") : 0);
  if (new Date().getTime() - lastFetchTime.getTime() < 1000 * 60 * 5) {
    // Skip too frequent fetching. Next nightly will pick up the change at latest.
    console.log("Last fetch was less than 5 minutes ago. Update will be done with next trigger.");
    process.exit(0);
  }

  await fetchEventsToFile(lastFetchFilePath, folderName);
})();
