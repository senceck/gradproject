import {useState, useReducer} from 'react';
import _ from 'lodash';

const SET_PAGE = 'SET_PAGE';

const paginationReducer = (state = {page: 0}, action) => {
  switch (action.type) {
    case 'SET_PAGE':
      return {...state, page: action.value};
    default:
      return state;
  }
};

export function usePagination(limit, moreCondition) {
  const [{page = 0}, dispatch] = useReducer(paginationReducer, {page: 0});
  const [count, setCount] = useState(0);

  const resetPageNumber = () => {
    let newPage = 0;
    dispatch({type: SET_PAGE, value: +newPage});
    return newPage;
  };

  const hasMorePages = () => {
    return moreCondition();
  };

  const nextPage = () => {
    let newPage = +page + 1;
    dispatch({type: SET_PAGE, value: newPage});
    return newPage;
  };

  return {page, resetPageNumber, setCount, nextPage, hasMorePages};
}
