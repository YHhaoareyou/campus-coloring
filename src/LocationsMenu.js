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

// const Pin52 = styled(BasePin)`
//   top: 60px;
//   left: 210px;
// `;

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
//   left: 60px;
// `;

// const Pin62 = styled(BasePin)`
//   top: 20px;
//   left: 70px;
// `;

const Pin55 = styled(BasePin)`
  top: 50px;
  left: 310px;
`;

const locationComponentPairs = process.env.NODE_ENV === "development" ? [
  {loc: '51', Pin: Pin51},
  {loc: '51_60_top', Pin: Pin51_60},
  {loc: '60_61', Pin: Pin60_61},
  {loc: '55', Pin: Pin55},
  {loc: 'garden', Pin: PinGarden}
] : [
  {loc: '51', Pin: Pin51},
  {loc: '51_60_top', Pin: Pin51_60},
  {loc: '60_61', Pin: Pin60_61},
  {loc: '55', Pin: Pin55},
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
    <div style={{ paddingTop: '70px' }}>
      <h3>場所を選択</h3>
      {
        !currentCoor && <p><i className="bi bi-arrow-clockwise"></i> 位置情報取得中...</p>
      }
      {
        retrieveCoorFailed && <p style={{ color: 'red' }}>位置情報取得失敗。位置情報の取得を許可し、遮蔽物のない空間に移動して数秒待ってください。</p>
      }

      <MapContainer>
        {
          locationComponentPairs.map(({loc, Pin}) => 
            <Pin key={loc} onClick={() => setSelectedLoc(loc)} className='bi bi-geo-alt-fill' style={{ color: isCoorInRange(locations[loc].range) ? 'orange' : 'black' }} />
          )
        }
      </MapContainer>

      <div style={{ textAlign: 'left', padding: '20px' }}>
        <strong>説明</strong>
        <ul>
          <li>ピンをタッチすると、そこの景色が映った画像が表示されます</li>
          <li>ピンされた場所の近くに移動すると、ピンが黄色になり、タッチすると絵が見えます</li>
          <li>5秒ごとに位置情報を取得します</li>
        </ul>

        <strong>場所一覧</strong>
        <ul>
          <li><b>51号館</b>：北門寄りの空中通路からの視点</li>
          <li><b>55号館外</b>：外の廊下から、中庭向き；雨天OK</li>
          <li><b>51、60号館の間</b>：59号館側の地面通路からの視点</li>
          <li><b>60、61号館の間</b>：59号館側の空中通路からの視点；雨天OK</li>
        </ul>
      </div>


      <Modal centered show={selectedLoc !== ''} onHide={() => setSelectedLoc('')}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedLoc && locations[selectedLoc].name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          <p>{selectedLoc && locations[selectedLoc].description}</p>
          <img src={`/img/loc/${selectedLoc}.jpeg`} width='80%' alt="View of the location" />
          {
            selectedLoc && (isCoorInRange(locations[selectedLoc].range) || selectedLoc === 'garden')
              ? (
                <div>
                  <p>↑の景色にカメラを向けてください</p>
                  <Link to={'/' + selectedLoc}>
                    <Button variant="outline-primary">
                      絵を観る
                    </Button>
                  </Link>
                </div>
              )
              : (
                <div>
                  <p>この場所に移動し、数秒待つと絵が見えるよ</p>
                  <p>移動してもダメでしたら、画面を更新してください</p>
                </div>
              )
          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LocationsMenu;
