import React from 'react';
import { Button, Modal } from 'antd';
import RidesForm from 'components/molecules/RidesForm/RidesForm';

const RidesModal = ({
  rideInfo,
  title,
  isModalVisible,
  onCancel,
  isEditButton,
  isDeleteButton,
  showEditModal,
  isDeleting,
  removeRide,
  isSaving,
  saveRide,
  fields,
}) => {
  return (
    <Modal
      title={title}
      visible={isModalVisible}
      onCancel={onCancel}
      footer={[
        <Button key="close" shape="round" onClick={onCancel}>
          Zamknij
        </Button>,
        isEditButton && (
          <Button
            key="edit"
            shape="round"
            type="primary"
            onClick={() => showEditModal(rideInfo)}
          >
            Edytuj
          </Button>
        ),
        isDeleteButton && (
          <Button
            key="delete"
            shape="round"
            type="primary"
            danger
            loading={isDeleting}
            onClick={() => removeRide(rideInfo.id)}
          >
            Usuń
          </Button>
        ),
      ]}
    >
      {isEditButton && (
        <div>
          <p>ID: {rideInfo.id}</p>
          <p>Taborowy: {rideInfo.tabor}</p>
          <p>Linia: {rideInfo.line}</p>
          <p>Kierunek: {rideInfo.direction}</p>
          <p>Początkowy: {rideInfo.first}</p>
          <p>Końcowy: {rideInfo.last}</p>
        </div>
      )}
      {!isEditButton && (
        <div>
          <RidesForm
            fields={fields}
            onFinish={saveRide}
            isLoading={isSaving}
            isEditing={true}
          />
        </div>
      )}
    </Modal>
  );
};

export default RidesModal;
