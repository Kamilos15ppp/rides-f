import React, { useEffect, useState } from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
import { useGetBusesQuery } from 'store';
import { columns } from '../columns';

const Buses = () => {
  const [data, setData] = useState(null);
  const { data: buses, isLoading, isSuccess, isFetching } = useGetBusesQuery();

  useEffect(() => {
    if (isSuccess) {
      setData(
        buses.map(({ ID, tabor, producer, model }) => {
          return {
            key: ID,
            tabor,
            producer,
            model,
          };
        })
      );
    }
  }, [isSuccess, isFetching]);

  return (
    <TableWrapper>
      <CustomTable
        columns={columns}
        fetchedData={data}
        isTableLoading={isLoading}
        scroll={{}}
      />
    </TableWrapper>
  );
};

export default Buses;
