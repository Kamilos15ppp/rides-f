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
        buses.map(({ id, tabor, producer, model }) => {
          return {
            key: id,
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
