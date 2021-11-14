import { useRecoilValue } from 'recoil';
import { currentLocState } from './atoms.js';
import { Button, Modal } from 'react-bootstrap';
import { getDatabase, ref, set } from "firebase/database";
import { useTranslation } from "react-i18next";

const EditGraffitiModal = ({ isOpen, closeModal, openCanvas, imgInfo }) => {
  const currentLoc = useRecoilValue(currentLocState);
  const { t } = useTranslation();

  const openEditGraffitiCanvas = () => {
    openCanvas({ mode: 'edit' });
    closeModal();
  }

  const editGraffitiInfo = () => {
    const db = getDatabase();
    const title = prompt(t("EditGraffitiModal.Title label"), imgInfo.title);
    const detail = prompt(t("EditGraffitiModal.Details label"), imgInfo.detail);

    set(ref(db, 'img_info/' + currentLoc + '/' + imgInfo.id + '/title'), title).then(snap => {
      set(ref(db, 'img_info/' + currentLoc + '/' + imgInfo.id + '/detail'), detail).then(sp => {
        alert(t("EditGraffitiModal.Updated"));
        window.location.href = "/" + currentLoc + "?pid=" + imgInfo.id;
      }).catch(e => alert(e));
    }).catch(e => alert(e));
  }

  const deleteGraffiti = () => {
    const db = getDatabase();
    set(ref(db, 'img_urls/' + currentLoc + '/' + imgInfo.id), null).then(snap => {
      set(ref(db, 'img_info/' + currentLoc + '/' + imgInfo.id), null).then(sp => {
        set(ref(db, 'users/' + imgInfo.creator_id + '/img_ids/' + currentLoc + '/' + imgInfo.id), null).then(s => {
          alert(t("EditGraffitiModal.Deleted"));
          window.location.href = "/" + currentLoc;
        }).catch(e => alert(e));
      }).catch(e => alert(e));
    }).catch(e => alert(e));
  }

  return (
    <Modal centered show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t("EditGraffitiModal.Edit/Delete")}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <Button variant="outline-primary" onClick={openEditGraffitiCanvas}>
          <i className='bi bi-pencil-square' /> {t("EditGraffitiModal.Edit graffiti")}
        </Button>
        <br /><br />
        <Button variant="outline-primary" onClick={editGraffitiInfo}>
          <i className='bi bi-brush' /> {t("EditGraffitiModal.Edit title and details")}
        </Button>
        <br /><br />
        <Button variant="outline-danger" onClick={deleteGraffiti}>
          <i className='bi bi-trash' /> {t("EditGraffitiModal.Delete")}
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default EditGraffitiModal;