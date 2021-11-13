import { useRecoilValue } from 'recoil';
import { currentLocState } from './atoms.js';
import { Button, Modal } from 'react-bootstrap';
import { getDatabase, ref, set } from "firebase/database";
import { useTranslation } from "react-i18next";

const EditPaintingModal = ({ isOpen, closeModal, openCanvas, imgInfo }) => {
  const currentLoc = useRecoilValue(currentLocState);
  const { t } = useTranslation();

  const openEditPaintingCanvas = () => {
    openCanvas({ mode: 'edit' });
    closeModal();
  }

  const editPaintingInfo = () => {
    const db = getDatabase();
    const title = prompt(t("EditPaintingModal.Title label"), imgInfo.title);
    const detail = prompt(t("EditPaintingModal.Details label"), imgInfo.detail);

    set(ref(db, 'img_info/' + currentLoc + '/' + imgInfo.id + '/title'), title).then(snap => {
      set(ref(db, 'img_info/' + currentLoc + '/' + imgInfo.id + '/detail'), detail).then(sp => {
        alert(t("EditPaintingModal.Updated"));
        window.location.href = "/" + currentLoc + "?pid=" + imgInfo.id;
      }).catch(e => alert(e));
    }).catch(e => alert(e));
  }

  const deletePainting = () => {
    const db = getDatabase();
    set(ref(db, 'img_urls/' + currentLoc + '/' + imgInfo.id), null).then(snap => {
      set(ref(db, 'img_info/' + currentLoc + '/' + imgInfo.id), null).then(sp => {
        set(ref(db, 'users/' + imgInfo.creator_id + '/img_ids/' + currentLoc + '/' + imgInfo.id), null).then(s => {
          alert(t("EditPaintingModal.Deleted"));
          window.location.href = "/" + currentLoc;
        }).catch(e => alert(e));
      }).catch(e => alert(e));
    }).catch(e => alert(e));
  }

  return (
    <Modal centered show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t("EditPaintingModal.Edit/Delete")}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <Button variant="outline-primary" onClick={openEditPaintingCanvas}>
          <i className='bi bi-pencil-square' /> {t("EditPaintingModal.Edit painting")}
        </Button>
        <br /><br />
        <Button variant="outline-primary" onClick={editPaintingInfo}>
          <i className='bi bi-brush' /> {t("EditPaintingModal.Edit title and details")}
        </Button>
        <br /><br />
        <Button variant="outline-danger" onClick={deletePainting}>
          <i className='bi bi-trash' /> {t("EditPaintingModal.Delete")}
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default EditPaintingModal;