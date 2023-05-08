import React from 'react';
import PropTypes from 'prop-types';
import RidesModal from '../RidesModal/RidesModal';
import { useAutocompletion } from '../../../hooks/useAutocompletion';

const RidesModalGroup = ({
  rideInfo,
  modalVisibility,
  onCancel,
  showModal,
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
    {
      name: ['created'],
      value: rideInfo.created,
    },
  ];

  return (
    <>
      <RidesModal
        rideInfo={rideInfo}
        variant={'info'}
        isModalVisible={modalVisibility.info}
        onCancel={onCancel.info}
        showModal={showModal}
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
      <RidesModal
        rideInfo={rideInfo}
        variant={'reAdd'}
        isModalVisible={modalVisibility.reAdd}
        onCancel={onCancel.reAdd}
        showModal={showModal}
        isSaving={isLoading.add}
        saveRide={handlers.add}
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
    reAdd: PropTypes.bool,
  }),
  onCancel: PropTypes.exact({
    info: PropTypes.func,
    edit: PropTypes.func,
    reAdd: PropTypes.func,
  }),
  showEditModal: PropTypes.func,
  isLoading: PropTypes.exact({
    delete: PropTypes.bool,
    update: PropTypes.bool,
    add: PropTypes.bool,
  }),
  handlers: PropTypes.exact({
    delete: PropTypes.func,
    update: PropTypes.func,
    add: PropTypes.func,
  }),
  showModal: PropTypes.exact({
    edit: PropTypes.func,
    reAdd: PropTypes.func,
  }),
};
