import settings from '../../@types/settings';
import { ActionTypes } from '../../constants';

const initialState = {
    scheme: null,
    colors: {},
    constants: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_SCHEME:
            return {
                ...state,
                scheme: action.value,
            };
        case ActionTypes.SET_COLORS:
            return {
                ...state,
                colors: action.value,
            };
        case ActionTypes.SET_CONSTANTS:
            return {
                ...state,
                constants: action.value,
            };
        default:
            return state;
    }
};
