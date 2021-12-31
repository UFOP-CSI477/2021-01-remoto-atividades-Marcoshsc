import { call, put, takeLatest } from "@redux-saga/core/effects";
import { AuthActions, fetchUserInfoSuccess, loginUserFailure, loginUserSuccess } from "./actions";
import { fetchUserInfo, login, logout, signup } from "./services";

export default function* authSagas() {
  yield takeLatest(AuthActions.LOGIN_USER, loginUserSaga)
  yield takeLatest(AuthActions.SIGNUP_USER, signupUserSaga)
  yield takeLatest(AuthActions.FETCH_USER_INFO, fetchUserInfoSaga)
  yield takeLatest(AuthActions.LOGOUT_USER, logoutUserSaga)
}

function* logoutUserSaga() {
  try {
    yield call(logout)
  } catch(err) {
    console.log('User not logged, returning to login page.')
  }
}

function* fetchUserInfoSaga() {
  try {
    const user = yield call(fetchUserInfo)
    yield put(fetchUserInfoSuccess(user))
  } catch(err) {
    console.log('User not logged, returning to login page.')
  }
}

function* loginUserSaga(action) {
  const { email, password } = action.payload
  try {
    const user = yield call(login, email, password)
    yield put(loginUserSuccess(user))
  } catch(err) {
    yield put(loginUserFailure(err.response.data.message))
  }
}

function* signupUserSaga(action) {
  try {
    const user = yield call(signup, action.payload)
    yield put(loginUserSuccess(user))
  } catch(err) {
    yield put(loginUserFailure(err.response.data.message))
  }
}