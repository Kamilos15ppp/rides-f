import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Taborowy',
    dataIndex: 'tabor',
    key: 'tabor',
    fixed: 'left',
  },
  {
    title: 'Linia',
    dataIndex: 'line',
    key: 'line',
  },
  {
    title: 'Kierunek',
    dataIndex: 'direction',
    key: 'direction',
  },
  {
    title: 'Początkowy',
    dataIndex: 'first',
    key: 'first',
  },
  {
    title: 'Końcowy',
    dataIndex: 'last',
    key: 'last',
  },
];

const RidesTable = ({ rides, isTableLoading = false, showInfoModal }) => {
  const data = rides
    ? rides.map(
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
        onRow={(record) => {
          return {
            onClick: () => {
              showInfoModal(record);
            },
          };
        }}
      />
    </>
  );
};

export default RidesTable;
