import * as fs from "fs";
import * as fb from "firebase-admin";

interface BaseEvent {
  externalId?: string;
  category: [string];
  title: string;
  event?: string;
  location: string;
  address: string;
  area?: string;
  description: string;
  wholeDay: boolean;
  url: string;
  addedBy: string;
}

interface EventFromJSON extends BaseEvent {
  startTime: string;
  endTime?: string;
  lastModified: string;
}

interface Event extends BaseEvent {
  startTime: Date;
  endTime?: Date;
  lastModified: Date;
}

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
