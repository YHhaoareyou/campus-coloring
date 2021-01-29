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
    imagesInfo: null,
    currentLocation: null,
    user: "loading",
    displayImageIndex: 0,
    dbData: null,
  };

  async componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
    const dbData = await database.ref().once("value");
    this.setState({ dbData: dbData.val() });
  }

  setImagesInfo = (images) => this.setState({ imagesInfo: images });
  setLocation = (loc) => this.setState({ currentLocation: loc });
  setDisplayImageIndex = (index) => this.setState({ displayImageIndex: index });

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {this.state.dbData && (
          <Scene
            db={database}
            storage={storage}
            dbData={this.state.dbData}
            setImagesInfo={this.setImagesInfo}
            setLocation={this.setLocation}
            displayImageIndex={this.state.displayImageIndex}
          />
        )}
        <App
          imagesInfo={this.state.imagesInfo}
          currentLocation={this.state.currentLocation}
          auth={auth}
          user={this.state.user}
          db={database}
          storage={storage}
          imgUrls={this.state.dbData && this.state.dbData.image_urls}
          setDisplayImageIndex={this.setDisplayImageIndex}
        />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

// setTimeout(ReactDOM.render(<App />, document.getElementById("root")), 1500);
