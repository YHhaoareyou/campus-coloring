import { Button, Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";

const ImageSwitchWrapper = styled(Grid)`
  position: absolute;
  left: 0;
  top: 45%;
  width: 100%;
  height: 5%;
`;

const ImageSwitch = ({ switchToPrev, switchToNext }) => (
  <ImageSwitchWrapper>
    <Grid.Column width={1}>
      <Button onClick={switchToPrev}>
        <Icon name="angle left" />
      </Button>
    </Grid.Column>
    <Grid.Column width={14}></Grid.Column>
    <Grid.Column width={1}>
      <Button onClick={switchToNext}>
        <Icon name="angle right" />
      </Button>
    </Grid.Column>
  </ImageSwitchWrapper>
);

export default ImageSwitch;
