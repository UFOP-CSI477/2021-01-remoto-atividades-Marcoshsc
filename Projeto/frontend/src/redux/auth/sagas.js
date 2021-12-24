import { delay, put, takeLatest } from "@redux-saga/core/effects";
import { AuthActions, loginUserFailure, loginUserSuccess } from "./actions";

export default function* authSagas() {
  yield takeLatest(AuthActions.LOGIN_USER, loginUserSaga)
  yield takeLatest(AuthActions.SIGNUP_USER, signupUserSaga)
}

function* loginUserSaga(action) {
  yield delay(2000)
  // yield put(loginUserSuccess({ email: 'teste@gmail.com', username: 'Marcoshsc' }))
  yield put(loginUserFailure("Invalid login."))
}

function* signupUserSaga(action) {
  yield delay(2000)
  // yield put(loginUserSuccess({ email: 'teste@gmail.com', username: 'Marcoshsc' }))
  yield put(loginUserFailure("Email already exists."))
}