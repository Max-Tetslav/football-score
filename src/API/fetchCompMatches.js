import axios from "axios";
import { getCompMatchesAction } from "../store/reducers/compMatchesReducer";

export function getCompMatches(compId) {
  return function(dispatch){
    const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
    const url = `http://api.football-data.org/v2/competitions/${compId}/matches`;

    axios.get(url, {
      headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
      dataType: 'json',
      type: 'GET',
    }).then(res => {
      console.log(res.data);
      dispatch(getCompMatchesAction(res.data.matches));
    }).catch(err => {
      console.log(err);
    });
  };
}
