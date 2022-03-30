import React, { useEffect, useState } from 'react';
import LoginForm from 'components/molecules/LoginForm/LoginForm';
import { StyledBackground } from './UnauthenticatedApp.styles';
import { message, Spin } from 'antd';
import { useLoginUserMutation } from 'store/api/user';
import { useDispatch } from 'react-redux';
import { saveUserInfo } from 'store/userSlice';

const UnauthenticatedApp = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const dispatch = useDispatch();
  const [loginUser, { isSuccess, isError }] = useLoginUserMutation();
  const onFinish = async ({ email, password }) => {
    setIsSpinning(true);
    const data = await loginUser({ email, password });
    if (!data.error) {
      dispatch(saveUserInfo(data.data));
      localStorage.setItem('przejazdykm_token', data.data.token);
    }
  };

  useEffect(() => {
    setIsSpinning(false);
    if (isSuccess) {
      message.success('Zalogowano poprawnie');
    }

    if (isError) {
      message.error('Niepoprawne dane');
    }
  }, [isSuccess, isError]);

  return (
    <Spin spinning={isSpinning}>
      <StyledBackground />
      <LoginForm onFinish={onFinish} />
    </Spin>
  );
};

export default UnauthenticatedApp;
