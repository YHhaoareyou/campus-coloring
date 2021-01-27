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
    <Grid.Column width={8}>
      <Segment>
        <h4>{image.name}</h4>
        <p>{image.description}</p>
      </Segment>
    </Grid.Column>
    <Grid.Column width={2}>
      <Button as="div" labelPosition="right">
        <Button color="red">
          <Icon name="heart" />
        </Button>
        <Label as="a" basic color="red" pointing="left">
          1
        </Label>
      </Button>
    </Grid.Column>
    <Grid.Column width={3}>
      <Button color="orange" onClick={openCanvas} disabled>
        Add your painting on this one
      </Button>
    </Grid.Column>
    <Grid.Column width={3}>
      <Button color="green" onClick={openCanvas}>
        Create your new painting
      </Button>
    </Grid.Column>
  </FooterWrapper>
);

export default Footer;
