import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { compsReducer } from './reducers/compsReducer';
import { compMatchesReducer } from './reducers/compMatchesReducer';
import { teamMatchesReducer } from './reducers/teamMatchesReducer';

const rootReducer = combineReducers({
  comps: compsReducer,
  compMatches: compMatchesReducer,
  teamMatches: teamMatchesReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
