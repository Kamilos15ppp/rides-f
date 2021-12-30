import React, { useEffect, useState } from 'react';
import Navigation from 'components/organisms/Navigation/Navigation';
import { DarkBg, PageWrapper, Wrapper } from './MainTemplate.styles';
import {
  ADD_RIDE,
  BUSES,
  OTHERS,
  RANKING,
  RIDES,
  STATEMENT,
  TRAMS,
} from './PathConstance';
import image1 from 'assets/images/rides-page1400.jpg';
import image2 from 'assets/images/add-ride-page1400.jpg';
import image3 from 'assets/images/buses-page1400.jpg';
import image4 from 'assets/images/trams-page1400.jpg';
import image5 from 'assets/images/others-page1400.jpg';
import image6 from 'assets/images/ranking-page1400.jpg';
import image7 from 'assets/images/statement-page1400.jpg';

const MainTemplate = ({ urlPath, children }) => {
  const [background, setBackground] = useState(null);
  useEffect(() => {
    switch (urlPath) {
      case RIDES:
        setBackground(image1);
        break;
      case ADD_RIDE:
        setBackground(image2);
        break;
      case BUSES:
        setBackground(image3);
        break;
      case TRAMS:
        setBackground(image4);
        break;
      case OTHERS:
        setBackground(image5);
        break;
      case RANKING:
        setBackground(image6);
        break;
      case STATEMENT:
        setBackground(image7);
        break;
      default:
        setBackground(image2);
    }
  }, [urlPath]);

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <DarkBg>
        <Navigation />
        <PageWrapper>{children}</PageWrapper>
      </DarkBg>
    </Wrapper>
  );
};

export default MainTemplate;
