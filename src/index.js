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
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "bootstrap-icons/font/bootstrap-icons.css";
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
  .use(initReactI18next) // passes i18n down to react-i18next
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
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
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
