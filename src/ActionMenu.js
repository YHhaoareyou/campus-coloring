import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Row, ButtonGroup, Button, Card, Modal } from 'react-bootstrap';
import { useUser } from './auth';

const MenuWrapper = styled(Container)`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: transparent;
  padding-bottom: 10px;
`

const ActionButton = styled(Button)`
  background: transparent;
  border: 0.5px solid #fff;
  border-bottom: none;
  height: 30px;
  color: #fff;
`

const IntroCard = styled(Card)`
  height: 100px;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border: 0.5px solid #fff;
`;

function ActionMenu({ imgInfo, openCanvas, canvasVisibility, likeTrigger }) {
  const user = useUser();
  const [showModal, setShowModal] = useState(false);
  const [likes, setLikes] = useState(imgInfo.likes ? Object.keys(imgInfo.likes).length : 0)
  const [liked, setLiked] = useState(imgInfo.likes && Object.keys(imgInfo.likes).includes(user.uid))

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

  useEffect(() => {
    setLikes(imgInfo.likes ? Object.keys(imgInfo.likes).length : 0);
    setLiked(imgInfo.likes && Object.keys(imgInfo.likes).includes(user.uid));
  }, [imgInfo])

  // return !canvasVisibility && (
  return (
    <MenuWrapper>
      <IntroCard>
        <Card.Body style={{ padding: 0 }}>
          <Card.Title as='h6' style={{ height: '15px', margin: '5px' }}>{imgInfo.title}</Card.Title>
          <Card.Text style={{ fontSize: '14px', height: '40px', margin: '5px' }}>
            {imgInfo.detail}
          </Card.Text>
          <ButtonGroup style={{ width: '100%', margin: 0, height: '30px' }}>
          <ActionButton variant='light' size='sm' onClick={navigateToUserPaintings} style={{ borderLeft: 'none' }}>
            <i className="bi bi-person"></i>
            {' '}ユーザ
          </ActionButton>
          {
            imgInfo?.prev_img_ids && (
              <ActionButton variant='light' size='sm' onClick={navigateToBasePaintings} style={{ marginBottom: 0 }}>
                <i className="bi bi-collection"></i>
                {' '}前作へ
              </ActionButton>
            )
          }
          <ActionButton variant='light' size='sm' onClick={handleLikeTrigger}>
            <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
            {' '}{likes}
          </ActionButton>
          <ActionButton variant='light' size='sm' onClick={() => setShowModal(true)} style={{ borderRight: 'none' }}>
            <i className="bi bi-pencil"></i>
            {' '}描こう
          </ActionButton>
          </ButtonGroup>
        </Card.Body>
      </IntroCard>

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