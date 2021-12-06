import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVehicles } from 'hooks/useVehicles';
import VehiclesTable from 'components/molecules/VehicleTable/VehiclesTable';
import { Wrapper } from './Vehicles.styles';

const Vehicles = () => {
  const { type } = useParams();
  const { getVehicles } = useVehicles();
  const [vehicles, setVehicles] = useState([]);
  const [vehicleType, setVehicleType] = useState(null);
  const [isTableLoading, setIsTableLoading] = useState(true);

  const loadVehicles = async () => {
    const vehicles = await getVehicles(vehicleType);
    if (vehicles) {
      setVehicles(vehicles);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    if (type) {
    }
    switch (type) {
      case 'buses':
        setVehicleType('A');
        break;
      case 'trams':
        setVehicleType('T');
        break;
      case 'others':
        setVehicleType('Z');
        break;
      default:
        setVehicleType('A');
    }
  }, [type]);

  useEffect(() => {
    setIsTableLoading(true);
    (async () => loadVehicles())();
    return () => setVehicles([]);
  }, [vehicleType]);

  return (
    <Wrapper>
      <VehiclesTable vehicles={vehicles} isTableLoading={isTableLoading} />
    </Wrapper>
  );
};

export default Vehicles;
