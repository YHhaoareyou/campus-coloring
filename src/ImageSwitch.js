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

const SwitchButton = styled(Button)`
  background: rgba(255, 255, 255, 0.3);
  color: rgba(200, 200, 200);
  border: none;
  font-size: 36px;
  padding: 0px;
`;

function ImageSwitch({ switchPrev, switchNext }) {
  return(
    <React.Fragment>
      <LeftSwitchWrapper>
        <SwitchButton variant="light" onClick={switchPrev}><i class="bi bi-chevron-compact-left"></i></SwitchButton>
      </LeftSwitchWrapper>
      <RightSwitchWrapper>
        <SwitchButton variant="light" onClick={switchNext}><i class="bi bi-chevron-compact-right"></i></SwitchButton>
      </RightSwitchWrapper>
    </React.Fragment>
  )
}

export default ImageSwitch;