import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AFrameRenderer, Marker } from "react-web-ar";

class ReactArApp extends Component {
  render() {
    return (
      <AFrameRenderer
        arToolKit={{
          sourceType: "image",
          sourceUrl: "./images/hiro_marker.png",
        }}
        stats
      >
        <Marker parameters={{ preset: "hiro" }}>
          <a-box
            color="pink"
            material="opacity: 1;"
            position="0 0.003 0"
            scale="0.4 0.4 0.4"
          >
            <a-animation
              attribute="rotation"
              to="360 0 0"
              dur="5000"
              easing="linear"
              repeat="indefinite"
            />
          </a-box>
        </Marker>
      </AFrameRenderer>
    );
  }
}

ReactDOM.render(<ReactArApp />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
