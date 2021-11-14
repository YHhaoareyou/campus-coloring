import LocationsMenu from './LocationsMenu';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();

  return (
    <div style={{ height: "calc(100vh - 56px)", overflowY: "auto", marginTop: "56px" }}>
      <LocationsMenu />

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>{t("Home.Explanation")}</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush" style={{ textAlign: 'left' }}>
              <ListGroup.Item>{t("Home.Explanation 1")}</ListGroup.Item>
              <ListGroup.Item>{t("Home.Explanation 2")}</ListGroup.Item>
              <ListGroup.Item>{t("Home.Explanation 3")}</ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>{t("Home.Locations list")}</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered>
              <thead>
                <tr><th>{t("Home.Location")}</th><th>{t("Home.Viewpoint")}</th><th>{t("Home.Rain")}</th></tr>
              </thead>
              <tbody>
                <tr><td>{t("Home.55")}</td><td>{t("Home.55 viewpoint")}</td><td>◯</td></tr>
                <tr><td>{t("Home.54-55")}</td><td>{t("Home.54-55 viewpoint")}</td><td>×</td></tr>
                <tr><td>{t("Home.51")}</td><td>{t("Home.51 viewpoint")}</td><td>◯</td></tr>
                <tr><td>{t("Home.51-60")}</td><td>{t("Home.51-60 viewpoint")}</td><td>◯</td></tr>
                <tr><td>{t("Home.60-61")}</td><td>{t("Home.60-61 viewpoint")}</td><td>×</td></tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Home;
