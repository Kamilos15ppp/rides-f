import React from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import VehiclesTable from 'components/molecules/VehicleTable/VehiclesTable';
import { useGetBusesQuery } from 'store';

const Buses = () => {
  const { data, isLoading } = useGetBusesQuery();

  return (
    <TableWrapper>
      <VehiclesTable vehicles={data} isTableLoading={isLoading} />
    </TableWrapper>
  );
};

export default Buses;
