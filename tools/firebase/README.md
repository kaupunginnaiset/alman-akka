# Firebase Database

Alman-akka stores its data to a Firebase (FB) Cloud Firestore database.

This folder contains a sample script for adding data to database using a FB admin service account. You can download the needed credential file from [the FB console](https://console.firebase.google.com/).

The entries in the database (whether it is added by scripts or via the app itself) should follow the schema described in this page.

## Event schema

| field          | description                                              | mandatory | data type   |
| -------------- | -------------------------------------------------------- | --------- | ----------- |
| `externalId`   | _id in external service context_                         | false     | `string`    |
| `category`     | _array for event categories_                             | true      | `string`    |
| `title`        | _event name_                                             | true      | `string`    |
| `event`        | _parent event (if has one)_                              | false     | `string`    |
| `location`     | _city in which event takes place or 'virtual' if online_ | true      | `string`    |
| `address`      | _address for the event location_                         | true      | `string`    |
| `area`         | _province or larger local area, such as "Uusimaa"_       | false     | `string`    |
| `description`  | _event description_                                      | true      | `string`    |
| `startTime`    | _event start time_                                       | true      | `timestamp` |
| `endTime`      | _event end time_                                         | false     | `timestamp` |
| `wholeDay`     | _true if event lasts whole day_                          | false     | `boolean`   |
| `url`          | _event homepage_                                         | true      | `string`    |
| `addedBy`      | _id of the user who added the event_                     | true      | `string`    |
| `lastModified` | _time of the last modification_                          | true      | `timestamp` |

## Example event entry

```json
{
  "externalId": "171",
  "category": ["Bileet"],
  "title": "Pride-jatkot: Mr.A & Janne X",
  "location": "Helsinki",
  "event": "Helsinki Pride 2021",
  "address": "Kasarmitorin kes??terassi, Kasarmitori, 00130 Helsinki",
  "description": "Tervetuloa nautiskelemaan sateenkaarevasta kes??illasta yhdess?? upeiden artistien kanssa!. MILK on ???the only gaydisco in the village???. \n\nMILKin soundi on poppersin tuoksuista housea, hi-energy??, h??pe??m??tt??mi?? diivavokaaleja, lehm??nkelloja, taputuksia, sek?? yleist?? discoeuforiaa.\n\nMusiikista vastaavat DJ:t Mr.A ja Janne X. \n\nMr.A on toiminut DJ:n??, promoottorina ja my??hemmin tuottajana ja radiotoimittajana jo kolmella vuosikymmenell??. Mittavasta CV:st?? l??ytyy klubiklassikoita (Doom, PUMP, Rebels), karhuristeilyj??, Yoko Ono -remixej??, ja reippaasti yli 1000 dj-keikkaa. \n\nJanne X tunnetaan parhaiten uraauurtavasta FAG YOU! -konseptista sek?? Guggenheim-taidebileist??. Yli 15 vuotta levyj?? soittanut DJ my??s kirjoittaa musiikista. Journalistina Jannen erityisaluetta ovat mm. underground- ja queer-kulttuuri.\n",
  "startTime": "2021-06-30T16:00:00.000Z",
  "endTime": "2021-06-30T19:00:00.000Z",
  "wholeDay": false,
  "url": "https://week.pride.fi",
  "addedBy": "SYSTEM",
  "lastModified": "2021-06-30T16:00:00.000Z",
}
```

## Add script

Script adds events to the database collection called `events` from a json file. Firestore generates each entry an unique identifier.
Running the script (in project root):

```bash
yarn install
yarn tools:db:add -- creds.json events.json
```

First parameter `creds.json` is the necessary admin credential file downloaded from FB console. 
The file path should be relative to the folder `./tools/firebase`. `events.json` contains a list of the events to be added.
