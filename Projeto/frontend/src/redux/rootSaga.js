import { all } from 'redux-saga/effects'
import authSagas from './auth/sagas'
import votingSagas from './votings/sagas'

function* rootSaga() {
  yield all([authSagas(), votingSagas()])
}

export default rootSaga