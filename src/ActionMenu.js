import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const MenuWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`

// Todo2: display based paintings
// Todo3: like
// Todo4: check a user's paintings in a loc

function ActionMenu({ openCanvas }) {
  return(
    <MenuWrapper>
      <Button onClick={() => {}}>いいね！</Button>
      <Button onClick={() => {}}>ベースの作品を見よう</Button>
      <Button onClick={() => openCanvas({ isNew: false })}>ベースにして描こう</Button>
      <Button onClick={() => openCanvas({ isNew: true })}>新しく描こう</Button>
    </MenuWrapper>
  )
}

export default ActionMenu;