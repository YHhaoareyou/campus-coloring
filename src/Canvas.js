import { useEffect, useState } from 'react';
import { ReactPainter } from "react-painter";
import Button from 'react-bootstrap/Button';
import { getDatabase, ref as dbRef, set as dbSet } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRecoilValue } from 'recoil';
import { currentLocState, currentImgIdState, currentImgSrcState } from './atoms.js';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const Canvas = ({ closeCanvas, basePrevIds, isNew }) => {
  const currentLoc = useRecoilValue(currentLocState);
  const currentImgId = useRecoilValue(currentImgIdState);
  const currentImgSrc = useRecoilValue(currentImgSrcState);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [context, setContext] = useState(null);

  // load base painting on canvas
  useEffect(() => {
    if (!isNew) {
      var basePainting = new Image();
      basePainting.src = currentImgSrc;
      console.log(basePainting);
      basePainting.crossOrigin = "anonymous";
      basePainting.onload = () => {
        document.getElementsByTagName("canvas")[1].getContext('2d').drawImage(basePainting, 0, 0, windowDimensions.width, windowDimensions.height)
      }
    }
  })

  const saveCanvas = (blob) => {
    var title, detail, painting, id;
    const storage = getStorage();
    const db = getDatabase();

    do {
      title = prompt("Please name your painting:");
    } while (!title);
    detail = prompt("Please write something about this painting:");
    
    painting = new Image();
    painting.src = blob;
    id = Date.now();

    uploadBytes(storageRef(storage, 'paintings/' + title), blob)
      .then(snap => getDownloadURL(snap.ref))
      .then(url => {

        // save url
        dbSet(dbRef(db, 'img_urls/' + currentLoc + '/' + id), url)
          .then(snap => {

            // save info
            dbSet(dbRef(db, 'img_info/' + currentLoc + '/' + id), {
              title,
              detail,
              creator_id: '26577319',
              prev_img_ids: !isNew && [currentImgId, ...Object.keys(basePrevIds)]
            })
              .then(snap => {

                // add img id to user
                dbSet(dbRef(db, 'users/' + '26577319' + '/img_ids/' + currentLoc + '/' + id), true)
                  .then(snap => {

                    // uploaded notification
                    alert("Uploaded! Refresh the page to see your masterpiece!");
                    closeCanvas();

                  }).catch(err => alert(err))
              }).catch(err => alert(err));
          }).catch(err => alert(err));
      }).catch(err => alert(err));
  }

  return (
    <ReactPainter
      width={windowDimensions.width}
      height={windowDimensions.height - 15}
      onSave={saveCanvas}
      render={({ canvas, triggerSave, setColor, setLineWidth }) => {
        return (
          <div style={{ position: 'absolute', left: 0, zIndex: "2000" }}>
            <h2 style={{ margin: "0px" }}>{/* location */}</h2>
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: "5px solid #666",
              }}
            >
              {canvas}
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, padding: "1rem", background: "#ccc", width: '100vw', height: 100 }}>
              <div>
                Color{" "}
                <input
                  type="color"
                  onChange={(e) => setColor(e.target.value)}
                  style={{ width: "30%" }}
                />{" "}
                Width{" "}
                <input
                  type="number"
                  placeholder="5"
                  min="1"
                  max="20"
                  onChange={(e) => setLineWidth(e.target.value)}
                  style={{ width: "30%" }}
                />
              </div>
              <div style={{ paddingTop: "1rem" }}>
                <Button onClick={triggerSave} style={{ padding: '0 10px' }}>保存</Button>
                <Button onClick={closeCanvas} style={{ padding: '0 10px' }}>やめる</Button>
                { /* Buttons */ }
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default Canvas;