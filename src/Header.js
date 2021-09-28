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

  useEffect(() => {
    console.log(user)
  }, [])

  return(
    <Navbar>
      <Container>
        <Navbar.Brand>{loc ? locations.find(l => l.id === loc)?.name : 'Campus as Canvas'}</Navbar.Brand>
        <Navbar.Collapse>
          <Nav className="me-auto"><Button className="btn btn-sm" variant="outline-secondary">戻る</Button></Nav>
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