import React, { useState } from 'react';
import { useAuth } from 'hooks/useAuth';
import { FormWrapper } from 'components/atoms/FormWrapper/FormWrapper';
import ChangePasswordForm from 'components/molecules/ChangePasswordForm/ChangePasswordForm';

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
    <FormWrapper>
      <ChangePasswordForm onFinish={onFinish} isLoading={isLoading} />
    </FormWrapper>
  );
};

export default ChangePassword;
