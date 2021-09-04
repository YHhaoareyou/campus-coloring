import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const MenuWrapper = styled.div`
  position: absolute;
  bottom: 0;
`

function ActionMenu({ openCanvas, closeCanvas }) {
  return(
    <MenuWrapper>
      <Button onClick={() => {}}>いいね！</Button>
      <Button onClick={() => {}}>ベースの作品を見よう</Button>
      <Button onClick={openCanvas}>ベースにして描こう</Button>
      <Button onClick={openCanvas}>新しく描こう</Button>
      <Button onClick={closeCanvas}>やめる</Button>
    </MenuWrapper>
  )
}

export default ActionMenu;