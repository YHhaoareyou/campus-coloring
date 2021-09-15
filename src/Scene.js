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
      {/* <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky> */}
      <a-assets>
        {imgSrcs && Object.keys(imgSrcs).map(imgId => <img id={imgId} src={imgSrcs[imgId]} crossOrigin="anonymous" />)}
      </a-assets>
      {currentImgSrc && <a-image
        src={'#'+currentImgId}
        width={0}
        height={20}
        position="0 0 0"
        rotation="-90 0 0">
      </a-image>}
      
      {/* <a-entity camera></a-entity> */}
    </a-scene>
  )
}

export default Scene;