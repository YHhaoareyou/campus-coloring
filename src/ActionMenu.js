import { useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';

const MenuWrapper = styled(Container)`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(248, 249, 250, 0.5);
  padding: 10px;
  padding-right: 20px;
`

const ActionButton = styled(Button)`
  background: rgba(255, 255, 255, 0.5);
  border: none;
  width: 100%;
`

// Todo: notification (like, 上書き)

function ActionMenu({ imgInfo, openCanvas, canvasVisibility, likeTrigger }) {
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(imgInfo.likes ? Object.keys(imgInfo.likes).length : 0)
  const [liked, setLiked] = useState(imgInfo.likes && Object.keys(imgInfo.likes).includes('26577319'))

  const handleLikeTrigger = () => {
    likeTrigger();
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  }

  const navigateToBasePaintings = () => {
    window.location.href = window.location.origin + window.location.pathname + '?mode=base&bid=' + imgInfo.id;
  }

  const navigateToUserPaintings = () => {
    window.location.href = window.location.origin + window.location.pathname + '?mode=user&uid=' + imgInfo.creator_id;
  }

  return !canvasVisibility && (
    <MenuWrapper>
      <Row>
        <Col xs={8}>
          <Card style={{ height: '100px', overflowY: 'scroll' }}>
            <Card.Body style={{ padding: '5px' }}>
              <Card.Title as='h6' style={{ margin: '5px' }}>{imgInfo.title}</Card.Title>
              <Card.Text style={{ fontSize: '14px' }}>
                {imgInfo.detail}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Row>
            <Col style={{ padding: 0 }}>
              <ActionButton variant='light' size='sm' onClick={navigateToUserPaintings}>
                <i className="bi bi-person"></i>
                <br />
                ユーザ
              </ActionButton>
            </Col>
            <Col style={{ padding: 0 }}>
              <ActionButton variant='light' size='sm' onClick={handleLikeTrigger}>
                <i className="bi bi-heart" style={{ color: liked ? 'red' : 'black' }}></i>
                <br />
                {likes}
              </ActionButton>
            </Col>
          </Row>
          <Row>
            <Col style={{ padding: 0 }}>
              <ActionButton variant='light' size='sm' disabled={!imgInfo.prev_img_ids} onClick={navigateToBasePaintings}>
                <i className="bi bi-collection"></i>
                <br />
                前作へ
              </ActionButton>
            </Col>
            <Col style={{ padding: 0 }}>
              <ActionButton variant='light' size='sm' onClick={() => setShowModal(true)}>
                <i className="bi bi-pencil"></i>
                <br />
                描こう
              </ActionButton>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>どんな絵を描きたい？</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <Button variant="outline-primary" onClick={() => {openCanvas({ isNew: true }); setShowModal(false);}}>
            新しく描こう
          </Button>
          <br /><br />
          <Button variant="outline-primary" onClick={() => {openCanvas({ isNew: false }); setShowModal(false);}}>
            これをベースにして描こう
          </Button>
        </Modal.Body>
      </Modal>

    </MenuWrapper>
  )
}

export default ActionMenu;