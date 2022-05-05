import settings from '../../@types/settings';
import { ActionTypes } from '../../constants';



const initialState = {
  settings: null,
  metadata: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_SETTINGS:
      return {
        ...state,
        settings: action.value,
      };
    case ActionTypes.SET_METADATA:
      return {
        ...state,
        metadata: action.value,
      };
    default:
      return state;
  }
};
