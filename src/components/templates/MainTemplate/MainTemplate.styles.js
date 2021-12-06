import styled from 'styled-components';
import bg from 'assets/images/display-page1920.jpg';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-image: url(${bg});
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const DarkBg = styled.div`
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
`;

export const PageWrapper = styled.div`
  padding-right: 2rem;
`;
