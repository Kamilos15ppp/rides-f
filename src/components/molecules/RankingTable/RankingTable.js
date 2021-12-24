import React from 'react';
import { Table } from 'antd';

const date = new Date();
const year = date.getFullYear();

const columns = [
  {
    title: 'Użytkownik',
    dataIndex: 'name',
  },
  {
    title: `${year}r`,
    dataIndex: `quantity`,
  },
  {
    title: `Przed ${year}r`,
    dataIndex: 'quantity_in_other_years',
  },
  {
    title: 'Łącznie',
    dataIndex: 'quantity_in_all_years',
  },
];

const RankingTable = ({ statsData, isTableLoading = false }) => {
  let allInYear = 0;
  let allInOtherYears = 0;
  let allInAllYears = 0;
  const data = statsData
    ? statsData.map(
        ({
          name,
          quantity,
          quantity_in_other_years,
          quantity_in_all_years,
        }) => {
          allInYear += quantity;
          allInOtherYears += quantity_in_other_years;
          allInAllYears += quantity_in_all_years;
          return {
            key: name,
            name,
            quantity,
            quantity_in_other_years,
            quantity_in_all_years,
          };
        }
      )
    : [];

  const footer = () =>
    `Ogółem w ${year}r: ${allInYear} | Przed ${year}r: ${allInOtherYears} | Ogółem: ${allInAllYears}`;

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

export default RankingTable;
