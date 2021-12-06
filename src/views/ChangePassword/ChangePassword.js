import React, { useState } from 'react';
import { Wrapper } from './ChangePassword.styles';
import ChangePasswordForm from 'components/molecules/ChangePasswordForm/ChangePasswordForm';
import { useAuth } from 'hooks/useAuth';

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, changePassword } = useAuth();
  const email = user.email;

  const onFinish = async ({
    old_password,
    password,
    password_confirmation,
  }) => {
    setIsLoading(true);
    const response = await changePassword({
      old_password,
      password,
      password_confirmation,
      email,
    });
    if (response) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <ChangePasswordForm onFinish={onFinish} isLoading={isLoading} />
    </Wrapper>
  );
};

export default ChangePassword;
