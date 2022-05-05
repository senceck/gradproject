import _ from 'lodash';

export function editItemInArray({
  array,
  filter,
  modifications,
}: {
  array: Array<any>;
  filter: Object;
  modifications: Object;
}) {
  const index = _.findIndex(array, filter);
  if (index < 0) {
    return [...array];
  }
  return [
    ...array.slice(0, index),
    {...array[index], ...modifications},
    ...array.slice(index + 1),
  ];
}

export function removeItemInArray({
  array,
  filter,
}: {
  array: Array<any>;
  filter: Object;
}) {
  const index = _.findIndex(array, filter);
  if (index < 0) {
    return [...array];
  }
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
