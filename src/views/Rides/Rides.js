import React, { lazy, useEffect, useState } from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import {
  useAddRideMutation,
  useDeleteRideMutation,
  useGetRidesQuery,
  useUpdateRideMutation,
} from 'store';
import { message } from 'antd';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
import { columns } from './constance';

const RidesModalGroup = lazy(() =>
  import('../../components/molecules/RidesModalGroup/RidesModalGroup')
);

const Rides = () => {
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isReAddModalVisible, setIsReAddModalVisible] = useState(false);
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
  const [addRide, addRest] = useAddRideMutation();

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
      created: ride.created,
    });
  };

  const showReAddModal = (ride) => {
    setIsInfoModalVisible(false);
    setIsReAddModalVisible(true);
    setRideInfo({
      id: ride.id,
      tabor: ride.tabor,
      line: ride.line,
      direction: ride.direction,
      first: ride.first,
      last: ride.last,
      created: ride.created,
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

  const handleReAddCancel = () => {
    setIsReAddModalVisible(false);
    setRideInfo({});
  };

  const handleDeleteRide = (id) => {
    deleteRide(id);
    handleInfoCancel();
  };

  const handleUpdateRide = ({ tabor, line, direction, first, last, date }) => {
    const { id, created } = rideInfo;
    const created_at = `${date} ${created.slice(10, 19)}`;
    updateRide({ id, tabor, line, direction, first, last, created_at });
    handleEditCancel();
  };

  const handleAddRide = ({ tabor, line, direction, first, last }) => {
    addRide({ tabor, line, direction, first, last });
    handleReAddCancel();
  };

  const modalObj = {
    onCancel: {
      info: handleInfoCancel,
      edit: handleEditCancel,
      reAdd: handleReAddCancel,
    },
    isLoading: {
      delete: deleteRest.isLoading,
      update: updateRest.isLoading,
      add: addRest.isLoading,
    },
    handlers: {
      delete: handleDeleteRide,
      update: handleUpdateRide,
      add: handleAddRide,
    },
    modalVisibility: {
      info: isInfoModalVisible,
      edit: isEditModalVisible,
      reAdd: isReAddModalVisible,
    },
    showModal: {
      edit: showEditModal,
      reAdd: showReAddModal,
    },
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
    const { isSuccess, isError } = addRest;
    if (isSuccess) {
      message.success('Dodano przejazd');
    }
    if (isError) {
      message.error('Błąd podczas dodawania przejazdu');
    }
  }, [addRest.isSuccess, addRest.isError]);

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

  return (
    <TableWrapper>
      <RidesModalGroup
        rideInfo={rideInfo}
        showEditModal={showEditModal}
        {...modalObj}
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
