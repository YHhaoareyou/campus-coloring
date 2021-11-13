import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container, Row, ButtonGroup, Button, Card, Modal } from 'react-bootstrap';
import { useUser } from './auth';
import NewPaintingModal from './NewPaintingModal';
import EditPaintingModal from './EditPaintingModal';
import { useTranslation } from "react-i18next";

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
  ${props => !props.isOpen && 'display: none;'}
  height: 100px;
  overflow-y: scroll;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  border: 0.5px solid #fff;
  border-radius: 10px;
`;

const HideMenuButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 25px;
  height: 25px;
  padding: 0px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  line-height: 0px;
  border-radius: 50%;
`;

const OpenMenuButton = styled(Button)`
  width: 100%;
  height: 30px;
  padding: 0px;
  font-size: 36px;
  line-height: 0px;
  background: rgba(255, 255, 255, 0.3);
  color: rgb(200, 200, 200);
  border: none;
`;

function ActionMenu({ imgInfo, openCanvas, likeTrigger }) {
  const user = useUser();
  const [showNewPaintingModal, setShowNewPaintingModal] = useState(false);
  const [showEditPaintingModal, setShowEditPaintingModal] = useState(false);
  const [likes, setLikes] = useState(imgInfo.likes ? Object.keys(imgInfo.likes).length : 0)
  const [liked, setLiked] = useState(imgInfo.likes && Object.keys(imgInfo.likes).includes(user.uid))
  const [isMenuDisplayed, setIsMenuDisplayed] = useState(true)
  const { t } = useTranslation();

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
  }, [imgInfo]);

  return (
    <MenuWrapper>
      {!isMenuDisplayed && <OpenMenuButton variant='outline-light' onClick={() => setIsMenuDisplayed(true)}><i className='bi bi-chevron-compact-up' /></OpenMenuButton>}

      <IntroCard isOpen={isMenuDisplayed}>
        <Card.Body style={{ padding: 0, position: 'relative' }}>
          <HideMenuButton variant='outline-light' onClick={() => setIsMenuDisplayed(false)}><i className='bi bi-x' /></HideMenuButton>
          <Card.Title as='h6' style={{ height: '15px', margin: '5px' }}>{imgInfo.title}</Card.Title>
          <Card.Text style={{ fontSize: '14px', height: '40px', margin: '5px' }}>
            {imgInfo.detail}
          </Card.Text>
          <ButtonGroup style={{ width: '100%', margin: 0, height: '30px' }}>
            {
              imgInfo.creator_id === user.uid ? (
                <ActionButton variant='light' size='sm' onClick={() => setShowEditPaintingModal(true)} style={{ borderLeft: 'none', borderTopLeftRadius: 0 }}>
                  <i className="bi bi-gear"></i>
                  {' '}{t("ActionMenu.Edit/Delete")}
                </ActionButton>
              ) : (
                <ActionButton variant='light' size='sm' onClick={navigateToUserPaintings} style={{ borderLeft: 'none', borderTopLeftRadius: 0 }}>
                  <i className="bi bi-person"></i>
                  {' '}{t("ActionMenu.User")}
                </ActionButton>
              )
            }
            {
              imgInfo?.prev_img_ids && (
                <ActionButton variant='light' size='sm' onClick={navigateToBasePaintings} style={{ marginBottom: 0 }}>
                  <i className="bi bi-collection"></i>
                  {' '}{t("ActionMenu.Based works")}
                </ActionButton>
              )
            }
            <ActionButton variant='light' size='sm' onClick={handleLikeTrigger}>
              <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
              {' '}{likes}
            </ActionButton>
            <ActionButton variant='light' size='sm' onClick={() => setShowNewPaintingModal(true)} style={{ borderRight: 'none', borderTopRightRadius: 0 }}>
              <i className="bi bi-pencil"></i>
              {' '}{t("ActionMenu.Paint yours")}
            </ActionButton>
          </ButtonGroup>
        </Card.Body>
      </IntroCard>

      <NewPaintingModal isOpen={showNewPaintingModal} closeModal={() => setShowNewPaintingModal(false)} openCanvas={openCanvas} />
      <EditPaintingModal isOpen={showEditPaintingModal} closeModal={() => setShowEditPaintingModal(false)} openCanvas={openCanvas} imgInfo={imgInfo} />

    </MenuWrapper>
  )
}

export default ActionMenu;