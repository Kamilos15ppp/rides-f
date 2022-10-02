import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import RidesForm from 'components/molecules/RidesForm/RidesForm';

const RidesModal = ({
  variant = '',
  rideInfo = {},
  isModalVisible = false,
  onCancel,
  showEditModal,
  isDeleting = false,
  removeRide,
  isSaving = false,
  saveRide,
  fields = [],
  options = {},
}) => {
  const [title, setTitle] = useState('');
  const { tabor, line, direction, first, last, created, updated } = rideInfo;

  useEffect(() => {
    if (variant === 'info') {
      setTitle('Szczegółowe informacje');
    } else if (variant === 'edit') {
      setTitle('Edytuj przejazd');
    }
  }, [variant]);

  return (
    <Modal
      title={title}
      open={isModalVisible}
      onCancel={onCancel}
      footer={[
        <Button key="close" shape="round" onClick={onCancel}>
          Zamknij
        </Button>,
        variant === 'info' && (
          <Button
            key="edit"
            shape="round"
            type="primary"
            onClick={() => showEditModal(rideInfo)}
          >
            Edytuj
          </Button>
        ),
        variant === 'info' && (
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
      {variant === 'info' && (
        <div>
          <p>Taborowy: {tabor}</p>
          <p>Linia: {line}</p>
          <p>Kierunek: {direction}</p>
          <p>Początkowy: {first}</p>
          <p>Końcowy: {last}</p>
          <p>Utworzono: {created}</p>
          <p>Zaktualizowano: {updated}</p>
        </div>
      )}
      {variant === 'edit' && (
        <div>
          <RidesForm
            options={options}
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
  variant: PropTypes.string,
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
  options: PropTypes.object,
};
