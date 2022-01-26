import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import cl from './Comps.module.scss';
import { CompsList } from "../../components/CompsList/CompsList";
import MatchesSection from "../../components/MatchesSection/MatchesSection";
import { getCompMatches } from "../../API/fetchCompMatches";

export function CompsView(){
  // const [comps, setComps] = useState([]);
  // const [matches, setMatches] = useState([]);

  // useEffect(async () => {
  //   const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
  //   const url = `http://api.football-data.org/v2/competitions?plan=${'TIER_ONE'}`;
    
  //   await axios.get(url, {
  //     headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
  //     dataType: 'json',
  //     type: 'GET',
  //   }).then(res => {
  //     console.log(res.data);
  //     setComps(res.data);
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }, []);

  // useEffect(async () => {
  //   getCompMatches(setMatches);
    
  //   return () => setMatches([]);
  // }, matches)
  return (
    <div className={cl.container}>
      <CompsList handleCompClick={getCompMatches}/>
      <MatchesSection/>
    </div>
  );
}