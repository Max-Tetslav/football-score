import { combineReducers } from 'redux';
import compsReducer from './compsReducer';
import calendarReducer from './calendarReducer';
import teamsReducer from './teamsReducer';
import currentPageReducer from './currentPageReducer';

const rootReducer = combineReducers({
  comps: compsReducer,
  calendar: calendarReducer,
  teams: teamsReducer,
  currentPage: currentPageReducer,
});

export default rootReducer;
