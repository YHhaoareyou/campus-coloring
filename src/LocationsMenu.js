import { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import locations from './locations';

const MapContainer = styled.div`
  position: relative;
  margin: 0px auto;
  width: 400px;
  height: 160px;
  background-image: url('/img/map.jpeg');
  background-size: contain;
`;

const BasePin = styled.i`
  position: absolute;
  font-size: 24px;
`;

const PinGarden = styled(BasePin)`
top: 50px;
left: 250px;
`;

const Pin51 = styled(BasePin)`
  top: -10px;
  left: 170px;
`;

const Pin52 = styled(BasePin)`
  top: 60px;
  left: 210px;
`;

const Pin51_60 = styled(BasePin)`
  top: 70px;
  left: 135px;
`;

const Pin60_61 = styled(BasePin)`
  top: 70px;
  left: 105px;
`;

// const Pin58 = styled(BasePin)`
//   top: 20px;
//   left: 70px;
// `;

const Pin62 = styled(BasePin)`
  top: 20px;
  left: 60px;
`;

const locationComponentPairs = process.env.NODE_ENV === "development" ? [
  {loc: '51', Pin: Pin51},
  {loc: '52', Pin: Pin52},
  {loc: '51_60', Pin: Pin51_60},
  {loc: '60_61', Pin: Pin60_61},
  {loc: '62', Pin: Pin62},
  {loc: 'garden', Pin: PinGarden}
] : [
  {loc: '51', Pin: Pin51},
  {loc: '52', Pin: Pin52},
  {loc: '51_60', Pin: Pin51_60},
  {loc: '60_61', Pin: Pin60_61},
  {loc: '62', Pin: Pin62}
]

function LocationsMenu() {
  const [currentCoor, setCurrentCoor] = useState(null);
  const [selectedLoc, setSelectedLoc] = useState('');
  const [retrieveCoorFailed, setRetrieveCoorFailed] = useState(false);

  const handleRetrievingCoor = () => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        setCurrentCoor(position.coords);
        if (retrieveCoorFailed) setRetrieveCoorFailed(false);
      },
      function(error) {
        setRetrieveCoorFailed(true);
      }
    );
  }

  useEffect(() => {
    handleRetrievingCoor();
    var retrieveCoorTimer = setInterval(handleRetrievingCoor, 5000);
    return () => clearInterval(retrieveCoorTimer);
  }, [])

  const isCoorInRange = (LocCoorRange) =>
    currentCoor && LocCoorRange
      && (currentCoor.latitude >= LocCoorRange.minLat)
      && (currentCoor.latitude <= LocCoorRange.maxLat)
      && (currentCoor.longitude >= LocCoorRange.minLong)
      && (currentCoor.longitude <= LocCoorRange.maxLong);

  return (
    <div style={{ paddingTop: '100px' }}>
      <h3>場所を選択</h3>
      {
        !currentCoor && <p><i className="bi bi-arrow-clockwise"></i> 位置情報取得中...</p>
      }
      {
        retrieveCoorFailed && <p>位置情報取得失敗。位置情報の取得を許可し、遮蔽物のない空間に移動して数秒待ってください。</p>
      }
      <MapContainer>
        {
          locationComponentPairs.map(({loc, Pin}) => 
            <Pin key={loc} onClick={() => setSelectedLoc(loc)} className='bi bi-geo-alt-fill' style={{ color: isCoorInRange(locations[loc].range) ? 'orange' : 'black' }} />
          )
        }
      </MapContainer>

      <Modal centered show={selectedLoc !== ''} onHide={() => setSelectedLoc('')}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedLoc && locations[selectedLoc].name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <img src={`/img/loc/${selectedLoc}.jpeg`} width='100%' alt="View of the location" />
          {
            selectedLoc && (isCoorInRange(locations[selectedLoc].range) || selectedLoc === 'garden')
              ? (
                <div>
                  <p>↑の景色に向いてください</p>
                  <Link to={'/' + selectedLoc}>
                    <Button variant="outline-primary">
                      絵を観る
                    </Button>
                  </Link>
                </div>
              )
              : <p>この場所に移動し、数秒待つと絵が見えるよ</p>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LocationsMenu;
