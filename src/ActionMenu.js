import { useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';

const MenuWrapper = styled(Container)`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f8f9fa;
  padding: 10px;
`

// Todo2: display based paintings
// Todo3: like
// Todo4: check a user's paintings in a loc

function ActionMenu({ openCanvas }) {
  const [showModal, setShowModal] = useState(false);

  return(
    <MenuWrapper>
      <Row>
        <Col xs={8}>
          <Card style={{ height: '100px', overflowY: 'scroll' }}>
            <Card.Body style={{ padding: '5px' }}>
              <Card.Title as='h6' style={{ margin: '5px' }}>Card Title</Card.Title>
              <Card.Text style={{ fontSize: '14px' }}>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={4}>
          <Row>
            <Col style={{ padding: 0 }}>
              <Button variant='light' size='sm' onClick={() => {}}>
                <i className="bi bi-person"></i>
                <br />
                User
              </Button>
            </Col>
            <Col style={{ padding: 0 }}>
              <Button variant='light' size='sm' onClick={() => {}}>
                <i className="bi bi-heart"></i>
                <br />
                5
              </Button>
            </Col>
          </Row>
          <Row>
            <Col style={{ padding: 0 }}>
              <Button variant='light' size='sm' onClick={() => {}}>
                <i className="bi bi-collection"></i>
                <br />
                前作へ
              </Button>
            </Col>
            <Col style={{ padding: 0 }}>
              <Button variant='light' size='sm' onClick={() => setShowModal(true)}>
                <i className="bi bi-pencil"></i>
                <br />
                描こう
              </Button>
            </Col>
          </Row>
          {/* <Button onClick={() => openCanvas({ isNew: false })}>ベースにして描こう</Button>
          <Button onClick={() => openCanvas({ isNew: true })}>新しく描こう</Button> */}
        </Col>
      </Row>

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