import { useEffect, useState } from 'react';
import { useGetAutocompleteQuery } from 'store';

export const useAutocompletion = () => {
  const { data: autocompleteData, isFetching } = useGetAutocompleteQuery();
  const [fetchedAutocomplete, setFetchedAutocomplete] = useState({});

  useEffect(() => {
    let autocompleteLines = [];
    let autocompleteDirections = [];
    let autocompleteStops = [];

    if (autocompleteData) {
      autocompleteLines = autocompleteData.lines.map((item) => {
        return { value: item };
      });
      autocompleteDirections = autocompleteData.directions.map((item) => {
        return { value: item };
      });
      autocompleteStops = autocompleteData.stops.map((item) => {
        return { value: item };
      });

      setFetchedAutocomplete({
        lines: autocompleteLines,
        directions: autocompleteDirections,
        stops: autocompleteStops,
      });
    }
  }, [isFetching]);

  return fetchedAutocomplete;
};
