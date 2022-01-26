import { getCompetitionsAction } from "../store/reducers/compsReducer";
import axios from "axios";

export function fetchComps(){
  return function(dispatch){
    const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
    const url = `http://api.football-data.org/v2/competitions?plan=${'TIER_ONE'}`;
  
    axios.get(url, {
      headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
      dataType: 'json',
      type: 'GET',
    }).then(res => {
      dispatch(getCompetitionsAction(res.data.competitions));
    }).catch(err => {
      console.log(err);
    });
  }
}