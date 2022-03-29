import * as admin from "firebase-admin";
import { addEventsFromFile } from "./db";

describe("db", () => {
  beforeAll(() => {
    admin.initializeApp({ projectId: "demo-test" });
  }),
    it("adds events", async () => {
      const count = await addEventsFromFile("./data/2021/06.json");
      expect(count).toEqual(116);
    });
  it("does not add events with invalid file", async () => {
    try {
      await addEventsFromFile("./data/2021/05.json");
    } catch (e: any) {
      expect(e.code).toEqual("ENOENT");
    }
  });
});
