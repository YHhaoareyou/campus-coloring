import { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import locations from './locations';
import { useTranslation } from "react-i18next";

const MapContainer = styled.div`
  position: relative;
  margin: 0px auto;
  width: 375px;
  height: 150px;
  background-image: url('/img/map.jpeg');
  background-size: contain;
`;

const BasePin = styled.i`
  position: absolute;
  font-size: 24px;
`;

const PinGarden = styled(BasePin)`
  top: 50px;
  left: 240px;
`;

const Pin51 = styled(BasePin)`
  top: 75px;
  left: 162px;
`;

const Pin51_60 = styled(BasePin)`
  top: 70px;
  left: 125px;
`;

const Pin60_61 = styled(BasePin)`
  top: 70px;
  left: 95px;
`;

const Pin55 = styled(BasePin)`
  top: 50px;
  left: 290px;
`;

const Pin54_55 = styled(BasePin)`
  top: 75px;
  left: 280px;
`;

const BaseDirection = styled.i`
  position: absolute;
  font-size: 18px;
`;

const DirGarden = styled(BaseDirection)`
  top: 55px;
  left: 230px;
`;

const Dir51 = styled(BaseDirection)`
  top: 80px;
  left: 150px;
`;

const Dir51_60 = styled(BaseDirection)`
  top: 55px;
  left: 128px;
`;

const Dir60_61 = styled(BaseDirection)`
  top: 55px;
  left: 98px;
`;

const Dir55 = styled(BaseDirection)`
  top: 55px;
  left: 280px;
`;

const Dir54_55 = styled(BaseDirection)`
  top: 98px;
  left: 283px;
`;

const locationComponentPairs = process.env.NODE_ENV === "development" ? [
  {loc: '51', Pin: Pin51, Dir: Dir51, direction: 'left'},
  {loc: '51_60_top', Pin: Pin51_60, Dir: Dir51_60, direction: 'up'},
  {loc: '60_61', Pin: Pin60_61, Dir: Dir60_61, direction: 'up'},
  {loc: '55', Pin: Pin55, Dir: Dir55, direction: 'left'},
  {loc: '54_55', Pin: Pin54_55, Dir: Dir54_55, direction: 'down'},
  {loc: 'garden', Pin: PinGarden, Dir: DirGarden, direction: 'left'}
] : [
  {loc: '51', Pin: Pin51, Dir: Dir51, direction: 'left'},
  {loc: '51_60_top', Pin: Pin51_60, Dir: Dir51_60, direction: 'up'},
  {loc: '60_61', Pin: Pin60_61, Dir: Dir60_61, direction: 'up'},
  {loc: '55', Pin: Pin55, Dir: Dir55, direction: 'left'},
  {loc: '54_55', Pin: Pin54_55, Dir: Dir54_55, direction: 'down'},
]

function LocationsMenu() {
  const { t, i18n } = useTranslation();
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
    <div style={{ paddingTop: '20px' }}>
      <h3>{t("LocationsMenu.Choose location")}</h3>
      {
        !currentCoor && <Alert variant="warning" style={{ margin: "1em" }}><i className="bi bi-arrow-clockwise"></i> {t("LocationsMenu.Retrieving location")}</Alert>
      }
      {
        retrieveCoorFailed && <Alert variant="danger" style={{ margin: "1em" }}>{t("LocationsMenu.Failed to retrieve")}</Alert>
      }

      <MapContainer>
        {
          locationComponentPairs.map(({loc, Pin, Dir, direction}) => (
            <span>
              <Pin key={"pin" + loc} onClick={() => setSelectedLoc(loc)} className='bi bi-geo-alt-fill' style={{ color: isCoorInRange(locations[loc].range) ? 'orange' : '#a52a2a' }} />
              <Dir key={"dir" + loc} onClick={() => setSelectedLoc(loc)} className={'bi bi-caret-' + direction + '-fill'} style={{ color: isCoorInRange(locations[loc].range) ? 'orange' : '#a52a2a' }} />
            </span>
          ))
        }
      </MapContainer>

      <Modal centered show={selectedLoc !== ''} onHide={() => setSelectedLoc('')}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedLoc && (i18n.language === "ja" ? locations[selectedLoc].nameJA : locations[selectedLoc].nameEN)}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', fontSize: '14px' }}>
          <p>{selectedLoc && (i18n.language === "ja" ? locations[selectedLoc].descriptionJA : locations[selectedLoc].descriptionEN)}</p>
          <img src={`/img/loc/${selectedLoc}.jpeg`} width='70%' alt="View of the location" />

          {
            selectedLoc && (isCoorInRange(locations[selectedLoc].range) || selectedLoc === 'garden')
              ? (
                <div style={{ marginTop: '1em' }}>
                  <Alert variant="success">{t("LocationsMenu.Point camera")}</Alert>
                  <Link to={'/' + selectedLoc}>
                    <Button variant="outline-primary">
                      {t("LocationsMenu.View graffiti")}
                    </Button>
                  </Link>
                </div>
              )
              : (
                <div style={{ marginTop: '1em' }}>
                  <Alert variant="warning" style={{ padding: '5px' }}>
                    {t("LocationsMenu.Move here and wait")}
                    <br />
                    {t("LocationsMenu.Please reload")}
                  </Alert>
                </div>
              )
          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default LocationsMenu;
