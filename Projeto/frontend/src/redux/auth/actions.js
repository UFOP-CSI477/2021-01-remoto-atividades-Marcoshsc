export const AuthActions = {
  LOGIN_USER: '[Auth] Login User',
  LOGIN_USER_SUCCESS: '[Auth] Login User Success',
  LOGIN_USER_FAILURE: '[Auth] Login User Failure',

  SIGNUP_USER: '[Auth] Signup User'
}

export const loginUser = (email, password) => ({
  type: AuthActions.LOGIN_USER,
  payload: { email, password }
})

export const loginUserSuccess = (userInfo) => ({
  type: AuthActions.LOGIN_USER_SUCCESS,
  payload: userInfo
})

export const loginUserFailure = (error) => ({
  type: AuthActions.LOGIN_USER_FAILURE,
  payload: error
})

export const signupUser = (email, username, password) => ({
  type: AuthActions.SIGNUP_USER,
  payload: { email, username, password }
})