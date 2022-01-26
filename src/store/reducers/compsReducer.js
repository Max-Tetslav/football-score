const defaultState = {
  comps : []
};

const GET_COMPS = 'GET_COMPS';

export function compsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_COMPS:
      return {...state, comps: [...action.payload]};
    default: 
      return state;
  }
}
  
export function getCompetitionsAction(payload){
  return { type: GET_COMPS, payload };
}
