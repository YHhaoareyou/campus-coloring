import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Scene from "./Scene";

ReactDOM.render(<Scene />, document.getElementById("arjs"));

setTimeout(ReactDOM.render(<App />, document.getElementById("root")), 1500);
