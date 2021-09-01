import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import "firebase/auth";
import { Scene } from 'three';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAA4zXM0wRBrL1l65NHg_8mQcjg75ew9RQ",
  authDomain: "campus-coloring.firebaseapp.com",
  databaseURL: "https://campus-coloring.firebaseio.com",
  projectId: "campus-coloring",
  storageBucket: "campus-coloring.appspot.com",
  messagingSenderId: "45926036058",
  appId: "1:45926036058:web:a9271137ac86762843de63",
  measurementId: "G-WPPW3TX4QG",
});

// const auth = firebaseApp.auth();
// const database = firebaseApp.database();
// const storage = firebaseApp.storage();

class Root extends React.Component {
  state = {
    user: "loading",
    dbData: null,
  };

  async componentDidMount() {
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({ user });
    //   } else {
    //     this.setState({ user: null });
    //   }
    // });
    // const dbData = await database.ref().once("value");
    // this.setState({ dbData: dbData.val() });
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {false && <Scene />}
        <App />
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
