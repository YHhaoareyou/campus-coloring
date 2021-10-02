import styled from 'styled-components';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { login, logout, useUser } from './auth';
import { useEffect } from 'react';
import locations from './locations';
import { currentLocState } from './atoms';
import { useRecoilValue } from 'recoil';

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  width: 100vw;
  height: 50px;
  background-color: rgba(248, 249, 250, 0.5);
`

function Header() {
  const user = useUser();
  const loc = useRecoilValue(currentLocState);

  const handleLogin = () => {
    login().catch((error) => console.error(error));
  };

  const handleLogout = () => {
    logout().catch((error) => console.error(error));
  };

  return(
    <Navbar style={{ position: 'absolute', left: 0, top: 0, width: '100vw', background: 'rgba(255, 255, 255, 0.5)' }}>
      <Container>
        <Navbar.Brand>{loc ? locations[loc].name : 'Campus as Canvas'}</Navbar.Brand>
        <Navbar.Collapse>
          {loc ? <Nav className="me-auto">
            <Button className="btn btn-sm" variant="outline-secondary" onClick={() => window.location.href = '/'}>他の場所へ</Button>
            <span style={{ width: '10px' }}></span>
            <Button className="btn btn-sm" variant="outline-secondary" onClick={() => window.history.back()}>戻る</Button>
          </Nav> : <Nav className="me-auto"></Nav>}
          <Nav>
            <NavDropdown title={user?.displayName || "ログイン"}>
              {
                user
                  ? <NavDropdown.Item onClick={handleLogout}>ログアウト</NavDropdown.Item>
                  : <NavDropdown.Item onClick={handleLogin}>ログイン</NavDropdown.Item>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* {false && <Button onClick={() => window.history.back()}>←</Button>} */}
    </Navbar>
  )
}

export default Header;