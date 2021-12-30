import React, { useEffect, useState } from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import RidesTable from 'components/molecules/RidesTable/RidesTable';
import RidesModal from 'components/molecules/RidesModal/RidesModal';
import {
  useDeleteRideMutation,
  useGetRidesQuery,
  useUpdateRideMutation,
} from 'store';
import { message } from 'antd';
import { useAutocompletion } from 'hooks/useAutocompletion';

const Rides = () => {
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [rideInfo, setRideInfo] = useState({});
  const { data, isLoading } = useGetRidesQuery();
  const [deleteRide, deleteRest] = useDeleteRideMutation();
  const [updateRide, updateRest] = useUpdateRideMutation();
  const { fetchedLines, fetchedDirections, fetchedStops } = useAutocompletion();

  const showInfoModal = (record) => {
    setIsInfoModalVisible(true);
    setRideInfo({
      id: record.key.toString(),
      tabor: record.tabor,
      line: record.line,
      direction: record.direction,
      first: record.first,
      last: record.last,
      created: record.created_at,
      updated: record.updated_at,
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

  const fields = [
    {
      name: ['tabor'],
      value: rideInfo.tabor,
    },
    {
      name: ['line'],
      value: rideInfo.line,
    },
    {
      name: ['direction'],
      value: rideInfo.direction,
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

  const handleDeleteRide = (id) => {
    deleteRide(id);
    handleInfoCancel();
  };

  const handleUpdateRide = ({ tabor, line, direction, first, last }) => {
    const { id } = rideInfo;
    updateRide({ id, tabor, line, direction, first, last });
    handleEditCancel();
  };

  useEffect(() => {
    const { isSuccess, isError } = deleteRest;
    if (isSuccess) {
      message.success('Usunięto przejazd');
    }
    if (isError) {
      message.error('Błąd podczas usuwania przejazdu');
    }
  }, [deleteRest.isSuccess, deleteRest.isError]);

  useEffect(() => {
    const { isSuccess, isError } = updateRest;
    if (isSuccess) {
      message.success('Zaktualizowano przejazd');
    }
    if (isError) {
      message.error('Błąd podczas aktualizacji przejazdu');
    }
  }, [updateRest.isSuccess, updateRest.isError]);

  return (
    <TableWrapper>
      <RidesModal
        rideInfo={rideInfo}
        title={'Szczegółowe informacje'}
        isModalVisible={isInfoModalVisible}
        onCancel={handleInfoCancel}
        isEditButton={true}
        showEditModal={showEditModal}
        isDeleteButton={true}
        isDeleting={deleteRest.isLoading}
        removeRide={handleDeleteRide}
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
        isSaving={updateRest.isLoading}
        saveRide={handleUpdateRide}
        fields={fields}
        options1={fetchedLines}
        options2={fetchedDirections}
        options3={fetchedStops}
      />
      <RidesTable
        rides={data}
        isTableLoading={isLoading}
        showInfoModal={showInfoModal}
      />
    </TableWrapper>
  );
};

export default Rides;
