import { Button, Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";

const ImageSwitchWrapper = styled(Grid)`
  position: absolute;
  left: 0;
  top: 45%;
  width: 95%;
  height: 5%;
`;

const ImageSwitch = ({ switchToPrev, switchToNext }) => (
  <ImageSwitchWrapper>
    <Grid.Column width={1}>
      <Button icon="angle left" onClick={switchToPrev} circular />
    </Grid.Column>
    <Grid.Column width={13}></Grid.Column>
    <Grid.Column width={1}>
      <Button icon="angle right" onClick={switchToNext} circular />
    </Grid.Column>
  </ImageSwitchWrapper>
);

export default ImageSwitch;
