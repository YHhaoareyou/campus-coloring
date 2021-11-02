import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { login, logout, useUser } from './auth';
import locations from './locations';
import { currentLocState } from './atoms';
import { useRecoilValue } from 'recoil';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { getDatabase, ref, get, set } from "firebase/database";
import notificationMap from './notificationMap';

function Header() {
  const user = useUser();
  const loc = useRecoilValue(currentLocState);
  const [title, setTitle] = useState('Campus as Canvas');
  const [notifications, setNotifications] = useState({});

  const handleLogin = () => {
    login().catch((error) => console.error(error));
  };

  const handleLogout = () => {
    logout().catch((error) => console.error(error));
  };

  const navigateToMyPaintings = () => {
    window.location.href = window.location.origin + window.location.pathname + '?mode=user&uid=' + user.uid;
  }

  const navigateToPaintingFromNotification = (location, nid) => {
    set(ref(getDatabase(), 'users/' + user.uid + '/notifications/' + nid), null)
      .then(snap => window.location.href = window.location.origin + '/' + location + '?pid=' + nid)
      .catch(err => alert(err));
  }

  const clearNotifications = () => {
    set(ref(getDatabase(), 'users/' + user.uid + '/notifications/'), null);
    setNotifications({});
  }

  useEffect(() => {
    const db = getDatabase();
    const qs = queryString.parse(window.location.search);
    if (qs.mode && qs.mode === 'base') {
      get(ref(db, 'img_info/' + loc + '/' + qs.bid + '/title')).then(snap => {
        setTitle('「' + snap.val() + '」のベース作品');
      })
    } else if (qs.mode && qs.mode === 'user') {
      get(ref(db, 'users/' + qs.uid + '/name')).then(snap => {
        setTitle(snap.val() + 'の作品');
      })
    } else {
      if (loc) setTitle(locations[loc].name)
    }

    user && get(ref(db, 'users/' + user.uid + '/notifications')).then(snap => {
      setNotifications(snap.val());
    })
  }, [loc])

  return(
    <Navbar style={{ position: 'absolute', left: 0, top: 0, width: '100vw', background: 'rgba(255, 255, 255, 0.5)' }}>
      <Container>
        {loc && <Navbar.Collapse>
          <Nav className="me-auto">
            <Button className="btn btn-sm" variant="outline-secondary" onClick={() => window.location.href = '/'}>
              <i className="bi bi-house"></i>
            </Button>
            <span style={{ width: '10px' }}></span>
            <Button className="btn btn-sm" variant="outline-secondary" onClick={() => window.history.back()}>
              <i className="bi bi-chevron-compact-left"></i>
            </Button>
          </Nav>
        </Navbar.Collapse>}

        <Navbar.Brand>{title}</Navbar.Brand>

        <Navbar.Collapse>
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown title={<span><i className="bi bi-bell"></i>{notifications && Object.keys(notifications).length}</span>} drop={'start'}>
              <Button variant="outline-primary" size="sm" style={{ marginLeft: '10px' }} onClick={clearNotifications}>クリア</Button>
              {
                notifications && Object.keys(notifications).map(nid => (
                  <NavDropdown.Item key={nid} disabled={!loc || loc !== notifications[nid].loc} onClick={() => navigateToPaintingFromNotification(loc, nid)}>
                    {notifications[nid].username + notificationMap[notifications[nid].type]}
                    <br />
                    <small>{loc && loc === notifications[nid].loc ? 'クリックして見にいく' : 'この場所のARモードに入ったら見れるよ'}</small>
                  </NavDropdown.Item>
                ))
              }
            </NavDropdown>
            <NavDropdown title={<i className="bi bi-person-circle"></i>} drop={'start'}>
              <p style={{ textAlign: 'center' }}>{user?.displayName}</p>
              {
                user
                  ? <NavDropdown.Item onClick={handleLogout}>ログアウト</NavDropdown.Item>
                  : <NavDropdown.Item onClick={handleLogin}>ログイン</NavDropdown.Item>
              }
              {loc && <NavDropdown.Item onClick={navigateToMyPaintings}>自分の絵を見る：<br /> {locations[loc].name}</NavDropdown.Item>}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;