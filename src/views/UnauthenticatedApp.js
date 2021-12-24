import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import LoginForm from 'components/molecules/LoginForm/LoginForm';
import { StyledBackground } from './UnauthenticatedApp.styles';
import { Spin } from 'antd';

const UnauthenticatedApp = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const auth = useAuth();
  const onFinish = async ({ email, password }) => {
    setIsSpinning(true);
    const response = await auth.signIn({ email, password });
    if (!response) setIsSpinning(false);
    else if (response) setIsSpinning(true);
  };

  useEffect(() => {
    return () => setIsSpinning(false);
  }, []);

  return (
    <Spin spinning={isSpinning}>
      <StyledBackground />
      <LoginForm onFinish={onFinish} />
    </Spin>
  );
};

export default UnauthenticatedApp;
