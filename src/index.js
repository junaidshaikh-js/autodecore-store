import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { makeServer } from "./server";
import { StateProvider } from "./context/";

import App from "./App";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <StateProvider>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
