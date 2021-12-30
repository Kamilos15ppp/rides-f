import { useEffect, useState } from 'react';
import {
  useGetAutocompleteDirectionsQuery,
  useGetAutocompleteLinesQuery,
  useGetAutocompleteStopsQuery,
} from 'store';

export const useAutocompletion = () => {
  const { data: dataLines, isFetching: isLinesFetching } =
    useGetAutocompleteLinesQuery();
  const { data: dataDirections, isFetching: isDirectionsFetching } =
    useGetAutocompleteDirectionsQuery();
  const { data: dataStops, isFetching: isStopsFetching } =
    useGetAutocompleteStopsQuery();
  const [fetchedLines, setFetchedLines] = useState([]);
  const [fetchedDirections, setFetchedDirections] = useState([]);
  const [fetchedStops, setFetchedStops] = useState([]);

  useEffect(() => {
    let arrayLines = [];

    if (dataLines) {
      arrayLines = dataLines.map((item) => {
        return { value: item };
      });
      setFetchedLines(arrayLines);
    }
  }, [isLinesFetching]);

  useEffect(() => {
    let arrayDirections = [];

    if (dataDirections) {
      arrayDirections = dataDirections.map((item) => {
        return { value: item };
      });
      setFetchedDirections(arrayDirections);
    }
  }, [isDirectionsFetching]);

  useEffect(() => {
    let arrayStops = [];

    if (dataStops) {
      arrayStops = dataStops.map((item) => {
        return { value: item };
      });
      setFetchedStops(arrayStops);
    }
  }, [isStopsFetching]);

  return {
    fetchedLines,
    fetchedDirections,
    fetchedStops,
  };
};
