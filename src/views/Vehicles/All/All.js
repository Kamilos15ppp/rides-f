import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
import DeleteVehicleModal from 'components/molecules/VehicleModal/DeleteVehicleModal';
import { useDeleteVehicleMutation, useGetAllVehiclesQuery } from 'store';

const All = () => {
  const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [deleteVehicle, rest] = useDeleteVehicleMutation();
  const {
    data: allVehicles,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetAllVehiclesQuery();

  const columnsAll = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Taborowy',
      dataIndex: 'tabor',
      key: 'tabor',
    },
    {
      title: 'Producent',
      dataIndex: 'producer',
      key: 'producer',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Akcja',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (text, record) => (
        <Button
          type="danger"
          shape="round"
          onClick={() => showDeletionModal(record.ID)}
        >
          Usuń
        </Button>
      ),
    },
  ];
  const showDeletionModal = (id) => {
    setId(id);
    setIsDeletionModalVisible(true);
  };

  const handleCancel = () => {
    setId(null);
    setIsDeletionModalVisible(false);
  };

  const handleDeletion = (id) => {
    deleteVehicle(id);
    handleCancel();
  };

  useEffect(() => {
    if (isSuccess) {
      setData(
        allVehicles.map(({ ID, tabor, producer, model }) => {
          return {
            key: ID,
            ID,
            tabor,
            producer,
            model,
          };
        })
      );
    }
  }, [isSuccess, isFetching]);

  return (
    <TableWrapper>
      <DeleteVehicleModal
        isModalVisible={isDeletionModalVisible}
        onCancel={handleCancel}
        removeVehicle={() => handleDeletion(id)}
        isLoading={rest.isLoading}
      />
      <CustomTable
        columns={columnsAll}
        fetchedData={data}
        isTableLoading={isLoading}
        scroll={{ x: 500 }}
      />
    </TableWrapper>
  );
};

export default All;
