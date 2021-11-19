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
import { useUser } from './auth';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cache from 'i18next-localstorage-cache';
import detector from "i18next-browser-languagedetector";
import en from './locales/en.json';
import ja from './locales/ja.json';

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

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Cache)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: en
      },
      ja: {
        translation: ja
      }
    },
    fallbackLng: "ja",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

const Root = () => {
  const currentLoc = useRecoilValue(currentLocState);
  const user = useUser();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {user && currentLoc && <Scene />}
      <App />
    </div>
  );
}

ReactDOM.render(<RecoilRoot><Root /></RecoilRoot>, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
