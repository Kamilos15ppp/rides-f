import React, { useEffect } from 'react';
import { FormWrapper } from 'components/atoms/FormWrapper/FormWrapper';
import VehicleForm from 'components/molecules/VehicleForm/VehicleForm';
import { useAddVehicleMutation } from 'store';
import { message } from 'antd';

const AddVehicle = () => {
  const [addVehicle, rest] = useAddVehicleMutation();

  useEffect(() => {
    const { isSuccess, isError } = rest;
    if (isSuccess) {
      message.success('Dodano pojazd');
    }
    if (isError) {
      message.error('Sprawdź poprawność danych');
    }
  }, [rest.isSuccess, rest.isError]);

  const handleAddUser = ({ tabor, producer, model, type }) => {
    addVehicle({ tabor, producer, model, type });
  };

  return (
    <FormWrapper>
      <VehicleForm onFinish={handleAddUser} isLoading={rest.isLoading} />
    </FormWrapper>
  );
};

export default AddVehicle;
