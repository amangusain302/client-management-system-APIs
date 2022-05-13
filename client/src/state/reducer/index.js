import {combineReducers} from 'redux';
import ProposalReducer from './proposalReducer';
import UserReducer from './userReducer';


const reducers = combineReducers({
      UserReducer,
      
})
export default reducers;