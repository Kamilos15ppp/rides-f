import React from 'react';
import { Table } from 'antd';

const columns = [
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
    title: 'Informacje',
    dataIndex: 'info',
    key: 'info',
  },
];

const VehiclesTable = ({ vehicles, isTableLoading = false }) => {
  const data = vehicles
    ? vehicles.map(({ id, tabor, producer, model, info }) => {
        return {
          key: id,
          tabor,
          producer,
          model,
          info,
        };
      })
    : [];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isTableLoading}
        scroll={{ x: 500 }}
        size="middle"
        tableLayout="unset"
        pagination={{ position: ['none', 'bottomCenter'] }}
      />
    </>
  );
};

export default VehiclesTable;
