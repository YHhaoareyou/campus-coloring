import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Scene from "./Scene";
import firebase from "firebase/app";
import "firebase/auth";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAA4zXM0wRBrL1l65NHg_8mQcjg75ew9RQ",
  authDomain: "campus-coloring.firebaseapp.com",
  databaseURL: "https://campus-coloring.firebaseio.com",
  projectId: "campus-coloring",
  storageBucket: "campus-coloring.appspot.com",
  messagingSenderId: "45926036058",
  appId: "1:45926036058:web:a9271137ac86762843de63",
  measurementId: "G-WPPW3TX4QG",
});

const auth = firebaseApp.auth();
const database = firebaseApp.database();
const storage = firebaseApp.storage();

class Root extends React.Component {
  state = {
    isCanvasOpen: false,
    imagesInfo: null,
    user: "loading",
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  openCanvas = () => this.setState({ isCanvasOpen: true });
  setImagesInfo = (images) => this.setState({ imagesInfo: images });

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <Scene
          openCanvas={this.openCanvas}
          db={database}
          storage={storage}
          setImagesInfo={this.setImagesInfo}
        />
        <App
          isCanvasOpen={this.state.isCanvasOpen}
          imagesInfo={this.state.imagesInfo}
          auth={auth}
          user={this.state.user}
        />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

// setTimeout(ReactDOM.render(<App />, document.getElementById("root")), 1500);
