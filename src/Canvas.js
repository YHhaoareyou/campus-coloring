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
  ${props => !props.isOpen && 'display: none;'}
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  padding: 0px;
  background-color: transparent;
`;

const DrawButton = styled(Button)`
  margin: 0px 3px;
  padding: 0px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 0.5px solid #fff;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
`;

const ActionButton = styled(Button)`
  padding: 3px 0px;
  border: 0.5px solid #fff;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
`;

const HideMenuButton = styled(Button)`
  position: absolute;
  bottom: 80px;
  right: 5px;
  padding: 0px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 0.5px solid rgba(0, 0, 0, 0.4);
  background-color: transparent;
  color: rgba(0, 0, 0, 0.4);
  font-size: 24px;
`;

const OpenMenuButton = styled(Button)`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 30px;
  padding: 0px;
  font-size: 36px;
  line-height: 0px;
  background: rgba(255, 255, 255, 0.3);
  color: rgb(200, 200, 200);
  border: none;
`;

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

const Canvas = ({ closeCanvas, basePrevIds, mode, imgInfos, imgInfo }) => {
  const user = useUser();
  const currentLoc = useRecoilValue(currentLocState);
  const currentImgId = useRecoilValue(currentImgIdState);
  const currentImgSrc = useRecoilValue(currentImgSrcState);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const cv = useRef(null);
  const [ lineColor, setLineColor ] = useState('#000');
  const [ lineWidth, setLineWidth ] = useState(5);
  const [ tool, setTool ] = useState(Tools.Pencil);
  const [ canUndo, setCanUndo ] = useState(false);
  const [ canRedo, setCanRedo ] = useState(false);
  const [ angle, setAngle ] = useState(0);
  const [ isMenuOpen, setIsMenuOpen ] = useState(true);

  // load base painting on canvas
  useEffect(() => {
    setWindowDimensions(getWindowDimensions());
    if (mode !== 'new') {
      insertImageToCanvas(currentImgSrc, cv.current._fc);
    }
  }, [mode, currentImgSrc]);

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
    if(!window.confirm("最初からやり直しますか？")) return;
    cv.current.clear();
    setCanUndo(cv.current.canUndo());
    setCanRedo(cv.current.canRedo());
    if (mode !== 'new') {
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
      alert("エラーが発生しました。もう一度「できた」ボタンを押してみてください。");
      return;
    }

    var title, detail, id;
    const storage = getStorage();
    const db = getDatabase();

    title = prompt("タイトル：", mode === 'edit' ? imgInfo.title : '');
    detail = prompt("この作品についての説明：", mode === 'edit' ? imgInfo.detail : '');
    
    id = mode === 'edit' ? currentImgId : Date.now();
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
            prev_img_ids: mode === 'overwrite' && { [currentImgId]: true, ...basePrevIds }
          }), // save info
          dbSet(dbRef(db, 'users/' + user.uid + '/img_ids/' + currentLoc + '/' + id), true) // add img id to user
        ]).then(snap => {

          // send notifications
          const prev_user_ids = imgInfos.map(img => img.creator_id);
          Promise.all(prev_user_ids.map(uid => dbSet(dbRef(db, 'users/' + uid + '/notifications/' + id), {
            type: 0,
            loc: currentLoc,
            username: user.displayName
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

  const confirmCloseCanvas = () => {
    window.confirm("作成中の絵をやめますか？") && closeCanvas();
  }

  const colorSelector = (props) => (
    <Popover {...props} style={{ ...props.style, padding: '10px' }}>
      <CompactPicker
        id='lineColor'
        color={lineColor}
        onChange={(color) => setLineColor(color.hex)}
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
        fillColor='transparent'
        width={windowDimensions.width}
        height={windowDimensions.height}
        forceValue
        onChange={onSketchChange}
        tool={tool}
        imageFormat={'jpeg'}
      />

      {
        isMenuOpen
          ? <HideMenuButton variant='outline-light' onClick={() => setIsMenuOpen(false)}><i className='bi bi-x' /></HideMenuButton>
          : <OpenMenuButton variant='outline-light' onClick={() => setIsMenuOpen(true)}><i className='bi bi-chevron-compact-up' /></OpenMenuButton>
        }

      <PainterMenuWrapper isOpen={isMenuOpen}>
        <Row style={{ padding: '0px 15px', marginBottom: '10px' }}>
          <Col xs={4} style={{ padding: 0 }}>
            <DrawButton variant={tool === Tools.Pencil ? "secondary" : "light"} onClick={() => setTool(Tools.Pencil)}><i className="bi bi-pencil" /></DrawButton>
            <DrawButton variant={tool === Tools.Line ? "secondary" : "light"} onClick={() => setTool(Tools.Line)}><i className="bi bi-slash-lg" /></DrawButton>
            <OverlayTrigger trigger="click" placement="top" overlay={colorSelector} style={{ position: 'relative' }}>
              <DrawButton variant='light' style={{ backgroundColor: '#fff' }}>
                <i className="bi bi-palette" style={{ color: lineColor }} />{" "}
              </DrawButton>
            </OverlayTrigger>
          </Col>
          <Col xs={4} style={{ paddingRight: '5px', padding: 0 }}>
            <div>
              <i className="bi bi-border-width" />{" "}
              <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <RangeSlider
                  min={1}
                  max={15}
                  value={lineWidth}
                  style={{ width: '80px' }}
                  onChange={changeEvent => setLineWidth(changeEvent.target.value)}
                />
              </div>
            </div>
          </Col>
          <Col xs={4} style={{ padding: 0 }}>
            <DrawButton variant={tool === Tools.Select ? "secondary" : "light"} onClick={() => setTool(Tools.Select)}><i className="bi bi-hand-index-thumb" /></DrawButton>
            <DrawButton disabled={tool !== Tools.Select} variant='light' onClick={removeSelected}><i className='bi bi-trash' /></DrawButton>
            <DrawButton disabled={tool !== Tools.Select} variant='light' onClick={duplicateSelected}><i className='bi bi-files' /></DrawButton>
          </Col>
        </Row>

        <ButtonGroup style={{ width: '100%' }}>
          <ActionButton disabled={!canUndo} variant='light' onClick={undo}><i className='bi bi-arrow-90deg-left' /></ActionButton>
          <ActionButton disabled={!canRedo} variant='light' onClick={redo}><i className='bi bi-arrow-90deg-right' /></ActionButton>
          <ActionButton variant='light' onClick={clear}><i className='bi bi-arrow-counterclockwise' /></ActionButton>
          <ActionButton variant='light' onClick={saveCanvas}><i className='bi bi-check-lg' /> できた</ActionButton>
          <ActionButton variant='light' onClick={confirmCloseCanvas}><i className='bi bi-x-lg' /> やめる</ActionButton>
        </ButtonGroup>
      </PainterMenuWrapper>
    </div>
  )
};

export default Canvas;