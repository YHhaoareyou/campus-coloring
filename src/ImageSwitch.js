import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import React from 'react';

const LeftSwitchWrapper = styled.div`
  position: absolute;
  top: 50vh;
  left: 0;
`

const RightSwitchWrapper = styled.div`
  position: absolute;
  top: 50vh;
  right: 0;
`

function ImageSwitch({ switchPrev, switchNext }) {
  return(
    <React.Fragment>
      <LeftSwitchWrapper>
        <Button onClick={switchPrev}>＜</Button>
      </LeftSwitchWrapper>
      <RightSwitchWrapper>
        <Button onClick={switchNext}>＞</Button>
      </RightSwitchWrapper>
    </React.Fragment>
  )
}

export default ImageSwitch;