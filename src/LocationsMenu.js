import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './logo.svg';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { currentLocState } from './atoms';
import { getDatabase, ref, get } from "firebase/database";

const Cards = styled(Row)`
  margin: 0px 10px;
`;

function LocationsMenu() {
  const setCurrentLoc = useSetRecoilState(currentLocState);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const db = getDatabase();
    get(ref(db, 'img_locs')).then(snap => {
      if(snap.exists()){
        setLocations(snap.val());
      }
    }).catch(err => console.error(err));
  });

  return (
    <div >
      <h3>場所を選択</h3>
      <div>
        <Cards xs={2} className="g-4">
          {Object.keys(locations).map((locKey, i) => (
            <Col key={i}>
              <Card onClick={() => setCurrentLoc(locKey)}>
                <Card.Img variant="top" src={logo} style={{ height: '100px' }} />
                <Card.Body>
                  <Card.Title>{locations[locKey]}</Card.Title>
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
