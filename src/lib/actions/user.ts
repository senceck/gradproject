import { ActionTypes } from "../constants"

const userRedux = {
    setUser: (data) => (dispatch) => {
        dispatch({ type: ActionTypes.SET_USER, value: data })
    },
    setToken: (data) => (dispatch) => {
        dispatch({ type: ActionTypes.SET_SESSION_TOKEN, value: data })
    },
    setNotificationToken: (data) => (dispatch) => {
        dispatch({ type: ActionTypes.SET_NOTIFICATION_TOKEN, value: data })
    },
    clear: () => (dispatch) => {
        dispatch({ type: ActionTypes.SET_USER, value: null })
        dispatch({ type: ActionTypes.SET_SESSION_TOKEN, value: null })
        dispatch({ type: ActionTypes.SET_NOTIFICATION_TOKEN, value: null })
    }
}

export default userRedux