import { useEffect, useState } from 'react';
import Header from './Header';
import ImageSwitch from './ImageSwitch';
import ActionMenu from './ActionMenu';
import Canvas from './Canvas';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentImgIdState, currentImgSrcState, currentLocState } from './atoms.js';
import { getDatabase, ref, get } from "firebase/database";
import locations from './locations';
import * as queryString from 'query-string';

function Paintings({ loc, location }) {
  const setCurrentLoc = useSetRecoilState(currentLocState);
  const [currentImgId, setCurrentImgId] = useRecoilState(currentImgIdState);
  const setCurrentImgSrc = useSetRecoilState(currentImgSrcState);
  const [currentImgIdIndex, setCurrentImgIdIndex] = useState(0);
  const [canvasVisibility, setCanvasVisibility] = useState(false);
  const [imgInfos, setImgInfos] = useState([]);
  const [isNewPainting, setIsNewPainting] = useState(true);
  const [isPrevMode, setIsPrevMode] = useState(false);
  const [prevImgOf, setPrevImgOf] = useState('');

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
    var imgInfosArr = infos;
    if (!Array.isArray(infos)) {
      imgInfosArr = Object.keys(infos).map(id => ({
        id: id,
        ...infos[id]
      }))
    }
    setImgInfos(imgInfosArr);
    setCurrentImgId(!isPrevMode && prevImgOf ? prevImgOf : imgInfosArr[0].id);
    setCurrentImgIdIndex(!isPrevMode && prevImgOf ? imgInfosArr.map(img => img.id).indexOf(prevImgOf) : 0);
    switchImgSrc(!isPrevMode && prevImgOf ? prevImgOf : imgInfosArr[0].id);
  }

  const switchImgSrc = (imgId) => {
    const db = getDatabase();
    get(ref(db, 'img_urls/' + loc + '/' + imgId)).then(snap => {
      if(snap.exists()){
        setCurrentImgSrc(snap.val())
      }
    }).catch(err => console.error(err));
  }

  const prevModeTrigger = () => {
    !isPrevMode && setPrevImgOf(currentImgId);
    setIsPrevMode(!isPrevMode);
  }

  useEffect(() => {
    setCurrentLoc(loc);

    if (isPrevMode) {
      const prevPaintingIds = Object.keys(imgInfos.find(img => img.id === prevImgOf)?.prev_img_ids);
      initImgInfos(imgInfos.filter(img => prevPaintingIds.includes(img.id)));
    } else {
      const db = getDatabase();
      get(ref(db, 'img_info/' + loc)).then(snap => {
        if(snap.exists()){
          initImgInfos(snap.val());
        }
      }).catch(err => console.error(err));
    }
  }, [isPrevMode])

  return (
    <div>
      <Header
        location={locations.find(l => l.id === loc)?.name}
        isPrevMode={isPrevMode}
        prevModeTrigger={prevModeTrigger}
       />
      <ImageSwitch switchPrev={switchToPrevImg} switchNext={switchToNextImg} />
      {
        imgInfos.length > 0 && (
          <ActionMenu
            imgInfo={imgInfos[currentImgIdIndex]}
            openCanvas={({ isNew }) => {setCanvasVisibility(true); setIsNewPainting(isNew);}}
            canvasVisibility={canvasVisibility}
            isPrevMode={isPrevMode}
            prevModeTrigger={prevModeTrigger}
          />
        )
      }
      {
        canvasVisibility && (
          <Canvas
            isNew={isNewPainting}
            basePrevIds={imgInfos[currentImgIdIndex].prev_img_ids || {}}
            closeCanvas={() => setCanvasVisibility(false)}
          />
        )
      }
    </div>
  );
}

export default Paintings;
