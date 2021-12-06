import React, { useState } from 'react';
import { useRides } from 'hooks/useRides';
import RidesForm from 'components/molecules/RidesForm/RidesForm';
import { Wrapper } from './AddRide.styles';

const AddRide = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { postRide } = useRides();

  const onFinish = async ({ tabor, line, direction, first, last }) => {
    setIsLoading(true);
    const response = await postRide({ tabor, line, direction, first, last });
    if (response) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <RidesForm onFinish={onFinish} isLoading={isLoading} />
    </Wrapper>
  );
};

export default AddRide;
