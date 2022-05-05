import { ActionTypes } from '../../constants';

const initialState = {
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.value,
      };
    default:
      return state;
  }
};
