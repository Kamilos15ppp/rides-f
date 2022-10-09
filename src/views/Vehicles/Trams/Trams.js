import React, { useEffect, useState } from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
import { useGetTramsQuery } from 'store';
import { columns } from '../columns';

const Trams = () => {
  const [data, setData] = useState(null);
  const { data: trams, isLoading, isSuccess, isFetching } = useGetTramsQuery();

  useEffect(() => {
    if (isSuccess) {
      setData(
        trams.map(({ ID, tabor, producer, model }) => {
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

export default Trams;
