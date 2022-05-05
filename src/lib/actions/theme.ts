import { ActionTypes } from "../constants"

export const themeRedux = {
    setScheme: (scheme) => (dispatch) => {
        dispatch({ type: ActionTypes.SET_SCHEME, value: scheme })
    },
    setColors: (colors) => (dispatch) => {
        dispatch({ type: ActionTypes.SET_COLORS, value: colors })
    },
    setConstants: (constants) => (dispatch) => {
        dispatch({ type: ActionTypes.SET_CONSTANTS, value: constants })
    },
}