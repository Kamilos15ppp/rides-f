import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import RidesForm from 'components/molecules/RidesForm/RidesForm';

const RidesModal = ({
  rideInfo = {},
  title = '',
  isModalVisible = false,
  onCancel,
  isEditButton = false,
  isDeleteButton = false,
  showEditModal,
  isDeleting = false,
  removeRide,
  isSaving = false,
  saveRide,
  fields = [],
  options1 = [],
  options2 = [],
  options3 = [],
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
          <p>Taborowy: {rideInfo.tabor}</p>
          <p>Linia: {rideInfo.line}</p>
          <p>Kierunek: {rideInfo.direction}</p>
          <p>Początkowy: {rideInfo.first}</p>
          <p>Końcowy: {rideInfo.last}</p>
          <p>Utworzono: {rideInfo.created}</p>
          <p>Zaktualizowano: {rideInfo.updated}</p>
        </div>
      )}
      {!isEditButton && (
        <div>
          <RidesForm
            options1={options1}
            options2={options2}
            options3={options3}
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

RidesModal.propTypes = {
  rideInfo: PropTypes.exact({
    id: PropTypes.string,
    tabor: PropTypes.string,
    line: PropTypes.string,
    direction: PropTypes.string,
    first: PropTypes.string,
    last: PropTypes.string,
    created: PropTypes.string,
    updated: PropTypes.string,
  }),
  title: PropTypes.string,
  isModalVisible: PropTypes.bool,
  onCancel: PropTypes.func,
  isEditButton: PropTypes.bool,
  isDeleteButton: PropTypes.bool,
  showEditModal: PropTypes.func,
  isDeleting: PropTypes.bool,
  removeRide: PropTypes.func,
  isSaving: PropTypes.bool,
  saveRide: PropTypes.func,
  fields: PropTypes.array,
  options1: PropTypes.array,
  options2: PropTypes.array,
  options3: PropTypes.array,
};
