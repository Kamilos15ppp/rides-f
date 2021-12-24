import React from 'react';
import { Table } from 'antd';

const date = new Date();
const year = date.getFullYear();

const columns = [
  {
    title: 'Miesiąc',
    dataIndex: 'month',
  },
  {
    title: 'Ilość',
    dataIndex: 'quantity',
  },
];

const StatementTable = ({ statementData, isTableLoading = false }) => {
  let allInYear = 0;
  const data = statementData
    ? statementData.map(({ month, quantity }) => {
        allInYear += quantity;

        return {
          key: month,
          month,
          quantity,
        };
      })
    : [];

  const footer = () => `Ogółem w ${year}r: ${allInYear}`;

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        footer={footer}
        loading={isTableLoading}
        pagination={false}
        size="middle"
        tableLayout="unset"
      />
    </>
  );
};

export default StatementTable;
