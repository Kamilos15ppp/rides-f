import React from 'react';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import RankingTable from 'components/molecules/RankingTable/RankingTable';
import { useGetRankingQuery } from 'store';

const Ranking = () => {
  const { data, isLoading } = useGetRankingQuery();

  return (
    <TableWrapper>
      <RankingTable statsData={data} isTableLoading={isLoading} />
    </TableWrapper>
  );
};

export default Ranking;
