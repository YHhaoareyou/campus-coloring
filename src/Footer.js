import { Button, Grid, Segment, Icon, Label } from "semantic-ui-react";
import styled from "styled-components";

const FooterWrapper = styled(Grid)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 15%;
`;

const Footer = ({ image, openCanvas }) => (
  <FooterWrapper>
    <Grid.Column width={8} style={{ padding: "1rem" }}>
      <Segment>
        <h4>{image.name}</h4>
        <p>{image.description}</p>
      </Segment>
    </Grid.Column>
    <Grid.Column width={2} style={{ padding: "1rem 0px" }}>
      <Button
        color="red"
        style={{ marginTop: "1.5rem", padding: "0.8rem 0.3rem 0.6rem 1rem" }}
      >
        <Icon name="heart" />
        <Label style={{ top: "1rem" }} floating>
          1
        </Label>
      </Button>
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
        disabled
        style={{ padding: "1rem 0.2rem", width: "100%" }}
      >
        Paint on this
      </Button>
    </Grid.Column>
  </FooterWrapper>
);

export default Footer;
