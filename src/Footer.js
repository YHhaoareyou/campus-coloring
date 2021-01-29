import { Button, Grid, Segment } from "semantic-ui-react";
import styled from "styled-components";
import LikeButton from "./LikeButton";

const FooterWrapper = styled(Grid)`
  position: absolute;
  left: 0;
  bottom: 0%;
  width: 100%;
  height: 15%;
`;

const Footer = ({ location, image, openCanvas, db }) => (
  <FooterWrapper>
    <Grid.Column width={8} style={{ padding: "1rem" }}>
      <Segment>
        <h4>{image.name}</h4>
        <p>{image.description}</p>
      </Segment>
    </Grid.Column>
    <Grid.Column width={2} style={{ padding: "1rem 0px" }}>
      <LikeButton location={location} image={image} db={db} />
    </Grid.Column>
    <Grid.Column width={6} style={{ padding: "1rem" }}>
      <Button
        color="green"
        onClick={openCanvas}
        style={{ padding: "1rem 0.2rem", width: "100%" }}
      >
        Create new
      </Button>
      <Button
        color="orange"
        onClick={openCanvas}
        style={{ padding: "1rem 0.2rem", width: "100%" }}
      >
        Paint on this
      </Button>
    </Grid.Column>
  </FooterWrapper>
);

export default Footer;
