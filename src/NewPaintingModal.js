import { Button, Modal } from 'react-bootstrap';

const NewPaintingModal = ({ isOpen, closeModal, openCanvas }) => {
  const openNewPaintingCanvas = () => {
    openCanvas({ mode: 'new' });
    closeModal();
  }

  const openOverwritePaintingCanvas = () => {
    openCanvas({ mode: 'overwrite' });
    closeModal();
  }

  return (
    <Modal centered show={isOpen} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>どんな絵を描きたい？</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center' }}>
        <Button variant="outline-primary" onClick={openNewPaintingCanvas}>
          新しく描こう
        </Button>
        <br /><br />
        <Button variant="outline-primary" onClick={openOverwritePaintingCanvas}>
          これをベースにして描こう
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default NewPaintingModal;