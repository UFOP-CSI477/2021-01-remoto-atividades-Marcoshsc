export const AuthActions = {
  LOGIN_USER: '[Auth] Login User',
  LOGIN_USER_SUCCESS: '[Auth] Login User Success',
  LOGIN_USER_FAILURE: '[Auth] Login User Failure',

  FETCH_USER_INFO: '[Auth] Fetch User Info',
  FETCH_USER_INFO_SUCCESS: '[Auth] Fetch User Info Success',

  LOGOUT_USER: '[Auth] Logout User',

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

export const fetchUserInfo = () => ({
  type: AuthActions.FETCH_USER_INFO
})

export const fetchUserInfoSuccess = (user) => ({
  type: AuthActions.FETCH_USER_INFO_SUCCESS,
  payload: user
})

export const logoutUser = () => ({
  type: AuthActions.LOGOUT_USER
})