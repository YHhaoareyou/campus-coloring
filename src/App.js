import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocationsMenu from './LocationsMenu';
import Header from './Header';
import ImageSwitch from './ImageSwitch';
import ActionMenu from './ActionMenu';
import Canvas from './Canvas';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentImgIdState, currentImgSrcState, currentLocState } from './atoms.js';

function App() {
  const currentLoc = useRecoilValue(currentLocState);
  const [currentImgId, setCurrentImgId] = useRecoilState(currentImgIdState);
  const [currentImgSrc, setCurrentImgSrc] = useRecoilState(currentImgSrcState);
  const [currentImgIdIndex, setCurrentImgIdIndex] = useState(0);
  const [canvasVisibility, setCanvasVisibility] = useState(false);

  const switchToPrevImg = () => {

  }

  const switchToNextImg = () => {
    
  }

  // retrieve all images' ids of current location
  // ...

  return (
    <div className="App">
      {
        currentLoc
          ? <div>
              <Header location={currentLoc} />
              <ImageSwitch switchPrev={switchToPrevImg} switchNext={switchToNextImg} />
              <ActionMenu openCanvas={() => setCanvasVisibility(true)} closeCanvas={() => setCanvasVisibility(false)} />
            </div>
          : <LocationsMenu />
      }
      {
        canvasVisibility && <Canvas />
      }
    </div>
  );
}

export default App;
