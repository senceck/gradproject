// import geoViewport from 'geo-viewport';
// import _ from 'lodash';
// import {Dimensions} from 'react-native';
// import * as turf from '@turf/turf';

// const {height: windowHeight, width: windowWidth} = Dimensions.get('screen');

// export const getMapCenterPoint = ({
//   longitude,
//   longitudeDelta,
//   latitude,
//   latitudeDelta,
// }) => {
//   const bounds = [
//     longitude - longitudeDelta,
//     latitude - latitudeDelta,
//     longitude + longitudeDelta,
//     latitude + latitudeDelta,
//   ];
//   let {
//     center: [lng, lat],
//   } = geoViewport.viewport(bounds, [windowHeight, windowWidth]);
//   return {longitude: lng, latitude: lat};
// };

// export const getMapZoomLevel = ({
//   longitude,
//   longitudeDelta,
//   latitude,
//   latitudeDelta,
// }) => {
//   const bounds = [
//     longitude - longitudeDelta,
//     latitude - latitudeDelta,
//     longitude + longitudeDelta,
//     latitude + latitudeDelta,
//   ];
//   let {zoom} = geoViewport.viewport(bounds, [windowHeight, windowWidth]);
//   return zoom;
// };

// export const getDistanceBetween = (p1, p2) => {
//   const from = turf.point([p1.longitude, p1.latitude]);
//   const to = turf.point([p2.longitude, p2.latitude]);
//   return turf.distance(from, to);
// };

// export const getCenterOfPolygon = (coordinates) => {
//   const features = turf.points(coordinates);
//   const center = turf.center(features);
//   return {
//     lat: center.geometry.coordinates[0],
//     lng: center.geometry.coordinates[1],
//   };
// };

// export const pointsEqual = (p1, p2, accurecy = 4) => {
//   if (p1 && p2 && _.has(p1, ['lat']) && _.has(p1, 'lat')) {
//     return (
//       +p1.lat.toFixed(accurecy) === +p2.lat.toFixed(accurecy) &&
//       +p1.lng.toFixed(accurecy) === +p2.lng.toFixed(accurecy)
//     );
//   }
//   return false;
// };
