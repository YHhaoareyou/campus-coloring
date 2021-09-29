import { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import locations from './locations';

const Cards = styled(Row)`
  margin: 0px 10px;
`;

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

const Pin58 = styled(BasePin)`
  top: 20px;
  left: 70px;
`;

const Pin62 = styled(BasePin)`
  top: 20px;
  left: 60px;
`;

const locationComponentPairs = [
  {loc: 'garden', Comp: PinGarden},
  {loc: '51', Comp: Pin51},
  {loc: '52', Comp: Pin52},
  {loc: '51_60', Comp: Pin51_60},
  {loc: '60_61', Comp: Pin60_61},
  {loc: '58', Comp: Pin58}, {loc: '62', Comp: Pin62}
]

function LocationsMenu() {
  const [currentCoor, setCurrentCoor] = useState(null);
  const [selectedLoc, setSelectedLoc] = useState('');

  useEffect(() => {
    if (!currentCoor) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          setCurrentCoor(position.coords);
        },
        function(error) {
          alert("位置情報取得失敗。位置情報の取得を許可し、遮蔽物のない空間に移動してからリロードしてください。");
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
      {
        !currentCoor && <p><i class="bi bi-arrow-clockwise"></i> 位置情報取得中...</p>
      }
      <MapContainer>
        {
          locationComponentPairs.map(({loc, Comp}) => 
            <Comp onClick={() => setSelectedLoc(loc)} className='bi bi-geo-alt-fill' style={{ color: isCoorInRange(locations[loc].range) ? 'orange' : 'black' }} />
          )
        }
      </MapContainer>

      <Modal centered show={selectedLoc !== ''} onHide={() => setSelectedLoc('')}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedLoc && locations[selectedLoc].name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <img src='/logo512.png' width='100%' />
          {
            selectedLoc && isCoorInRange(locations[selectedLoc].range)
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
              : <p>ここに移動し、リロードすると絵が見えるよ</p>
          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LocationsMenu;
