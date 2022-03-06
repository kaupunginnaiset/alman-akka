interface BaseEvent {
  externalId: string;
  category: [string];
  title: string;
  city: string;
  event: string;
  location: string;
  description: string;
  wholeDay: boolean;
  url: string;
  addedBy: string;
}

interface EventFromJSON extends BaseEvent {
  startTime: string;
  endTime: string;
}

interface Event extends BaseEvent {
  startTime: Date;
  endTime: Date;
}

const printUsage = () => {
  console.log("Usage: npm run update -- <credFilePath> <eventsFilePath>");
  process.exit(1)
}

if (process.argv.length < 4) {
  printUsage()
}


const fs = require('fs')
const fb = require("firebase-admin");
const credFilePath = process.argv[2];
const events = JSON.parse(fs.readFileSync(process.argv[3], 'utf8'));


const serviceAccount = require(credFilePath);

fb.initializeApp({
  credential: fb.credential.cert(serviceAccount)
});

const db = fb.firestore();



(async function () {
  const eventsDb = db.collection("events");
  events
    .map((event: EventFromJSON) => ({
      ...event,
      startTime: new Date(event.startTime),
      endTime: event.endTime ? new Date(event.endTime) : null
    }))
    .forEach(async (event: Event) => {
      const eventDoc = eventsDb.doc();
      await eventDoc.set(event);
    });
})();
