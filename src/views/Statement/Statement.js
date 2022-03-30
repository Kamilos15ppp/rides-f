import React, { useEffect, useState } from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
import { useGetStatementQuery } from 'store';
import { Typography } from 'antd';

const date = new Date();
const year = date.getFullYear();
const { Text } = Typography;

const Statement = () => {
  const [data, setData] = useState(null);
  const [allInYear, setAllInYear] = useState(0);

  const {
    data: stats,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetStatementQuery();

  useEffect(() => {
    if (isSuccess) {
      setData(
        stats.map(({ month, quantity }) => {
          setAllInYear((prev) => prev + quantity);

          return {
            key: month,
            month,
            quantity,
          };
        })
      );
    }
  }, [isSuccess, isFetching]);

  const footer = () => {
    return (
      <Text type="warning" strong={true}>
        Ogółem w {year}r: {allInYear}
      </Text>
    );
  };

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

  return (
    <TableWrapper>
      <CustomTable
        columns={columns}
        fetchedData={data}
        isTableLoading={isLoading}
        pagination={false}
        scroll={{}}
        footer={footer}
      />
    </TableWrapper>
  );
};

export default Statement;
