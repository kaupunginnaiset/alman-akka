import * as functions from "firebase-functions";
import * as https from "https";
import * as http from "http";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const eventModified = functions.firestore.document("events/{docId}").onWrite((change, context) => {
  const props =
    process.env.FUNCTIONS_EMULATOR == "true"
      ? { requestor: http, hostname: "localhost", path: "/api/update", port: 3000 }
      : { requestor: https, port: 443 };

  const options = {
    hostname: props.hostname,
    port: props.port,
    path: props.path,
    method: "GET"
  };

  const req = props.requestor.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", d => {
      process.stdout.write(d);
    });
  });

  req.on("error", error => {
    console.error(error);
  });

  req.end();

  return "ok";
});
