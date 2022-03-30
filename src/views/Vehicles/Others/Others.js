import React, { useEffect, useState } from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
import { useGetOthersQuery } from 'store';
import { columns } from '../columns';

const Others = () => {
  const [data, setData] = useState(null);
  const { data: trams, isLoading, isSuccess, isFetching } = useGetOthersQuery();

  useEffect(() => {
    if (isSuccess) {
      setData(
        trams.map(({ id, tabor, producer, model }) => {
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

export default Others;
