import React from 'react';
import { Wrapper } from './LoadingIndicator.styles';
import { Spin } from 'antd';

const LoadingIndicator = () => {
  return (
    <Wrapper>
      <Spin />
    </Wrapper>
  );
};

export default LoadingIndicator;
