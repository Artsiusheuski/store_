import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import client from "../src/components/data/";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </ApolloProvider>
);

reportWebVitals();
