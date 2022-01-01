import { VotingActions } from "./actions"

const INITIAL_STATE = {
  votings: [],
  loadingVotings: false,
  loadingCreatingUser: false,
  votingsFetchError: { error: false, message: '' },
  createVotingError: { error: false, message: '' },
  selectedVoting: undefined,
  loadingSelectedVoting: false,
  selectVotingError: { error: false, message: '' }
}

const votingsReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case VotingActions.GET_VOTINGS: {
      return {
        ...state,
        loadingVotings: true 
      }
    }
    case VotingActions.GET_VOTINGS_SUCCESS: {
      return {
        ...state,
        votings: action.payload
      }
    }
    case VotingActions.SELECT_VOTING: {
      return {
        ...state,
        loadingSelectedVoting: true
      }
    }
    case VotingActions.SELECT_VOTING_SUCCESS: {
      return {
        ...state,
        selectedVoting: action.payload,
        loadingSelectedVoting: false
      }
    }
    case VotingActions.SELECT_VOTING_FAILURE: {
      return {
        ...state,
        selectVotingError: { error: true, message: action.payload },
        loadingVotings: false
      }
    }
    case VotingActions.GET_VOTINGS_FAILURE: {
      return {
        ...state,
        votingsFetchError: { error: true, message: action.payload },
        loadingVotings: false
      }
    }
    case VotingActions.CREATE_VOTING: {
      return {
        ...state,
        loadingCreatingUser: true 
      }
    }
    case VotingActions.CREATE_VOTING_SUCCESS: {
      return {
        ...state,
        loadingCreatingUser: false 
      }
    }
    case VotingActions.CREATE_VOTING_FAILURE: {
      return {
        ...state,
        createVotingError: { error: true, message: action.payload },
        loadingCreatingUser: false
      }
    }
    default: return state
  }
}

export default votingsReducer