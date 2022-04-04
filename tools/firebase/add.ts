import * as fb from "firebase-admin";
import { addEventsFromFile } from "./db";

const printUsage = () => {
  console.log("Usage: yarn tools:db:add -- <credFilePath> <eventsFilePath>");
  process.exit(1);
};

if (process.argv.length < 4) {
  printUsage();
}

const credFilePath = process.argv[2];
const serviceAccount = require(credFilePath);

fb.initializeApp({
  credential: fb.credential.cert(serviceAccount)
});

(async function () {
  const count = await addEventsFromFile(process.argv[3]);
  console.log(`Added ${count} events`);
})();
