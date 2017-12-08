import { combineReducers } from 'redux';
import colorReducer from './reducer_color';

const rootReducer = combineReducers({
  color: colorReducer
});

export default rootReducer;
