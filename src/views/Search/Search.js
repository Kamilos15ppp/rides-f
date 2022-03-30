import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from 'components/molecules/SearchForm/SearchForm';
import { TableWrapper } from 'components/atoms/TableWrapper/TableWrapper';
import SearchTable from 'components/molecules/SearchTable/SearchTable';
import { useSearchRidesMutation } from 'store';
import { clearPhrase } from 'store/searchSlice';
import { Pagination } from 'antd';

const Search = () => {
  const dispatch = useDispatch();
  const [currPage, setCurrPage] = useState(null);
  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const column = useSelector((state) => state.search.field);
  const phraseSelector = useSelector((state) => state.search.phrase);
  const startDateSelector = useSelector((state) => state.search.startDate);
  const endDateSelector = useSelector((state) => state.search.endDate);
  const sortColumn = useSelector((state) => state.search.sortField);
  const [searchRides, rest] = useSearchRidesMutation();

  const fetchData = (phrase) => {
    const start = currPage > 1 ? (currPage - 1) * 10 : 0;
    const startDate = startDateSelector ? startDateSelector : '';
    const endDate = endDateSelector ? endDateSelector : '';
    const order = sortColumn
      ? sortColumn.slice(sortColumn.indexOf('-') + 1, sortColumn.length)
      : 'desc';
    const sort = sortColumn
      ? sortColumn.slice(0, sortColumn.indexOf('-'))
      : 'created_at';

    searchRides({
      phrase,
      column,
      start,
      startDate,
      endDate,
      sort,
      order,
    }).then((res) => {
      setData(res.data.data);
      setTotalRecords(res.data.recordsTotal);
    });
  };

  const onPaginationChange = (page) => setCurrPage(page);

  const onFinish = () => {
    const phrase = phraseSelector ? phraseSelector : '';
    currPage === 1 ? fetchData(phrase) : setCurrPage(1);
  };

  const clear = () => {
    setData([]);
    setCurrPage(null);
    setTotalRecords(0);
    dispatch(clearPhrase());
  };

  useEffect(() => {
    if (currPage) {
      const phrase = phraseSelector ? phraseSelector : '';
      fetchData(phrase);
    }
  }, [currPage]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <SearchForm
        onFinish={onFinish}
        clear={clear}
        isLoading={rest.isLoading}
      />
      <TableWrapper>
        <SearchTable
          rides={data}
          total={totalRecords}
          isTableLoading={rest.isLoading}
        />
        <Pagination
          current={currPage}
          onChange={onPaginationChange}
          total={totalRecords}
        />
      </TableWrapper>
    </div>
  );
};

export default Search;
