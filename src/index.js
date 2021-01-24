import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Entity from "./Entity";

ReactDOM.render(<Entity />, document.getElementById("a-nft"));
setTimeout(ReactDOM.render(<App />, document.getElementById("root")), 1500);
