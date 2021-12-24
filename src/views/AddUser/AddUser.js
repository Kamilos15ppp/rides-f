import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormWrapper } from 'components/atoms/FormWrapper/FormWrapper';
import UsersForm from 'components/molecules/UsersForm/UsersForm';
import { useAddUserMutation } from 'store';
import { message } from 'antd';

const AddUser = () => {
  const [addUser, rest] = useAddUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const { isSuccess, isError } = rest;
    if (isSuccess) {
      message.success('Dodano użytkownika');
      navigate('/users-management');
    }
    if (isError) {
      message.error('Sprawdź poprawność danych');
    }
  }, [rest.isSuccess, rest.isError]);

  const handleAddUser = ({
    name,
    email,
    password,
    password_confirmation,
    is_admin,
  }) => {
    addUser({ name, email, password, password_confirmation, is_admin });
  };

  return (
    <FormWrapper>
      <UsersForm onFinish={handleAddUser} isLoading={rest.isLoading} />
    </FormWrapper>
  );
};

export default AddUser;
