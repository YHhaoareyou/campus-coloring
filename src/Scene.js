import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { currentLocState, currentImgIdState, currentImgSrcState, currentImgAngleState, currentImgSizeState } from './atoms.js';
import { getDatabase, ref, get } from "firebase/database";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function Scene() {
  const currentLoc = useRecoilValue(currentLocState);
  const currentImgSrc = useRecoilValue(currentImgSrcState);
  const currentImgId = useRecoilValue(currentImgIdState);
  const currentImgAngle = useRecoilValue(currentImgAngleState);
  const currentImgSize = useRecoilValue(currentImgSizeState);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [imgSrcs, setImgSrcs] = useState({});
  const [position, setPosition] = useState("0.3 1.5 -10");
  const [rotation, setRotation] = useState("0 0 0");

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());

    const db = getDatabase();
    get(ref(db, 'img_urls/' + currentLoc)).then(snap => {
      if(snap.exists()){
        setImgSrcs(snap.val())
      }
    }).catch(err => console.error(err));
    setPosition(`-0.3 ${1.5 - Math.round(Math.cos(currentImgAngle*Math.PI/180) * 50 * 100) / 100} ${(-1)*Math.round(Math.sin(currentImgAngle*Math.PI/180) * 50 * 100) / 100}`);
    setRotation(`${currentImgAngle-90} 0 0`);
  }, [currentLoc]);

  useEffect(() => {
    setPosition(`-0.3 ${1.5 - Math.round(Math.cos(currentImgAngle*Math.PI/180) * 50 * 100) / 100} ${(-1)*Math.round(Math.sin(currentImgAngle*Math.PI/180) * 50 * 100) / 100}`);
    setRotation(`${currentImgAngle-90} 0 0`);
  }, [currentImgAngle])

  return (
    <a-scene
      id="a-scene"
      vr-mode-ui="enabled: false;"
      renderer="logarithmicDepthBuffer: true;"
      arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
    >
      <a-assets>
        {imgSrcs && Object.keys(imgSrcs).map(imgId => <img key={imgId} id={imgId} src={imgSrcs[imgId]} crossOrigin="anonymous" alt={"Painting " + imgId} />)}
      </a-assets>
      {currentImgSrc && <a-image
        src={'#'+currentImgId}
        width={currentImgSize ? windowDimensions.width / (8 * windowDimensions.width / 414) : 52}
        height={currentImgSize ? currentImgSize.height * windowDimensions.width / currentImgSize.width / (12.5 * windowDimensions.height / 617) : 40}
        position={position}
        rotation={rotation}>
      </a-image>}
      
      {/* <a-entity camera></a-entity> */}
    </a-scene>
  )
}

export default Scene;