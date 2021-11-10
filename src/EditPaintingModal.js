import { useRecoilValue } from 'recoil';
import { currentLocState } from './atoms.js';
import { Button, Modal } from 'react-bootstrap';
import { getDatabase, ref, set } from "firebase/database";

const EditPaintingModal = ({ isOpen, closeModal, openCanvas, imgInfo }) => {
  const currentLoc = useRecoilValue(currentLocState);

  const openEditPaintingCanvas = () => {
    openCanvas({ mode: 'edit' });
    closeModal();
  }

  const editPaintingInfo = () => {
    const db = getDatabase();
    const title = prompt("タイトル：", imgInfo.title);
    const detail = prompt("説明：", imgInfo.detail);

    set(ref(db, 'img_info/' + currentLoc + '/' + imgInfo.id + '/title'), title).then(snap => {
      set(ref(db, 'img_info/' + currentLoc + '/' + imgInfo.id + '/detail'), detail).then(sp => {
        alert("修正しました！");
        window.location.href = "/" + currentLoc + "?pid=" + imgInfo.id;
      }).catch(e => alert(e));
    }).catch(e => alert(e));
  }

  const deletePainting = () => {
    const db = getDatabase();
    set(ref(db, 'img_urls/' + currentLoc + '/' + imgInfo.id), null).then(snap => {
      set(ref(db, 'img_info/' + currentLoc + '/' + imgInfo.id), null).then(sp => {
        set(ref(db, 'users/' + imgInfo.creator_id + '/img_ids/' + currentLoc + '/' + imgInfo.id), null).then(s => {
          alert("削除しました！");
          window.location.href = "/" + currentLoc;
        }).catch(e => alert(e));
      }).catch(e => alert(e));
    }).catch(e => alert(e));
  }

  return (
    <Modal centered show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>編集・削除</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <Button variant="outline-primary" onClick={openEditPaintingCanvas}>
          <i className='bi bi-pencil-square' /> 絵を編集
        </Button>
        <br /><br />
        <Button variant="outline-primary" onClick={editPaintingInfo}>
          <i className='bi bi-brush' /> タイトルと説明のみを編集
        </Button>
        <br /><br />
        <Button variant="outline-danger" onClick={deletePainting}>
          <i className='bi bi-trash' /> 削除
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default EditPaintingModal;