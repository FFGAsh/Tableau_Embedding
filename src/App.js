import "./styles.css";
import { v4 as uuidv4 } from "uuid";

var jws = require("jws");

export default function App() {
  const url =
    "https://prod-apsoutheast-a.online.tableau.com/t/firedashboard/views/FireSystemsDataAnalytics/FireSystemsAnalytics";

  const connectedAppClientId = "53e9beaa-d5b8-4094-a593-3214f2e70cfe";
  const connectedAppSecretId = "99774fa0-9eb9-4de9-9e39-c59d79a407e5";
  const connectedAppSecretKey = "0zMlulzhnJBe+qsdRTIqaCSI1ptzAk4o6ReLpzJsbtc=";
  const userName = "phil@fiftyfivegroup.com.au";
  let data = {
    iss: connectedAppClientId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    jti: uuidv4(),
    aud: "tableau",
    sub: userName,
    scp: ["tableau:views:embed", "tableau:metrics:embed"]
  };
  let header = {
    alg: "HS256",
    typ: "JWT",
    kid: connectedAppSecretId,
    iss: connectedAppClientId
  };

  const token = jws.sign({
    header: header,
    payload: data,
    secret: connectedAppSecretKey
  });
  console.log(token);
  //console.log(uuidv4()),
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <tableau-viz
        id="tableauViz"
        src="https://prod-apsoutheast-a.online.tableau.com/t/firedashboard/views/FireSystemsDataAnalytics/FireSystemsAnalytics"
        toolbar="hidden"
        iframeSizedToWindow="true"
      ></tableau-viz>
    </div>
  );
}
