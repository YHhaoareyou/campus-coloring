import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';
import Scene from './Scene';
import { useRecoilValue } from 'recoil';
import { currentLocState } from './atoms.js';
import { RecoilRoot } from "recoil";
import "bootstrap-icons/font/bootstrap-icons.css";

initializeApp({
  apiKey: "AIzaSyAA4zXM0wRBrL1l65NHg_8mQcjg75ew9RQ",
  authDomain: "campus-coloring.firebaseapp.com",
  databaseURL: "https://campus-coloring.firebaseio.com",
  projectId: "campus-coloring",
  storageBucket: "campus-coloring.appspot.com",
  messagingSenderId: "45926036058",
  appId: "1:45926036058:web:a9271137ac86762843de63",
  measurementId: "G-WPPW3TX4QG",
});

const Root = () => {
  const currentLoc = useRecoilValue(currentLocState);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {currentLoc && <Scene />}
      <App />
    </div>
  );
}

ReactDOM.render(<RecoilRoot><Root /></RecoilRoot>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
