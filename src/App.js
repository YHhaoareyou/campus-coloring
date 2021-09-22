import { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocationsMenu from './LocationsMenu';
import Header from './Header';
import ImageSwitch from './ImageSwitch';
import ActionMenu from './ActionMenu';
import Canvas from './Canvas';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentImgIdState, currentImgSrcState, currentLocState } from './atoms.js';
import { getDatabase, ref, get } from "firebase/database";
import Home from './Home';
import Paintings from "./Paintings";

function App() {
  

  return (
    <div className="App">
      <Router>
        <Home path="/" />
        <Paintings path="/:loc" />
      </Router>
    </div>
  );
}

export default App;
