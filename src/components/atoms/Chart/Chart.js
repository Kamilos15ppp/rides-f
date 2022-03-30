import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Wrapper = styled.div`
  margin: 1rem 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 30px;

  h4 {
    font-size: 1.2rem;
  }
`;

const Chart = ({ title = 'Ranking', data = {} }) => {
  return (
    <Wrapper>
      <h4>{title}</h4>
      <Pie
        options={{
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        }}
        data={data}
      />
    </Wrapper>
  );
};

export default Chart;

Chart.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
};
