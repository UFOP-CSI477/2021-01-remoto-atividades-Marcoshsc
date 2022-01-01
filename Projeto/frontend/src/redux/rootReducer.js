import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import votingsReducer from "./votings/reducer";

const rootReducer = combineReducers({ auth: authReducer, voting: votingsReducer })

export default rootReducer