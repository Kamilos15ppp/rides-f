import React from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import { DarkBg, PageWrapper, Wrapper } from './MainTemplate.styles';

const MainTemplate = ({ children }) => {
  return (
    <Wrapper>
      <DarkBg>
        <Navigation />
        <PageWrapper>{children}</PageWrapper>
      </DarkBg>
    </Wrapper>
  );
};

export default MainTemplate;
