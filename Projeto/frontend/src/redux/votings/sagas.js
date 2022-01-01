import { call, put, takeLatest } from "@redux-saga/core/effects"
import { createVotingFailure, getVotings as getVotingsAction, createVotingSuccess, getVotingsFailure, getVotingsSuccess, VotingActions, selectVotingFailure, selectVotingSuccess } from "./actions"
import { createVoting, deleteVoting, getVoting, getVotings, vote } from "./services"

export default function* votingSagas() {
  yield takeLatest(VotingActions.GET_VOTINGS, getVotingsSaga)
  yield takeLatest(VotingActions.CREATE_VOTING, createVotingSaga)
  yield takeLatest(VotingActions.DELETE_VOTING, deleteVotingSaga)
  yield takeLatest(VotingActions.SELECT_VOTING, selectVotingSaga)
  yield takeLatest(VotingActions.VOTE, voteSaga)
}

function* voteSaga(action) {
  try {
    const { votingId, candidateId, callback } = action.payload 
    yield call(vote, votingId, candidateId)
    callback()
  } catch(err) {
    alert("Erro ao votar. Tente novamente mais tarde.")
  }
}

function* selectVotingSaga(action) {
  const id = action.payload
  try {
    const voting = yield call(getVoting, id) 
    console.log(voting)
    yield put(selectVotingSuccess(voting))
  } catch(err) {
    if(err.response?.data?.message) {
      yield put(selectVotingFailure(err.response.data.message))
    }
    else {
      yield put(selectVotingFailure(err.message))
    }
  }
}

function* getVotingsSaga() {
  try {
    const votings = yield call(getVotings)
    yield put(getVotingsSuccess(votings))
  } catch(err) {
    yield put(getVotingsFailure(err.response.data.message))
  }
}

function* createVotingSaga(action) {
  try {
    const votings = yield call(createVoting, action.payload.voting)
    yield put(createVotingSuccess(votings))
    yield put(getVotingsAction())
    action.payload.callback()
  } catch(err) {
    yield put(createVotingFailure(err.response.data.message))
  }
}

function* deleteVotingSaga({ payload }) {
  try {
    console.log(payload)
    const id = payload
    yield call(deleteVoting, id)
    yield put(getVotingsAction())
  } catch(err) {
    if(err.response?.data?.message) {
      alert(err.response.data.message)
    }
    else {
      alert("Erro ao deletar votação.")
    }
  } 
}
