import React from 'react';
import { Button, Modal } from 'antd';

const DeleteVehicleModal = ({
  isModalVisible = false,
  onCancel,
  isLoading = false,
  removeVehicle,
}) => {
  return (
    <Modal
      open={isModalVisible}
      onCancel={onCancel}
      footer={[
        <Button
          key="delete"
          shape="round"
          type="primary"
          danger
          loading={isLoading}
          onClick={() => removeVehicle()}
        >
          Usuń
        </Button>,
      ]}
    >
      <div>
        <h2>Czy na pewno chcesz usunąć ten pojazd?</h2>
      </div>
    </Modal>
  );
};

export default DeleteVehicleModal;
