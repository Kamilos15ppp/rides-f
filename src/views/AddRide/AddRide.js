import React, { useEffect } from 'react';
import { FormWrapper } from 'components/atoms/FormWrapper/FormWrapper';
import RidesForm from 'components/molecules/RidesForm/RidesForm';
import { useAddRideMutation } from 'store';
import { message } from 'antd';

const AddRide = () => {
  const [addRide, rest] = useAddRideMutation();

  useEffect(() => {
    const { isSuccess, isError } = rest;
    if (isSuccess) {
      message.success('Dodano przejazd');
    }
    if (isError) {
      message.error('Błąd podczas dodawania przejazdu');
    }
  }, [rest.isSuccess, rest.isError]);

  const handleAddRide = ({ tabor, line, direction, first, last }) => {
    addRide({ tabor, line, direction, first, last });
  };

  return (
    <FormWrapper>
      <RidesForm onFinish={handleAddRide} isLoading={rest.isLoading} />
    </FormWrapper>
  );
};

export default AddRide;
