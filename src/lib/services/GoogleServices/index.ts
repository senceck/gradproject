import axios from "axios";
import { ifArabic } from "../../helpers/locale";

type Location = Array<String>

const GOOGLE_MAPS_API_TARGET = 'https://maps.googleapis.com/maps/api/place';
const API_KEY = 'AIzaSyBrlk4xjhXMOGkNkuk45Yz2spN1FnUPDHU';

const buildUserLocation = (location: Location) => {
  if (!!location && location.length == 2) {
    return `${location[0]},${location[1]}`
  } else {
    return ''
  }
}
//types=[address,geocode]
const buildAutoCompleteUrl = (query: String, location: Location = null) => {
  return `${GOOGLE_MAPS_API_TARGET}/autocomplete/json?input=${query}&key=${API_KEY}&location=${buildUserLocation(location)}${!!location ? `&radius=35000&strictbounds=true` : ''}`;
};

const buildPlacesUrl = placeId => {
  return `${GOOGLE_MAPS_API_TARGET}/details/json?place_id=${placeId}&fields=geometry,formatted_address&key=${API_KEY}`;
};

const buildGeocodingURL = (location: Location) => {
  return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${buildUserLocation(location)}&key=${API_KEY}${ifArabic("&language=ar", "")}`
}

const autoComplete = (query: String, location: Location = null) => {
  let url = buildAutoCompleteUrl(query, location);
  return axios.get('', { baseURL: url }).then((response: any) => {
    return response.predictions;
  });
};

const getPlace = placeId => {
  if (!placeId) {
    return;
  }
  let baseURL = buildPlacesUrl(placeId);
  return axios.get('', { baseURL }).then((response: any) => {
    return response.result;
  });
};


const getPlaceFromLatLng = (location: Location) => {
  let baseURL = buildGeocodingURL(location);
  return axios.get('', {
    baseURL
  }).then((response: any) => {
    return response;
  });
}


export const GooglePlacesService = {
  getPlace,
  autoComplete,
}

export const GoogleGeocodingService = {
  ToPlace: getPlaceFromLatLng
}