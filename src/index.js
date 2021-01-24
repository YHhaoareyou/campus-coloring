import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Scene from "./components/aframe/Scene";

var body = document.getElementById("body");

ReactDOM.render(<Scene />, document.getElementById("aframe"));
body.replaceChild(
  document.getElementById("a-scene"),
  document.getElementById("aframe")
);

setTimeout(ReactDOM.render(<App />, document.getElementById("root")), 1500);

// ReactDOM.render(<App />, document.getElementById("root"));
// body.replaceChild(
//   document.getElementById("app"),
//   document.getElementById("root")
// );

// ReactDOM.render(<EntityList />, document.querySelector("a-nft"));
// setTimeout(ReactDOM.render(<App />, document.getElementById("body")), 1500);
// ReactDOM.render(<App />, document.getElementById("body"));
