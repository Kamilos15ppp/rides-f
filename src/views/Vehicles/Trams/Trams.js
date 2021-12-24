import React from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import VehiclesTable from 'components/molecules/VehicleTable/VehiclesTable';
import { useGetTramsQuery } from 'store';

const Trams = () => {
  const { data, isLoading } = useGetTramsQuery();

  return (
    <TableWrapper>
      <VehiclesTable vehicles={data} isTableLoading={isLoading} />
    </TableWrapper>
  );
};

export default Trams;
