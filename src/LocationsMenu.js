import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './logo.svg';
import styled from 'styled-components';

const Cards = styled(Row)`
  margin: 0px 10px;
`;

function LocationsMenu() {
  return (
    <div >
      <h3>場所を選択</h3>
      <div>
        <Cards xs={2} className="g-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Col>
              <Card>
                <Card.Img variant="top" src={logo} style={{ height: '100px' }} />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Cards>
      </div>
    </div>
  );
}

export default LocationsMenu;
