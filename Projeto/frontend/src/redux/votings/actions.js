export const VotingActions = {
  GET_VOTINGS: '[Voting] Get Votings',
  GET_VOTINGS_SUCCESS: '[Voting] Get Votings Success',
  GET_VOTINGS_FAILURE: '[Voting] Get Votings Failure',

  CREATE_VOTING: '[Voting] Create Voting',
  CREATE_VOTING_SUCCESS: '[Voting] Create Voting Success',
  CREATE_VOTING_FAILURE: '[Voting] Create Voting Failure',

  DELETE_VOTING: '[Voting] Delete Voting',

  SELECT_VOTING: '[Voting] Select Voting',
  SELECT_VOTING_SUCCESS: '[Voting] Select Voting Success',
  SELECT_VOTING_FAILURE: '[Voting] Select Voting Failure',

  VOTE: '[Voting] Vote'
}

export const vote = (votingId, candidateId, callback) => ({
  type: VotingActions.VOTE,
  payload: { votingId, candidateId, callback }
})

export const getVotings = () => ({
  type: VotingActions.GET_VOTINGS
})

export const selectVoting = (id) => ({
  type: VotingActions.SELECT_VOTING,
  payload: id
})

export const selectVotingSuccess = (voting) => ({
  type: VotingActions.SELECT_VOTING_SUCCESS,
  payload: voting
})

export const selectVotingFailure = (error) => ({
  type: VotingActions.SELECT_VOTING_FAILURE,
  payload: error
})

export const getVotingsSuccess = (votings) => ({
  type: VotingActions.GET_VOTINGS_SUCCESS,
  payload: votings
})

export const getVotingsFailure = (error) => ({
  type: VotingActions.GET_VOTINGS_FAILURE,
  payload: error
})

export const createVoting = (voting, callback) => ({
  type: VotingActions.CREATE_VOTING,
  payload: {
    voting,
    callback
  }
})

export const createVotingSuccess = () => ({
  type: VotingActions.CREATE_VOTING_SUCCESS
})

export const createVotingFailure = (error) => ({
  type: VotingActions.CREATE_VOTING_FAILURE,
  payload: error
})

export const deleteVoting = (id) => ({
  type: VotingActions.DELETE_VOTING,
  payload: id
})