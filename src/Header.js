import { Navbar, Nav, NavDropdown, Container, Button, Row, Col } from 'react-bootstrap';
import { login, logout, useUser } from './auth';
import locations from './locations';
import { isRemoteState, currentLocState } from './atoms';
import { useRecoilValue } from 'recoil';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { getDatabase, ref, get, set } from "firebase/database";
import notificationMap from './notificationMap';
import { useTranslation } from "react-i18next";

function Header() {
  const user = useUser();
  const isRemote = useRecoilValue(isRemoteState);
  const loc = useRecoilValue(currentLocState);
  const [title, setTitle] = useState('Campus as Canvas');
  const [notifications, setNotifications] = useState({});
  const { t, i18n } = useTranslation();

  const handleLogin = () => {
    login().catch((error) => console.error(error));
  };

  const handleLogout = () => {
    logout().catch((error) => console.error(error));
  };

  const navigateToMyGraffitis = () => {
    window.location.href = window.location.origin + window.location.pathname + '?mode=user&uid=' + user.uid;
  }

  const navigateToGraffitiFromNotification = (location, nid) => {
    set(ref(getDatabase(), (isRemote ? "remote/" : "") + 'users/' + user.uid + '/notifications/' + nid), null)
      .then(snap => window.location.href = window.location.origin + '/' + location + '?pid=' + nid)
      .catch(err => alert(err));
  }

  const clearNotifications = () => {
    set(ref(getDatabase(), (isRemote ? "remote/" : "") + 'users/' + user.uid + '/notifications/'), null);
    setNotifications({});
  }

  useEffect(() => {
    const db = getDatabase();
    const qs = queryString.parse(window.location.search);
    if (qs.mode && qs.mode === 'base') {
      get(ref(db, (isRemote ? "remote/" : "") + 'img_info/' + loc + '/' + qs.bid + '/title')).then(snap => {
        setTitle('「' + snap.val() + '」のベース作品');
      })
    } else if (qs.mode && qs.mode === 'user') {
      get(ref(db, (isRemote ? "remote/" : "") + 'users/' + qs.uid + '/name')).then(snap => {
        setTitle(snap.val() + 'の作品');
      })
    } else {
      if (loc) setTitle(locations[loc].name)
    }

    user && get(ref(db, (isRemote ? "remote/" : "") + 'users/' + user.uid + '/notifications')).then(snap => {
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
            <NavDropdown title={<span style={{ color: '#fff' }}><i className="bi bi-translate"></i></span>} drop={'start'}>
              <NavDropdown.Item onClick={() => i18n.changeLanguage('ja')}>日本語</NavDropdown.Item>
              <NavDropdown.Item onClick={() => i18n.changeLanguage('en')}>English</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title={<span style={{ color: '#fff' }}><i className="bi bi-person-circle"></i></span>} drop={'start'}>
              <p style={{ textAlign: 'center', marginBottom: '5px' }}>{user?.displayName}</p>
              {
                user
                  ? <NavDropdown.Item style={{ borderTop: '1px solid #ccc' }} onClick={handleLogout}><i className='bi bi-box-arrow-right' /> {t("Header.User.Sign out")}</NavDropdown.Item>
                  : <NavDropdown.Item style={{ borderTop: '1px solid #ccc' }} onClick={handleLogin}><i className='bi bi-box-arrow-in-right' /> {t("Header.User.Sign in")}</NavDropdown.Item>
              }
              {loc && <NavDropdown.Item style={{ borderTop: '1px solid #ccc' }} onClick={navigateToMyGraffitis}><i className='bi bi-images' /> {t("Header.User.Check my graffiti")}</NavDropdown.Item>}
            </NavDropdown>

            <NavDropdown
              title={
                <span style={{ color: notifications && Object.keys(notifications).length ? 'yellow' : '#fff', fontWeight: notifications && Object.keys(notifications).length ? 'bold' : 'normal' }}>
                  <i className="bi bi-bell"></i>{notifications && Object.keys(notifications).length}
                </span>
              }
              drop={'start'}
            >
              <div style={{ padding: '0px 10px' }}>
                <i className="bi bi-bell" />
                <Button variant="outline-secondary" size="sm" style={{ padding: '0px 5px', margin: '0px 0px 5px 10px', border: '1px solid #ccc', color: '#aaa', float: 'right' }} onClick={clearNotifications}>{t("Header.Notifications.Clear")}</Button>
              </div>
              {
                notifications && Object.keys(notifications).map(nid => (
                  <NavDropdown.Item
                    style={{ width: '300px', padding: 0, borderTop: '1px solid #ccc' }}
                    key={nid}
                    disabled={!loc || loc !== notifications[nid].loc}
                    onClick={() => navigateToGraffitiFromNotification(loc, nid)}
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
                          {' '}
                          {
                            notifications[nid].username && (
                              i18n.language === "ja"
                                ? notifications[nid].username
                                : notifications[nid].username?.replace("と他の", " and other ")?.split("")?.reverse()?.join("")?.replace("人", "sresu ")?.split("")?.reverse()?.join("")
                            )
                              + t("Header.Notifications." + notificationMap[notifications[nid].type])
                          }
                        </small>
                        <br />
                        <small style={{ color: '#aaa' }}>{loc && loc === notifications[nid].loc ? t("Header.Notifications.Click to check") : t("Header.Notifications.Check in AR")}</small>
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