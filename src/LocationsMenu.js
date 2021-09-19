import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './logo.svg';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { currentLocState } from './atoms';
import locations from './locations';

const Cards = styled(Row)`
  margin: 0px 10px;
`;

function LocationsMenu() {
  const setCurrentLoc = useSetRecoilState(currentLocState);
  const [currentCoor, setCurrentCoor] = useState(null);

  useEffect(() => {
    if (!currentCoor) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setCurrentCoor(position.coords);
        },
        function(error) {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    }
  }, [])

  const isCoorInRange = (LocCoorRange) =>
    currentCoor && LocCoorRange
      && (currentCoor.latitude >= LocCoorRange.minLat)
      && (currentCoor.latitude <= LocCoorRange.maxLat)
      && (currentCoor.longitude >= LocCoorRange.minLong)
      && (currentCoor.longitude <= LocCoorRange.maxLong);

  return (
    <div >
      <h3>場所を選択</h3>
      <div>
        <Cards xs={2} className="g-4">
          {currentCoor && locations.map(loc => (
            <Col key={loc.id}>
              <Card onClick={() => setCurrentLoc(loc.id)}>
                <Card.Img variant="top" src={logo} style={{ height: '100px' }} />
                <Card.Body>
                  <Card.Title>{loc.name}</Card.Title>
                  <Card.Text>{isCoorInRange(loc.range) ? 'yes' : 'no'}</Card.Text>
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
