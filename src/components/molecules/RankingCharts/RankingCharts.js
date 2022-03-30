import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Chart from 'components/atoms/Chart/Chart';
import { Wrapper } from './RankingCharts.styles';

const RankingCharts = ({ year }) => {
  const dataInCurrentYear = useSelector(
    (state) => state.chart.dataInCurrentYear
  );
  const dataBeforeCurrentYear = useSelector(
    (state) => state.chart.dataBeforeCurrentYear
  );
  const dataInAllYears = useSelector((state) => state.chart.dataInAllYears);

  return (
    <Wrapper>
      {dataInCurrentYear && (
        <Chart data={dataInCurrentYear} title={`Ilość przejazdów w ${year}r`} />
      )}
      {dataBeforeCurrentYear && (
        <Chart
          data={dataBeforeCurrentYear}
          title={`Ilość przejazdów przed ${year}r`}
        />
      )}
      {dataInAllYears && (
        <Chart data={dataInAllYears} title={`Ilość przejazdów łącznie`} />
      )}
    </Wrapper>
  );
};

export default RankingCharts;

RankingCharts.propTypes = {
  year: PropTypes.number,
};
