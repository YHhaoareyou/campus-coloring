import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './logo.svg';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { currentLocState } from './atoms';

const Cards = styled(Row)`
  margin: 0px 10px;
`;

function LocationsMenu() {
  const setCurrentLoc = useSetRecoilState(currentLocState);
  return (
    <div >
      <h3>場所を選択</h3>
      <div>
        <Cards xs={2} className="g-4">
          {['Garden', 'Bldg 63', 'Bldg 61'].map((loc, i) => (
            <Col key={i}>
              <Card onClick={() => setCurrentLoc(loc)}>
                <Card.Img variant="top" src={logo} style={{ height: '100px' }} />
                <Card.Body>
                  <Card.Title>{loc}</Card.Title>
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
