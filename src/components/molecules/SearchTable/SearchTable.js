import React from 'react';
import PropTypes from 'prop-types';
import { Table, Typography } from 'antd';

const { Text } = Typography;

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
  {
    title: 'Utworzono',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Zaktualizowano',
    dataIndex: 'updated_at',
    key: 'updated_at',
  },
];

const SearchTable = ({ rides = [], total = 0, isTableLoading = false }) => {
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

  const footer = () => {
    return (
      <Text type="warning" strong={true}>
        Łączna ilość rekordów: {total}
      </Text>
    );
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isTableLoading}
        scroll={{ x: 500 }}
        size="middle"
        tableLayout="unset"
        pagination={false}
        footer={footer}
      />
    </>
  );
};

export default SearchTable;

SearchTable.propTypes = {
  rides: PropTypes.array,
  isTableLoading: PropTypes.bool,
  showInfoModal: PropTypes.func,
};
