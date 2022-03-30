import styled from 'styled-components';
import bg from 'assets/images/login-page1400.jpg';

export const StyledBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(40%);
`;
