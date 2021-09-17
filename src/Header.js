import styled from 'styled-components';

const HeaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  width: 100vw;
  height: 50px;
  background-color: #ECECEC;
`

function Header({ location }) {
  return(
    <HeaderWrapper>
      <p style={{ textAlign: 'center' }}>{location}</p>
    </HeaderWrapper>
  )
}

export default Header;