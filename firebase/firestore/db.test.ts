import fs from "fs";
import * as admin from "firebase-admin";
import { addEventsFromFile, fetchEventsToFile } from "./db";
import { EventFromJSON } from "../../data";

describe("db", () => {
  const eventsFile = "2021/06.json";
  const testFile = `./data/development/${eventsFile}`;
  const tsFilePath = ".build/test-last-fetch.txt";
  const dataFolderPath = ".build/test-data";

  beforeAll(() => {
    admin.initializeApp({ projectId: "demo-test" });
    fs.rmSync(tsFilePath, { force: true });
    fs.rmSync(dataFolderPath, { recursive: true, force: true });
  });
  it("adds events", async () => {
    const count = await addEventsFromFile(testFile);
    expect(count).toEqual(116);
  });
  it("does not add events with invalid file", async () => {
    try {
      await addEventsFromFile("./data/development/2021/05.json");
    } catch (e: any) {
      expect(e.code).toEqual("ENOENT");
    }
  });
  it("fetches events", async () => {
    await fetchEventsToFile(tsFilePath, dataFolderPath);
    expect(fs.existsSync(tsFilePath)).toEqual(true);
    expect(fs.existsSync(dataFolderPath)).toEqual(true);
    expect(fs.existsSync(`${dataFolderPath}/${eventsFile}`)).toEqual(true);

    const actualItems = JSON.parse(fs.readFileSync(`${dataFolderPath}/${eventsFile}`, "utf8"));
    const expectedItems = JSON.parse(fs.readFileSync(testFile, "utf8"));
    expect(actualItems.length).toEqual(expectedItems.length);

    const expectedItem = expectedItems.find((item: EventFromJSON) => item.externalId === actualItems[0].externalId);
    const { id: expectedId, ...expected } = expectedItem;
    const { id: actualId, ...actual } = actualItems[0];
    expect(actual).toEqual(expected);
    expect(actualId).not.toEqual(expectedId);
  });
  it("fetches only changed events", async () => {
    const tsBefore = fs.readFileSync(tsFilePath, "utf8");
    const fileContentBefore = fs.readFileSync(`${dataFolderPath}/${eventsFile}`, "utf8");
    await new Promise(r => setTimeout(r, 1000));

    await fetchEventsToFile(tsFilePath, dataFolderPath);

    const tsAfter = fs.readFileSync(tsFilePath, "utf8");
    const fileContentAfter = fs.readFileSync(`${dataFolderPath}/${eventsFile}`, "utf8");

    expect(tsBefore.length).toBeGreaterThan(0);
    expect(tsAfter.length).toBeGreaterThan(0);
    expect(tsBefore).not.toEqual(tsAfter);

    // No changes
    expect(fileContentBefore).toEqual(fileContentAfter);
  });
});
