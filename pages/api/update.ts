import type { NextApiRequest, NextApiResponse } from "next";
import * as admin from "firebase-admin";
import { fetchEventsToFile } from "../../tools/firebase/db";

// NOTE: this is for local development purposes only!
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

  if (admin.apps.length === 0) {
    admin.initializeApp({
      projectId: "demo-test",
      credential: admin.credential.applicationDefault()
    });
  }

  const folderName = `./data/development`;
  const lastFetchFilePath = `${folderName}/last-fetch.txt`;
  await fetchEventsToFile(lastFetchFilePath, folderName);

  res.status(200).json({ status: "ok" });
}
