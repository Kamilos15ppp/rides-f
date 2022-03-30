import React, { useEffect, useState, lazy } from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import {
  useDeleteRideMutation,
  useGetRidesQuery,
  useUpdateRideMutation,
} from 'store';
import { message } from 'antd';
import { useAutocompletion } from 'hooks/useAutocompletion';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
const RidesModal = lazy(() =>
  import('components/molecules/RidesModal/RidesModal')
);

const Rides = () => {
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [rideInfo, setRideInfo] = useState({});
  const {
    data: vehicles,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetRidesQuery();
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

  useEffect(() => {
    if (isSuccess) {
      setData(
        vehicles.map(
          ({
            id,
            tabor,
            line,
            direction,
            first,
            last,
            created_at,
            updated_at,
          }) => {
            return {
              key: id,
              tabor,
              line,
              direction,
              first,
              last,
              created_at,
              updated_at,
            };
          }
        )
      );
    }
  }, [isSuccess, isFetching]);

  const columns = [
    {
      title: 'Taborowy',
      dataIndex: 'tabor',
      key: 'tabor',
      fixed: 'left',
    },
    {
      title: 'Linia',
      dataIndex: 'line',
      key: 'line',
    },
    {
      title: 'Kierunek',
      dataIndex: 'direction',
      key: 'direction',
    },
    {
      title: 'Początkowy',
      dataIndex: 'first',
      key: 'first',
    },
    {
      title: 'Końcowy',
      dataIndex: 'last',
      key: 'last',
    },
  ];

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
      <CustomTable
        columns={columns}
        fetchedData={data}
        isTableLoading={isLoading}
        onRow={true}
        showInfoModal={showInfoModal}
      />
    </TableWrapper>
  );
};

export default Rides;
