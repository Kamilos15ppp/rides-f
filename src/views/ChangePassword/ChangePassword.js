import React, { useState } from 'react';
import { FormWrapper } from 'components/atoms/FormWrapper/FormWrapper';
import ChangePasswordForm from 'components/molecules/ChangePasswordForm/ChangePasswordForm';
import { useSelector } from 'react-redux';
import { useChangeUserPasswordMutation } from '../../store/api/user';
import { message } from 'antd';

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [changeUserPassword, isSuccess] = useChangeUserPasswordMutation();
  const email = useSelector((state) => state.user.email);

  const onFinish = async ({
    old_password,
    password,
    password_confirmation,
  }) => {
    setIsLoading(true);
    changeUserPassword({
      old_password,
      password,
      password_confirmation,
      email,
    });
    if (isSuccess) {
      message.success('Hasło zostało zmienione poprawnie');
      setIsLoading(false);
    } else {
      message.error('Błąd podczas zmiany hasła');
    }
  };

  return (
    <FormWrapper>
      <ChangePasswordForm onFinish={onFinish} isLoading={isLoading} />
    </FormWrapper>
  );
};

export default ChangePassword;
