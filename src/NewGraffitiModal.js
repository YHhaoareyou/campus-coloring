import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from "react-i18next";

const NewGraffitiModal = ({ isOpen, closeModal, openCanvas }) => {
  const { t } = useTranslation();

  const openNewGraffitiCanvas = () => {
    openCanvas({ mode: 'new' });
    closeModal();
  }

  const openOverwriteGraffitiCanvas = () => {
    openCanvas({ mode: 'overwrite' });
    closeModal();
  }

  return (
    <Modal centered show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t("NewGraffitiModal.Which kind of graffiti?")}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <Button variant="outline-primary" onClick={openNewGraffitiCanvas}>
          {t("NewGraffitiModal.New graffiti")}
        </Button>
        <br /><br />
        <Button variant="outline-primary" onClick={openOverwriteGraffitiCanvas}>
          {t("NewGraffitiModal.graffiti based on this one")}
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default NewGraffitiModal;