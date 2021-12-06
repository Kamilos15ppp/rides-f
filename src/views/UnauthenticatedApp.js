import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import LoginForm from 'components/molecules/LoginForm/LoginForm';
import { StyledBackground } from './UnauthenticatedApp.styles';
import { Spin } from 'antd';

const UnauthenticatedApp = () => {
  const [spin, setSpin] = useState(false);
  const auth = useAuth();
  const onFinish = async ({ email, password }) => {
    setSpin(true);
    const response = await auth.signIn({ email, password });
    if (!response) setSpin(false);
    else if (response) setSpin(true);
  };

  useEffect(() => {
    return () => setSpin(false);
  }, []);

  return (
    <Spin spinning={spin}>
      <StyledBackground />
      <LoginForm onFinish={onFinish} />
    </Spin>
  );
};

export default UnauthenticatedApp;
