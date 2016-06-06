import { combineReducers } from 'redux';
import counter from '../counter/reducer';
import processes from '../processes/reducer';

const rootReducer = combineReducers({
  counter,
  processes
});

export default rootReducer;
