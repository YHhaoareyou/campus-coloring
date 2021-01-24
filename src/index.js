import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Nft from "./Nft";

ReactDOM.render(<Nft />, document.getElementById("seat_for_nft"));
document
  .querySelector("a-scene")
  .replaceChild(
    document.getElementById("a-nft"),
    document.getElementById("seat_for_nft")
  );
setTimeout(ReactDOM.render(<App />, document.getElementById("root")), 1500);
