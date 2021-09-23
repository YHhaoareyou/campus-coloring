import { useEffect, useState } from 'react';
import Header from './Header';
import ImageSwitch from './ImageSwitch';
import ActionMenu from './ActionMenu';
import Canvas from './Canvas';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentImgIdState, currentImgSrcState, currentLocState } from './atoms.js';
import { getDatabase, ref, get, set } from "firebase/database";
import locations from './locations';
import queryString from 'query-string';

function Paintings({ loc, location }) {
  const setCurrentLoc = useSetRecoilState(currentLocState);
  const [currentImgId, setCurrentImgId] = useRecoilState(currentImgIdState);
  const setCurrentImgSrc = useSetRecoilState(currentImgSrcState);
  const [currentImgIdIndex, setCurrentImgIdIndex] = useState(0);
  const [canvasVisibility, setCanvasVisibility] = useState(false);
  const [imgInfos, setImgInfos] = useState([]);
  const [isNewPainting, setIsNewPainting] = useState(true);

  const switchToPrevImg = () => {
    if (imgInfos.length > 1) {
      const prevIndex = currentImgIdIndex === 0 ? imgInfos.length - 1 : currentImgIdIndex - 1;
      setCurrentImgIdIndex(prevIndex);
      setCurrentImgId(imgInfos[prevIndex].id);
      switchImgSrc(imgInfos[prevIndex].id);

      var qs = queryString.parse(location.search);
      qs.pid = imgInfos[prevIndex].id;
      const url = window.location.origin + window.location.pathname + '?' + queryString.stringify(qs);
      window.history.replaceState({ path: url }, '', url)
    }
  }

  const switchToNextImg = () => {
    if (imgInfos.length > 1) {
      const nextIndex = currentImgIdIndex === imgInfos.length - 1 ? 0 : currentImgIdIndex + 1;
      setCurrentImgIdIndex(nextIndex);
      setCurrentImgId(imgInfos[nextIndex].id);
      switchImgSrc(imgInfos[nextIndex].id);

      var qs = queryString.parse(location.search);
      qs.pid = imgInfos[nextIndex].id;
      const url = window.location.origin + window.location.pathname + '?' + queryString.stringify(qs);
      window.history.replaceState({ path: url }, '', url)
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

    const pid = queryString.parse(location.search).pid;
    setImgInfos(imgInfosArr);
    setCurrentImgId(pid || imgInfosArr[0].id);
    setCurrentImgIdIndex(pid ? imgInfosArr.map(img => img.id).indexOf(pid) : 0);
    switchImgSrc(pid || imgInfosArr[0].id);
  }

  const switchImgSrc = (imgId) => {
    const db = getDatabase();
    get(ref(db, 'img_urls/' + loc + '/' + imgId)).then(snap => {
      if(snap.exists()){
        setCurrentImgSrc(snap.val())
      }
    }).catch(err => console.error(err));
  }

  const updateLikes = (action) => {
    var infos = imgInfos;
    if (action === 1) {
      infos[currentImgIdIndex].likes = {
        ...infos[currentImgIdIndex].likes,
        '26577319': true
      };
    } else {
      delete infos[currentImgIdIndex].likes['26577319']
    }
    setImgInfos(infos);
  }

  const likeTrigger = () => {
    const db = getDatabase();
    imgInfos[currentImgIdIndex].likes && imgInfos[currentImgIdIndex].likes['26577319']
      ? set(ref(db, 'img_info/' + loc + '/' + currentImgId + '/likes/' + '26577319'), null).then(snap => updateLikes(-1))
      : set(ref(db, 'img_info/' + loc + '/' + currentImgId + '/likes/' + '26577319'), true).then(snap => updateLikes(1))
  }

  useEffect(() => {
    setCurrentLoc(loc);

    const qs = queryString.parse(location.search)
    const db = getDatabase();
    get(ref(db, 'img_info/' + loc)).then(snap => {
      if(snap.exists()){
        if (qs.mode && qs.mode === 'base') {
          const baseIds = Object.keys(snap.val()[qs.bid].prev_img_ids);
          var idsObj = {};
          baseIds.forEach(id => {
            idsObj[id] = snap.val()[id]
          });
          initImgInfos(idsObj);
        } else if (qs.mode && qs.mode === 'user') {
          get(ref(db, 'users/' + qs.uid + '/img_ids/' + loc)).then(userPaintingIdsSnap => {
            var idsObj = {};
            Object.keys(userPaintingIdsSnap.val()).forEach(id => {
              idsObj[id] = snap.val()[id]
            });
            initImgInfos(idsObj);
          })
        } else {
          initImgInfos(snap.val());
        }
      }
    }).catch(err => console.error(err));
  }, [])

  return (
    <div>
      <Header
        location={locations.find(l => l.id === loc)?.name}
       />
      <ImageSwitch switchPrev={switchToPrevImg} switchNext={switchToNextImg} />
      {
        imgInfos.length > 0 && (
          <ActionMenu
            imgInfo={imgInfos[currentImgIdIndex]}
            openCanvas={({ isNew }) => {setCanvasVisibility(true); setIsNewPainting(isNew);}}
            canvasVisibility={canvasVisibility}
            likeTrigger={likeTrigger}
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
