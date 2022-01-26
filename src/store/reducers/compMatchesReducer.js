const defaultState = {
  compMatches: []
}

const GET_COMP_MATCHES = 'GET_COMP_MATCHES';

export function compMatchesReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_COMP_MATCHES: 
      return {...state, compMatches: [...action.payload]};
    default:
      return state;
  }
}

export function getCompMatchesAction(payload){
  return {type: GET_COMP_MATCHES, payload}
}
