import { AuthActions } from "./actions"

const INITIAL_STATE = {
  currentUser: undefined,
  loadingUser: false,
  authError: { error: false, message: '' }
}

const authReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case AuthActions.LOGIN_USER:
    case AuthActions.SIGNUP_USER: {
      return {
        ...state,
        loadingUser: true
      }
    }
    case AuthActions.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loadingUser: false,
        currentUser: action.payload,
        authError: { error: false, message: '' }
      }
    }
    case AuthActions.FETCH_USER_INFO_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
      }
    }
    case AuthActions.LOGOUT_USER: {
      return {
        ...state,
        currentUser: undefined
      }
    }
    case AuthActions.LOGIN_USER_FAILURE: {
      return {
        ...state,
        loadingUser: false,
        authError: { error: true, message: action.payload }
      }
    }
    default: return state
  }
}

export default authReducer