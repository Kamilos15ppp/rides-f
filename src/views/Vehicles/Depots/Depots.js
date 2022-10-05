import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Typography } from 'antd';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import CustomTable from 'components/molecules/CustomTable/CustomTable';
import { useGetDepotsQuery } from 'store';
import { columnsDepots } from '../columns';

const { Text } = Typography;
const titles = [
  'Bieńczyce',
  'Wola Duchacka',
  'Płaszów',
  'Mobilis',
  'Nowa Huta',
  'Podgórze',
];

const Depots = () => {
  const [data, setData] = useState({});
  const [sums, setSums] = useState([]);
  const {
    data: depots,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetDepotsQuery();

  useEffect(() => {
    let bienczyce = [];
    let wolaDuchacka = [];
    let plaszow = [];
    let mobilis = [];
    let nowaHuta = [];
    let podgorze = [];
    let sums = [];

    if (isSuccess) {
      bienczyce = Object.keys(depots.bienczyce).map((item, index) => {
        return {
          key: item,
          model: item,
          sum: Object.values(depots.bienczyce)[index],
        };
      });

      wolaDuchacka = Object.keys(depots.wolaDuchacka).map((item, index) => {
        return {
          key: item,
          model: item,
          sum: Object.values(depots.wolaDuchacka)[index],
        };
      });

      plaszow = Object.keys(depots.plaszow).map((item, index) => {
        return {
          key: item,
          model: item,
          sum: Object.values(depots.plaszow)[index],
        };
      });

      mobilis = Object.keys(depots.mobilis).map((item, index) => {
        return {
          key: item,
          model: item,
          sum: Object.values(depots.mobilis)[index],
        };
      });

      nowaHuta = Object.keys(depots.nowaHuta).map((item, index) => {
        return {
          key: item,
          model: item,
          sum: Object.values(depots.nowaHuta)[index],
        };
      });

      podgorze = Object.keys(depots.podgorze).map((item, index) => {
        return {
          key: item,
          model: item,
          sum: Object.values(depots.podgorze)[index],
        };
      });

      sums = Object.keys(depots.sums).map((item, index) => {
        return {
          key: item,
          sum: Object.values(depots.sums)[index],
        };
      });

      const obj = {
        bienczyce,
        wolaDuchacka,
        plaszow,
        mobilis,
        nowaHuta,
        podgorze,
      };

      setData(obj);
      setSums(sums);
    }
  }, [isSuccess, isFetching]);

  const footer = (sums, index) => {
    return (
      <Text type="warning" strong={true}>
        Łącznie: {sums[index].sum}
      </Text>
    );
  };

  return (
    <TableWrapper>
      {Object.keys(data).map((item, index) => (
        <div
          key={uuidv4()}
          style={{
            margin: '1rem 0',
            backgroundColor: 'rgba(30, 30, 30, 0.5)',
            borderRadius: '2rem',
          }}
        >
          <h4 style={{ paddingTop: '0.5rem', fontWeight: 'bold' }}>
            {titles[index]}
          </h4>
          <CustomTable
            columns={columnsDepots}
            fetchedData={Object.values(data)[index]}
            isTableLoading={isLoading}
            scroll={{}}
            footer={() => footer(sums, index)}
          />
        </div>
      ))}
    </TableWrapper>
  );
};

export default Depots;
