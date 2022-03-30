import React, { lazy, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetRankingQuery } from 'store';
import {
  saveDataBeforeCurrentYear,
  saveDataInAllYears,
  saveDataInCurrentYear,
} from 'store/chartSlice';
import { Space, Typography } from 'antd';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
const RankingCharts = lazy(() =>
  import('components/molecules/RankingCharts/RankingCharts')
);

const date = new Date();
const year = date.getFullYear();
const { Text } = Typography;

const Ranking = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [userColors, setUserColors] = useState([]);
  const [userColorsBorder, setUserColorsBorder] = useState([]);
  const [allInYear, setAllInYear] = useState(0);
  const [allInOtherYears, setAllInOtherYears] = useState(0);
  const [allInAllYears, setAllInAllYears] = useState(0);
  const {
    data: ranking,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetRankingQuery();

  const randomInteger = (max = 255) => Math.floor(Math.random() * (max + 1));

  const randomRGBColor = () => {
    const r = randomInteger();
    const g = randomInteger();
    const b = randomInteger();

    return `rgba(${r}, ${g}, ${b}, 0.4)`;
  };

  const drawColorsToChart = () => {
    let colors = [];

    ranking.forEach(() => {
      colors.push(randomRGBColor());
    });

    setUserColors(colors);
    setUserColorsBorder(colors);
  };

  useEffect(() => {
    if (isSuccess) {
      drawColorsToChart();
      setData(
        ranking
          .map(
            ({
              name,
              quantity,
              quantity_in_other_years,
              quantity_in_all_years,
            }) => {
              setAllInYear((prev) => prev + quantity);
              setAllInOtherYears((prev) => prev + quantity_in_other_years);
              setAllInAllYears((prev) => prev + quantity_in_all_years);
              return {
                key: name,
                name,
                quantity,
                quantity_in_other_years,
                quantity_in_all_years,
              };
            }
          )
          .sort((a, b) => b.quantity - a.quantity)
      );
    }
  }, [isSuccess, isFetching]);

  useEffect(() => {
    if (data) {
      dispatch(
        saveDataInCurrentYear({
          labels: data.map((item) => item.name),
          datasets: [
            {
              label: `Ilość przejazdów w ${year}r`,
              data: data.map((item) => item.quantity),
              backgroundColor: userColors,
              borderColor: userColorsBorder,
              borderWidth: 2,
            },
          ],
        })
      );

      dispatch(
        saveDataBeforeCurrentYear({
          labels: data.map((item) => item.name),
          datasets: [
            {
              label: `Ilość przejazdów przed ${year}r`,
              data: data.map((item) => item.quantity_in_other_years),
              backgroundColor: userColors,
              borderColor: userColorsBorder,
              borderWidth: 2,
            },
          ],
        })
      );

      dispatch(
        saveDataInAllYears({
          labels: data.map((item) => item.name),
          datasets: [
            {
              label: `Ilość przejazdów łącznie`,
              data: data.map((item) => item.quantity_in_all_years),
              backgroundColor: userColors,
              borderColor: userColorsBorder,
              borderWidth: 2,
            },
          ],
        })
      );
    }
  }, [data, userColors]);

  const footer = () => {
    return (
      <Space size="small" direction="vertical">
        <Text type="warning" strong={true}>
          Ogółem w {year}r: {allInYear}
        </Text>
        <Text type="warning" strong={true}>
          Przed {year}r: {allInOtherYears}
        </Text>
        <Text type="warning" strong={true}>
          Ogółem: {allInAllYears}
        </Text>
      </Space>
    );
  };

  const columns = [
    {
      title: 'Użytkownik',
      dataIndex: 'name',
    },
    {
      title: `${year}r`,
      dataIndex: `quantity`,
    },
    {
      title: `Przed ${year}r`,
      dataIndex: 'quantity_in_other_years',
    },
    {
      title: 'Łącznie',
      dataIndex: 'quantity_in_all_years',
    },
  ];

  return (
    <div>
      <TableWrapper>
        <CustomTable
          columns={columns}
          fetchedData={data}
          isTableLoading={isLoading}
          scroll={{}}
          footer={footer}
        />
      </TableWrapper>
      <RankingCharts year={year} />
    </div>
  );
};

export default Ranking;
