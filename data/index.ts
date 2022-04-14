const folder = process.env.NODE_ENV || "development";
const data = require(`./${folder}/index.js`);

export default data.default;

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
  id?: string;
}

export interface EventFromJSON extends BaseEvent {
  startTime: string;
  endTime?: string;
  lastModified: string;
}
