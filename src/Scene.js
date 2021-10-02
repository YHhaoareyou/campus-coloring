import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { currentLocState, currentImgIdState, currentImgSrcState } from './atoms.js';
import { getDatabase, ref, get } from "firebase/database";

function Scene() {
  const currentLoc = useRecoilValue(currentLocState);
  const currentImgSrc = useRecoilValue(currentImgSrcState);
  const currentImgId = useRecoilValue(currentImgIdState);
  const [imgSrcs, setImgSrcs] = useState({});

  useEffect(() => {
    const db = getDatabase();
    get(ref(db, 'img_urls/' + currentLoc)).then(snap => {
      if(snap.exists()){
        setImgSrcs(snap.val())
      }
    }).catch(err => console.error(err));
  }, [currentLoc]);

  return (
    <a-scene
      id="a-scene"
      vr-mode-ui="enabled: false;"
      renderer="logarithmicDepthBuffer: true;"
      arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
    >
      <a-assets>
        {imgSrcs && Object.keys(imgSrcs).map(imgId => <img key={imgId} id={imgId} src={imgSrcs[imgId]} crossOrigin="anonymous" />)}
      </a-assets>
      {currentImgSrc && <a-image
        src={'#'+currentImgId}
        width={11}
        height={8}
        position="0 1.5 -10"
        rotation="0 0 0">
      </a-image>}
      
      {/* <a-entity camera></a-entity> */}
    </a-scene>
  )
}

export default Scene;