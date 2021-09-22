import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  width: 100vw;
  height: 50px;
  background-color: rgba(248, 249, 250, 0.5);
`

function Header({ location, isPrevMode, prevModeTrigger }) {
  return(
    <HeaderWrapper>
      <h2 style={{ textAlign: 'center' }}>{location}</h2>
      {isPrevMode && <Button onClick={prevModeTrigger}>←</Button>}
    </HeaderWrapper>
  )
}

export default Header;