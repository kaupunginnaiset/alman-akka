import * as functions from "firebase-functions";
import * as https from "https";
import * as http from "http";

// On development setup, localhost, we trigger the fetch functionality through Next API
// On production setup, firebase, we send a dispatch event to GitHub Action
export const eventModified = functions.firestore.document("events/{docId}").onWrite((change, context) => {
  const props =
    process.env.FUNCTIONS_EMULATOR == "true"
      ? { requestor: http, hostname: "localhost", path: "/api/update", port: 3000, headers: {}, method: "GET" }
      : {
          requestor: https,
          hostname: "api.github.com",
          path: "/repos/kaupunginnaiset/alman-akka/dispatches",
          port: 443,
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `Bearer ${process.env.GITHUB_PAT}`,
            "Content-Type": "application/json",
            "user-agent": "node.js"
          },
          method: "POST",
          data: { "event_type": "fetch" }
        };

  const options = {
    hostname: props.hostname,
    port: props.port,
    path: props.path,
    method: props.method,
    headers: props.headers
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

  if (props.data) {
    req.write(JSON.stringify(props.data));
  }
  req.end();

  return "ok";
});
