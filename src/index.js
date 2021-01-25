import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Scene from "./Scene";

class Root extends React.Component {
  state = {
    isCanvasOpen: false
  };

  openCanvas = () => this.setState({ isCanvasOpen: true });

  render() {
    return (
      <div style={{width: "100%", height: "100%"}}>
        <Scene openCanvas={this.openCanvas} />
        <App isCanvasOpen={this.state.isCanvasOpen} />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

// setTimeout(ReactDOM.render(<App />, document.getElementById("root")), 1500);
