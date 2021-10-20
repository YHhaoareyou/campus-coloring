import { useEffect, useState } from 'react';
import ImageSwitch from './ImageSwitch';
import ActionMenu from './ActionMenu';
import Canvas from './Canvas';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentImgIdState, currentImgSrcState, currentImgAngleState, currentLocState } from './atoms.js';
import { getDatabase, ref, get, set } from "firebase/database";
import { useUser } from './auth'
import queryString from 'query-string';
import Button from 'react-bootstrap/Button';

function Paintings({ loc, location }) {
  const setCurrentLoc = useSetRecoilState(currentLocState);
  const [currentImgId, setCurrentImgId] = useRecoilState(currentImgIdState);
  const setCurrentImgSrc = useSetRecoilState(currentImgSrcState);
  const [currentImgIdIndex, setCurrentImgIdIndex] = useState(0);
  const [angle, setCurrentImgAngle] = useRecoilState(currentImgAngleState);
  const [canvasVisibility, setCanvasVisibility] = useState(false);
  const [imgInfos, setImgInfos] = useState([]);
  const [isNewPainting, setIsNewPainting] = useState(true);
  const user = useUser();

  const switchToPrevImg = () => {
    if (imgInfos.length > 1) {
      const prevIndex = currentImgIdIndex === 0 ? imgInfos.length - 1 : currentImgIdIndex - 1;
      setCurrentImgIdIndex(prevIndex);
      setCurrentImgId(imgInfos[prevIndex].id);
      switchImgSrc(imgInfos[prevIndex].id);
      setCurrentImgAngle(imgInfos[prevIndex].angle);

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
      setCurrentImgAngle(imgInfos[nextIndex].angle);

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
    const imgIdIndex = pid ? imgInfosArr.map(img => img.id).indexOf(pid) : 0;
    setCurrentImgIdIndex(imgIdIndex);
    switchImgSrc(pid || imgInfosArr[0].id);
    setCurrentImgAngle(imgInfosArr[imgIdIndex].angle);
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
        [user.uid]: true
      };
    } else {
      delete infos[currentImgIdIndex].likes[user.uid]
    }
    setImgInfos(infos);
  }

  const likeTrigger = () => {
    const db = getDatabase();
    imgInfos[currentImgIdIndex].likes && imgInfos[currentImgIdIndex].likes[user.uid]
      ? set(ref(db, 'img_info/' + loc + '/' + currentImgId + '/likes/' + user.uid), null).then(snap => updateLikes(-1))
      : set(ref(db, 'img_info/' + loc + '/' + currentImgId + '/likes/' + user.uid), true).then(snap => updateLikes(1))
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
      <ImageSwitch switchPrev={switchToPrevImg} switchNext={switchToNextImg} />
      {
        imgInfos.length > 0 ? (
          <ActionMenu
            imgInfo={imgInfos[currentImgIdIndex]}
            openCanvas={({ isNew }) => {setCanvasVisibility(true); setIsNewPainting(isNew);}}
            canvasVisibility={canvasVisibility}
            likeTrigger={likeTrigger}
          />
        ) : (
          <Button
            style={{ position: 'absolute', bottom: 0, left: 0, width: '100vw' }}
            onClick={() => {setCanvasVisibility(true); setIsNewPainting(true);}}
          >この場所で初の作品を描こう！</Button>
        )
      }
      {
        canvasVisibility && (
          <Canvas
            isNew={isNewPainting}
            basePrevIds={imgInfos[currentImgIdIndex]?.prev_img_ids || {}}
            closeCanvas={() => setCanvasVisibility(false)}
          />
        )
      }
    </div>
  );
}

export default Paintings;