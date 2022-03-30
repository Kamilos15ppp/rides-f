import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

const CustomTable = ({
  columns = [],
  fetchedData = [],
  isTableLoading = false,
  pagination = { position: ['none', 'bottomCenter'] },
  scroll = { x: 500 },
  onRow = false,
  showInfoModal,
  footer = null,
}) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={fetchedData}
        loading={isTableLoading}
        scroll={scroll}
        size="middle"
        tableLayout="unset"
        pagination={pagination}
        onRow={
          onRow
            ? (record) => {
                return {
                  onClick: () => {
                    showInfoModal(record);
                  },
                };
              }
            : null
        }
        footer={footer}
      />
    </>
  );
};

export default CustomTable;

CustomTable.propTypes = {
  columns: PropTypes.array,
  fetchedData: PropTypes.array,
  isTableLoading: PropTypes.bool,
  pagination: PropTypes.any,
  scroll: PropTypes.object,
  onRow: PropTypes.bool,
  showInfoModal: PropTypes.func,
  footer: PropTypes.any,
};
