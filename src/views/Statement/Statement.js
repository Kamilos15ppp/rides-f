import React from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import StatementTable from 'components/molecules/StatementTable/StatementTable';
import { useGetStatementQuery } from 'store';

const Statement = () => {
  const { data, isLoading } = useGetStatementQuery();

  return (
    <TableWrapper>
      <StatementTable statementData={data} isTableLoading={isLoading} />
    </TableWrapper>
  );
};

export default Statement;
