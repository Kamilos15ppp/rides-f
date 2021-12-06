import React, { useEffect, useState } from 'react';
import { useRides } from 'hooks/useRides';
import RidesTable from 'components/molecules/RidesTable/RidesTable';
import RidesModal from 'components/molecules/RidesModal/RidesModal';
import { Wrapper } from './Rides.styles';

const Rides = () => {
  const { getRides, updateRide, deleteRide } = useRides();
  const [rides, setRides] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [rideInfo, setRideInfo] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const showInfoModal = (record) => {
    setIsInfoModalVisible(true);
    setRideInfo({
      id: record.key.toString(),
      tabor: record.tabor,
      line: record.line,
      direction: record.direction,
      first: record.first,
      last: record.last,
    });
  };

  const showEditModal = (ride) => {
    setIsInfoModalVisible(false);
    setIsEditModalVisible(true);
    setRideInfo({
      id: ride.id,
      tabor: ride.tabor,
      line: ride.line,
      direction: ride.direction,
      first: ride.first,
      last: ride.last,
    });
  };

  const handleInfoCancel = () => {
    setIsInfoModalVisible(false);
    setRideInfo({});
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setRideInfo({});
  };

  const loadRides = async () => {
    const rides = await getRides();
    if (rides) {
      setRides(rides);
      setIsTableLoading(false);
    }
  };

  const saveRide = async ({ tabor, line, direction, first, last }) => {
    const { id } = rideInfo;
    setIsSaving(true);
    setIsTableLoading(true);
    const response = await updateRide({
      id,
      tabor,
      line,
      direction,
      first,
      last,
    });
    if (response) {
      setRideInfo({});
      setIsSaving(false);
      handleEditCancel();
      await loadRides();
    } else {
      setIsSaving(false);
    }
  };

  const removeRide = async (id) => {
    setIsDeleting(true);
    setIsTableLoading(true);
    const response = await deleteRide(id);
    if (response) {
      setRideInfo({});
      setIsDeleting(false);
      handleInfoCancel();
      await loadRides();
    } else {
      setIsDeleting(false);
    }
  };

  const fields = [
    {
      name: ['tabor'],
      value: rideInfo.tabor,
    },
    {
      name: ['direction'],
      value: rideInfo.direction,
    },
    {
      name: ['line'],
      value: rideInfo.line,
    },
    {
      name: ['first'],
      value: rideInfo.first,
    },
    {
      name: ['last'],
      value: rideInfo.last,
    },
  ];

  useEffect(() => {
    (async () => await loadRides())();
  }, []);

  return (
    <Wrapper>
      <RidesModal
        rideInfo={rideInfo}
        title={'Szczegółowe informacje'}
        isModalVisible={isInfoModalVisible}
        onCancel={handleInfoCancel}
        isEditButton={true}
        showEditModal={showEditModal}
        isDeleteButton={true}
        isDeleting={isDeleting}
        removeRide={removeRide}
        isSaveButton={false}
        fields={null}
      />
      <RidesModal
        rideInfo={rideInfo}
        title={'Edytuj przejazd'}
        isModalVisible={isEditModalVisible}
        onCancel={handleEditCancel}
        isEditButton={false}
        isDeleteButton={false}
        isSaveButton={true}
        isSaving={isSaving}
        saveRide={saveRide}
        fields={fields}
      />
      <RidesTable
        rides={rides}
        isTableLoading={isTableLoading}
        showInfoModal={showInfoModal}
      />
    </Wrapper>
  );
};

export default Rides;
