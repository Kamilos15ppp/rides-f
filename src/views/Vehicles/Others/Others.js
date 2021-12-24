import React from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import VehiclesTable from 'components/molecules/VehicleTable/VehiclesTable';
import { useGetOthersQuery } from 'store';

const Others = () => {
  const { data, isLoading } = useGetOthersQuery();

  return (
    <TableWrapper>
      <VehiclesTable vehicles={data} isTableLoading={isLoading} />
    </TableWrapper>
  );
};

export default Others;
