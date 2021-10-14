import { useEffect, useState, useRef } from 'react';
import { ReactPainter } from "react-painter";
import { getDatabase, ref as dbRef, set as dbSet } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRecoilValue } from 'recoil';
import { currentLocState, currentImgIdState, currentImgSrcState } from './atoms.js';
import styled from 'styled-components';
import { Container, Row, Col, Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';

import { CompactPicker } from 'react-color';
import { SketchField, Tools } from 'react-sketch2';
import RangeSlider from 'react-bootstrap-range-slider';

const PainterMenuWrapper = styled(Container)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 120px;
  padding: 10px;
  background-color: rgba(248, 249, 250, 0.5);
`;

const ActionButton = styled(Button)`
  background: rgba(255, 255, 255, 0.5);
  border: none;
`

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

  const cv = useRef(null);
  const [ lineColor, setLineColor ] = useState('#000');
  const [ lineWidth, setLineWidth ] = useState(5);
  const [ fillColor, setFillColor ] = useState('transparent');
  const [ tool, setTool ] = useState(Tools.Pencil);
  const [ canUndo, setCanUndo ] = useState(false);
  const [ canRedo, setCanRedo ] = useState(false);

  // load base painting on canvas
  useEffect(() => {
    if (!isNew) {
      var basePainting = new Image();
      basePainting.src = currentImgSrc;
      basePainting.crossOrigin = "anonymous";
      basePainting.onload = () => {
        document.getElementsByTagName("canvas")[1].getContext('2d').drawImage(basePainting, 0, 0, windowDimensions.width, windowDimensions.height)
      }
    }
  }, [])

  const undo = () => {
    cv.current.undo();
    setCanUndo(cv.current.canUndo());
    setCanRedo(cv.current.canRedo());
  };

  const redo = () => {
    cv.current.redo();
    setCanUndo(cv.current.canUndo());
    setCanRedo(cv.current.canRedo());
  };

  const clear = () => {
    cv.current.clear();
    setCanUndo(cv.current.canUndo());
    setCanRedo(cv.current.canRedo());
  };

  const duplicateSelected = () => {
    cv.current.copy();
    cv.current.paste();
  }

  const removeSelected = () => cv.current.removeSelected();

  const onSketchChange = () => {
    let prev = canUndo;
    let now = cv.current.canUndo();
    if (prev !== now) setCanUndo(now);
  };

  const saveCanvas = (/*blob*/) => {
    var title, detail, painting, id;
    const storage = getStorage();
    const db = getDatabase();

    do {
      title = prompt("Please name your painting:");
    } while (!title);
    detail = prompt("Please write something about this painting:");
    
    const blob = cv.current.toBlob();
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
              prev_img_ids: !isNew && { [currentImgId]: true, ...basePrevIds }
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

  const colorSelector = (props) => (
    <Popover {...props} style={{ ...props.style, padding: '10px' }}>
      線<br />
      <CompactPicker
        id='lineColor'
        color={lineColor}
        onChange={(color) => setLineColor(color.hex)}
      />
      <br /><br />
      中身{" "}
      <Button style={{ padding: '0px 10px' }} variant='secondary' onClick={() => setFillColor('transparent')}>中身なし</Button>
      <br />
      <CompactPicker
        id='fillColor'
        color={fillColor}
        onChange={(color) => setFillColor(color.hex)}
      />
    </Popover>
  )

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1000,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <SketchField
        name="sketch"
        className="canvas-area"
        ref={cv}
        lineColor={lineColor}
        lineWidth={lineWidth}
        fillColor={fillColor || 'transparent'}
        backgroundColor={'transparent'}
        width={windowDimensions.width}
        height={windowDimensions.height}
        forceValue
        onChange={onSketchChange}
        tool={tool}
        imageFormat={'jpeg'}
      />

      <PainterMenuWrapper>
        <Row>
          <Col>
            <div style={{ marginBottom: '10px' }}>
              <ButtonGroup>
                <Button variant={tool === Tools.Select ? "outline-secondary" : "light"} onClick={() => setTool(Tools.Select)}><i class="bi bi-hand-index-thumb" /></Button>
                <Button variant={tool === Tools.Pencil ? "outline-secondary" : "light"} onClick={() => setTool(Tools.Pencil)}><i class="bi bi-pencil" /></Button>
                <Button variant={tool === Tools.Line ? "outline-secondary" : "light"} onClick={() => setTool(Tools.Line)}><i class="bi bi-slash-lg" /></Button>
                <Button variant={tool === Tools.Rectangle ? "outline-secondary" : "light"} onClick={() => setTool(Tools.Rectangle)}><i class="bi bi-square" /></Button>
                <Button variant={tool === Tools.Circle ? "outline-secondary" : "light"} onClick={() => setTool(Tools.Circle)}><i class="bi bi-circle" /></Button>
                <Button variant={tool === Tools.Pan ? "outline-secondary" : "light"} onClick={() => setTool(Tools.Pan)}><i class="bi bi-arrows-move" /></Button>
              </ButtonGroup>
            </div>
            <div>
              <OverlayTrigger trigger="click" placement="top" overlay={colorSelector} style={{ position: 'relative' }}>
                <Button variant='light'>
                  <i class="bi bi-palette" />{" "}
                  <span style={{ border: '3px solid' + lineColor, backgroundColor: fillColor, width: '20px', height: '20px', display: 'inline-block', verticalAlign: 'middle' }}></span>
                </Button>
              </OverlayTrigger>
              
              <span style={{ display: 'inline-block', width: '20px' }}></span>
              <i class="bi bi-border-width" />{" "}
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <RangeSlider
                  value={lineWidth}
                  onChange={changeEvent => setLineWidth(changeEvent.target.value)}
                />
              </div>
            </div>
          </Col>
          <Col>
            <ActionButton variant='light' onClick={saveCanvas} style={{ padding: '0 10px' }}>完成</ActionButton>
            <ActionButton variant='light' onClick={closeCanvas} style={{ padding: '0 10px' }}>やめる</ActionButton>
            { /* Buttons */ }
          </Col>
        </Row>
      </PainterMenuWrapper>
    </div>
  )

  // return (
  //   <ReactPainter
  //     width={windowDimensions.width}
  //     height={windowDimensions.height}
  //     onSave={saveCanvas}
  //     render={({ canvas, triggerSave, setColor, setLineWidth }) => {
  //       return (
  //         <div style={{ position: 'absolute', left: 0, zIndex: "2000" }}>
  //           <h2 style={{ margin: "0px" }}>{/* location */}</h2>
  //           <div
  //             style={{
  //               backgroundColor: "rgba(255, 255, 255, 0.5)"
  //             }}
  //           >
  //             {canvas}
  //           </div>
  //           <PainterMenuWrapper>
  //             <Row>
  //               <Col>
  //                 Color{" "}
  //                 <input
  //                   type="color"
  //                   onChange={(e) => setColor(e.target.value)}
  //                   style={{ width: "30%" }}
  //                 />{" "}
  //                 <br />
  //                 Width{" "}
  //                 <input
  //                   type="number"
  //                   placeholder="5"
  //                   min="1"
  //                   max="20"
  //                   onChange={(e) => setLineWidth(e.target.value)}
  //                   style={{ width: "30%" }}
  //                 />
  //               </Col>
  //               <Col>
  //                 <ActionButton variant='light' onClick={triggerSave} style={{ padding: '0 10px' }}>完成</ActionButton>
  //                 <ActionButton variant='light' onClick={closeCanvas} style={{ padding: '0 10px' }}>やめる</ActionButton>
  //                 { /* Buttons */ }
  //               </Col>
  //             </Row>
  //           </PainterMenuWrapper>
  //         </div>
  //       );
  //     }}
  //   />
  // );
};

export default Canvas;