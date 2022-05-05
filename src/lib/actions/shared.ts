import { ActionTypes } from "../constants"

export const settingsRedux = {
    set: (data) => (dispatch) => {
        dispatch({ type: ActionTypes.SET_SETTINGS, value: data })
    },
}

export const metadataRedux = {
    set: (data) => (dispatch) => {
        dispatch({ type: ActionTypes.SET_METADATA, value: data })
    },
}
