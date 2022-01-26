const defaultState = {
  teamMatches: [],
}

const GET_TEAM_MATCHES = 'GET_TEAM_MATCHES';

export function teamMatchesReducer (state = defaultState, action) {
  switch (action.type) {
    case GET_TEAM_MATCHES: 
      return {...state, teamMatches: [...action.payload]};
    default: 
      return state;
  }
}

export function getTeamMatchesAction(payload) {
  return {type: GET_TEAM_MATCHES, payload};
}