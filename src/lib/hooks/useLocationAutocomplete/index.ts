import {useState} from 'react';
import _ from 'lodash';
import useUpdateEffect from '../useUpdateEffect';
import { GooglePlacesService } from '../../services/GoogleServices';

function useLocationAutocomplete() {
  const [query, setQuery] = useState(null);
  const [selectedPlaceId, setSelectedPlaceId] = useState<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [results, setResults] = useState([]);

  useUpdateEffect(() => {
    fetchResults();
  }, [query]);
  useUpdateEffect(() => {
    if (selectedPlaceId) {
      fetchPlace();
    }
  }, [selectedPlaceId]);
  const fetchPlace = async () => {
    let {
      formattedAddress,
      geometry: {
        location: {lat: latitude, lng: longitude},
      },
    } = await GooglePlacesService.getPlace(selectedPlaceId);
    setQuery(formattedAddress);
    setSelectedPlace({latitude, longitude});
  };
  const fetchResults = _.debounce(async () => {
    let results = await GooglePlacesService.autoComplete(query);
    setResults(results);
  }, 300);

  return {
    results,
    query,
    setQuery,
    setSelectedPlaceId,
    selectedPlace,
  };
}

export default useLocationAutocomplete;
