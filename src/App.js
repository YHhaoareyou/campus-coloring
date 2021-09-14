import { useEffect, useState } from 'react';
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

function App() {
  const currentLoc = useRecoilValue(currentLocState);
  const [currentImgId, setCurrentImgId] = useRecoilState(currentImgIdState);
  const [currentImgSrc, setCurrentImgSrc] = useRecoilState(currentImgSrcState);
  const [currentImgIdIndex, setCurrentImgIdIndex] = useState(0);
  const [canvasVisibility, setCanvasVisibility] = useState(false);
  const [imgInfos, setImgInfos] = useState([]);

  const switchToPrevImg = () => {
    if (imgInfos.length > 1) {
      const prevIndex = currentImgIdIndex === 0 ? imgInfos.length - 1 : currentImgIdIndex - 1;
      setCurrentImgIdIndex(prevIndex);
      setCurrentImgId(imgInfos[prevIndex].id);
      switchImgSrc(imgInfos[prevIndex].id);
    }
  }

  const switchToNextImg = () => {
    if (imgInfos.length > 1) {
      const nextIndex = currentImgIdIndex === imgInfos.length - 1 ? 0 : currentImgIdIndex + 1;
      setCurrentImgIdIndex(nextIndex);
      setCurrentImgId(imgInfos[nextIndex].id);
      switchImgSrc(imgInfos[nextIndex].id);
    }
  }

  const initImgInfos = (infos) => {
    const imgInfosArr = Object.keys(infos).map(id => ({
      id: id,
      ...infos[id]
    }))
    setImgInfos(imgInfosArr);
    setCurrentImgId(imgInfosArr[0].id);
    setCurrentImgIdIndex(0);
    switchImgSrc(imgInfosArr[0].id);
  }

  const switchImgSrc = (imgId) => {
    const db = getDatabase();
    get(ref(db, 'img_urls/' + currentLoc + '/' + imgId)).then(snap => {
      if(snap.exists()){
        setCurrentImgSrc(snap.val())
      }
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    const db = getDatabase();
    get(ref(db, 'img_info/' + currentLoc)).then(snap => {
      if(snap.exists()){
        initImgInfos(snap.val())
      }
    }).catch(err => console.error(err));
  }, [currentLoc])

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
