import React from 'react';
import PropTypes from 'prop-types';
import RidesModal from '../RidesModal/RidesModal';
import { useAutocompletion } from '../../../hooks/useAutocompletion';

const RidesModalGroup = ({
  rideInfo,
  modalVisibility,
  onCancel,
  showEditModal,
  isLoading,
  handlers,
}) => {
  const options = useAutocompletion();
  const fields = rideInfo && [
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

  return (
    <>
      <RidesModal
        rideInfo={rideInfo}
        variant={'info'}
        isModalVisible={modalVisibility.info}
        onCancel={onCancel.info}
        showEditModal={showEditModal}
        isDeleting={isLoading.delete}
        removeRide={handlers.delete}
      />
      <RidesModal
        rideInfo={rideInfo}
        variant={'edit'}
        isModalVisible={modalVisibility.edit}
        onCancel={onCancel.edit}
        isSaving={isLoading.update}
        saveRide={handlers.update}
        fields={fields}
        options={options}
      />
    </>
  );
};

export default RidesModalGroup;

RidesModalGroup.propTypes = {
  rideInfo: PropTypes.object,
  modalVisibility: PropTypes.exact({
    info: PropTypes.bool,
    edit: PropTypes.bool,
  }),
  onCancel: PropTypes.exact({
    info: PropTypes.func,
    edit: PropTypes.func,
  }),
  showEditModal: PropTypes.func,
  isLoading: PropTypes.exact({
    delete: PropTypes.bool,
    update: PropTypes.bool,
  }),
  handlers: PropTypes.exact({
    delete: PropTypes.func,
    update: PropTypes.func,
  }),
};
