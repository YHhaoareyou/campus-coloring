import { useEffect, useState, useRef } from 'react';
import { getDatabase, ref as dbRef, set as dbSet } from "firebase/database";
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";
import { useRecoilValue } from 'recoil';
import { currentLocState, currentImgIdState, currentImgSrcState } from './atoms.js';
import styled from 'styled-components';
import { Container, Row, Col, Button, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { useUser } from './auth'

import { CompactPicker } from 'react-color';
import { SketchField, Tools } from 'react-sketch';
import RangeSlider from 'react-bootstrap-range-slider';
import { fabric } from "fabric";

const PainterMenuWrapper = styled(Container)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 120px;
  padding: 5px;
  background-color: rgba(248, 249, 250, 0.5);
`;

const ActionButton = styled(Button)`
  margin: 0px;
  margin-bottom: 2px;
  padding: 0px;
  width: 60px;
  height: 35px;
`;

const ActionButtonLg = styled(ActionButton)`
  width: 50px;
  height: 50px;
`

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function insertImageToCanvas(url, fabricCanvas) {
  fabric.Image.fromURL(
    url,
    function (img) {
      img.scaleToWidth(getWindowDimensions().width);
      fabricCanvas.add(img.set({
        left: 0,
        top: 0,
      }));
    },
    {
      crossOrigin: 'Anonymous'
    }
  )
}

const Canvas = ({ closeCanvas, basePrevIds, isNew, imgInfos }) => {
  const user = useUser();
  const currentLoc = useRecoilValue(currentLocState);
  const currentImgId = useRecoilValue(currentImgIdState);
  const currentImgSrc = useRecoilValue(currentImgSrcState);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const cv = useRef(null);
  const [ lineColor, setLineColor ] = useState('#000');
  const [ lineWidth, setLineWidth ] = useState(5);
  const [ fillColor, setFillColor ] = useState('transparent');
  const [ tool, setTool ] = useState(Tools.Pencil);
  const [ canUndo, setCanUndo ] = useState(false);
  const [ canRedo, setCanRedo ] = useState(false);
  const [ angle, setAngle ] = useState(0);

  // load base painting on canvas
  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    if (!isNew) {
      insertImageToCanvas(currentImgSrc, cv.current._fc);
    }
  }, [isNew, currentImgSrc]);

  useEffect(() => {
    window.addEventListener("deviceorientation", function(e){
      const { beta } = e;
      setAngle(Math.round(beta * 100) / 100)
    });
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
    if (!isNew) {
      insertImageToCanvas(currentImgSrc, cv.current._fc);
    }
  };

  const duplicateSelected = () => {
    try {
      cv.current.copy();
      cv.current.paste();
    } catch (error) {
      alert("まずコピペしたいパーツを選択してください")
    }
  }

  const removeSelected = () => {
    try {
      cv.current.removeSelected();
    } catch (error) {
      alert("まず削除したいパーツを選択してください")
    }
  }

  // Todo: save draft

  const onSketchChange = () => {
    let prev = canUndo;
    let now = cv.current?.canUndo();
    if (prev !== now) setCanUndo(now);
  };

  const saveCanvas = () => {
    if(!window.confirm("あなたの作品を最も適切に表示するように、スマホの前後傾きを固定してからOKを押してください！")) return;
    const lastAngle = angle;
    if (lastAngle) {
      alert("傾きを取得しました。今からタイピングに適した姿勢に変えていただいても大丈夫です。");
    } else {
      alert("エラーが発生しました。もう一度チェックボタンを押してください。");
      return;
    }

    var title, detail, id;
    const storage = getStorage();
    const db = getDatabase();

    title = prompt("タイトル：");
    detail = prompt("この作品についての説明：");
    
    id = Date.now();
    if (title === "") title = id;

    const dataUrl = cv.current.toDataURL();

    uploadString(storageRef(storage, 'paintings/' + title), dataUrl, 'data_url')
      .then(snap => getDownloadURL(snap.ref))
      .then(url => {

        Promise.all([
          dbSet(dbRef(db, 'img_urls/' + currentLoc + '/' + id), url), // save url
          dbSet(dbRef(db, 'img_info/' + currentLoc + '/' + id), {
            title,
            detail,
            angle: lastAngle,
            size: {
              width: windowDimensions.width,
              height: windowDimensions.height - 120,
            },
            creator_id: user.uid,
            prev_img_ids: !isNew && { [currentImgId]: true, ...basePrevIds }
          }), // save info
          dbSet(dbRef(db, 'users/' + user.uid + '/img_ids/' + currentLoc + '/' + id), true) // add img id to user
        ]).then(snap => {

          // send notifications
          const prev_user_ids = imgInfos.map(img => img.creator_id);
          Promise.all(prev_user_ids.map(uid => dbSet(dbRef(db, 'users/' + uid + '/notifications/' + id), {
            type: 0,
            uid: uid
          })))
            .then(s => {
              dbSet(dbRef(db, 'users/' + user.uid + '/name'), user.displayName)
                .then(snap => {

                  // upload success & reload
                  alert("アップロードしました！");
                  closeCanvas();
                  window.location.href = "/" + currentLoc + "?pid=" + id

                }).catch(err => alert(err));
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
        onChange={(color) => {setFillColor(color.hex); setLineColor('#000'); setLineColor(lineColor);}}
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
        borderBottom: "5px solid #aaa"
      }}
    >
      <SketchField
        name="sketch"
        className="canvas-area"
        ref={cv}
        lineColor={lineColor}
        lineWidth={lineWidth}
        fillColor={fillColor || 'transparent'}
        width={windowDimensions.width}
        height={windowDimensions.height}
        forceValue
        onChange={onSketchChange}
        tool={tool}
        imageFormat={'jpeg'}
      />

      <PainterMenuWrapper>
        <Row>
          <Col xs={7} style={{ paddingRight: '5px' }}>
            <div>
              <ButtonGroup>
                <Button variant={tool === Tools.Pencil ? "secondary" : "light"} onClick={() => setTool(Tools.Pencil)}><i className="bi bi-pencil" /></Button>
                <Button variant={tool === Tools.Line ? "secondary" : "light"} onClick={() => setTool(Tools.Line)}><i className="bi bi-slash-lg" /></Button>
                <Button variant={tool === Tools.Rectangle ? "secondary" : "light"} onClick={() => setTool(Tools.Rectangle)}><i className="bi bi-square" /></Button>
                <Button variant={tool === Tools.Circle ? "secondary" : "light"} onClick={() => setTool(Tools.Circle)}><i className="bi bi-circle" /></Button>
                <OverlayTrigger trigger="click" placement="top" overlay={colorSelector} style={{ position: 'relative' }}>
                  <Button variant='light' style={{ padding: '3px' }}>
                    <i className="bi bi-palette" />{" "}
                    <span style={{ border: '3px solid' + lineColor, backgroundColor: fillColor, width: '15px', height: '15px', display: 'inline-block', verticalAlign: 'middle' }}></span>
                  </Button>
                </OverlayTrigger>
              </ButtonGroup>
            </div>

            <div>
              <span style={{ display: 'inline-block', width: '20px' }}></span>
              <i className="bi bi-border-width" />{" "}
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <RangeSlider
                  min={1}
                  max={30}
                  value={lineWidth}
                  onChange={changeEvent => setLineWidth(changeEvent.target.value)}
                />
              </div>
            </div>

            <ButtonGroup>
              <ActionButton variant={tool === Tools.Select ? "secondary" : "light"} onClick={() => setTool(Tools.Select)}><i className="bi bi-hand-index-thumb" /></ActionButton>
              <ActionButton disabled={tool !== Tools.Select} variant='light' onClick={removeSelected}><i className='bi bi-trash' /></ActionButton>
              <ActionButton disabled={tool !== Tools.Select} variant='light' onClick={duplicateSelected}><i className='bi bi-files' /></ActionButton>
            </ButtonGroup>
          </Col>

          <Col xs={5}>
            <ButtonGroup style={{ marginBottom: '5px' }}>
              <ActionButtonLg disabled={!canUndo} variant='light' onClick={undo}><i className='bi bi-arrow-90deg-left' /></ActionButtonLg>
              <ActionButtonLg disabled={!canRedo} variant='light' onClick={redo}><i className='bi bi-arrow-90deg-right' /></ActionButtonLg>
              <ActionButtonLg variant='light' onClick={clear}><i className='bi bi-arrow-counterclockwise' /></ActionButtonLg>
            </ButtonGroup>

            <ButtonGroup>
              <ActionButtonLg variant='light' onClick={saveCanvas}><i className='bi bi-check-lg' /></ActionButtonLg>
              <ActionButtonLg disabled={true} variant='secondary' onClick={() => {}}><i className='bi bi-hdd' /></ActionButtonLg>
              <ActionButtonLg variant='light' onClick={closeCanvas}><i className='bi bi-x-lg' /></ActionButtonLg>
            </ButtonGroup>
          </Col>
        </Row>
      </PainterMenuWrapper>
    </div>
  )
};

export default Canvas;