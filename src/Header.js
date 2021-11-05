import { Navbar, Nav, NavDropdown, Container, Button, Row, Col } from 'react-bootstrap';
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
    <Navbar style={{ position: 'absolute', left: 0, top: 0, width: '100vw', background: 'rgba(0, 0, 0, 0.3)' }}>
      <Container>
        {loc && <Navbar.Collapse>
          <Nav className="me-auto">
            <Button style={{ color: '#fff', borderColor: '#fff' }} className="btn btn-sm" variant="outline-secondary" onClick={() => window.location.href = '/'}>
              <i className="bi bi-house"></i>
            </Button>
            <span style={{ width: '10px' }}></span>
            <Button style={{ color: '#fff', borderColor: '#fff' }} className="btn btn-sm" variant="outline-secondary" onClick={() => window.history.back()}>
              <i className="bi bi-chevron-compact-left"></i>
            </Button>
          </Nav>
        </Navbar.Collapse>}

        <Navbar.Brand style={{ color: '#fff', margin: '0px 5px' }}>{title}</Navbar.Brand>

        <Navbar.Collapse>
          <Nav className="me-auto"></Nav>
          <Nav>
            <NavDropdown title={<span style={{ color: '#fff' }}><i className="bi bi-person-circle"></i></span>} drop={'start'}>
              <p style={{ textAlign: 'center', marginBottom: '5px' }}>{user?.displayName}</p>
              {
                user
                  ? <NavDropdown.Item style={{ borderTop: '1px solid #ccc' }} onClick={handleLogout}><i className='bi bi-box-arrow-right' /> ログアウト</NavDropdown.Item>
                  : <NavDropdown.Item style={{ borderTop: '1px solid #ccc' }} onClick={handleLogin}><i className='bi bi-box-arrow-in-right' /> ログイン</NavDropdown.Item>
              }
              {loc && <NavDropdown.Item style={{ borderTop: '1px solid #ccc' }} onClick={navigateToMyPaintings}><i className='bi bi-images' /> 自分の絵を見る</NavDropdown.Item>}
            </NavDropdown>
            <NavDropdown
              title={<span style={{ color: '#fff' }}><i className="bi bi-bell"></i>{notifications && Object.keys(notifications).length}</span>}
              drop={'start'}
            >
              <div style={{ padding: '0px 10px' }}>
                <i className="bi bi-bell" />
                <Button variant="outline-secondary" size="sm" style={{ padding: '0px 5px', margin: '0px 0px 5px 10px', border: '1px solid #ccc', color: '#aaa', float: 'right' }} onClick={clearNotifications}>クリア</Button>
              </div>
              {
                notifications && Object.keys(notifications).map(nid => (
                  <NavDropdown.Item
                    style={{ width: '300px', padding: 0, borderTop: '1px solid #ccc' }}
                    key={nid}
                    disabled={!loc || loc !== notifications[nid].loc}
                    onClick={() => navigateToPaintingFromNotification(loc, nid)}
                  >
                    <Row style={{ width: '100%', margin: 0, padding: '5px 0px' }}>
                      <Col xs={1}>
                        <div style={{ display: 'flex' }}>
                          {notifications[nid].type === 0 && <i style={{ color: 'orange' }} className='bi bi-brush' />}
                          {notifications[nid].type === 1 && <i style={{ color: 'red', paddingTop: '12px' }} className='bi bi-heart' />}
                        </div>
                      </Col>
                      <Col xs={11}>
                        <small style={{ margin: 0, whiteSpace: 'normal' }}>
                          {' '}{notifications[nid].username + notificationMap[notifications[nid].type]}
                        </small>
                        <br />
                        <small style={{ color: '#aaa' }}>{loc && loc === notifications[nid].loc ? 'クリックして見にいく' : 'この場所のARモードに入ったら見れるよ'}</small>
                      </Col>
                    </Row>
                  </NavDropdown.Item>
                ))
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;