import React, { useState } from "react";
import cl from './NavSection.module.scss';
import NavHeader from "./NavHeader/NavHeader";
import NavList from "./NavList/NavList";
import axios from "axios";
import useFetching from "../../hooks/useFetching";

export default function NavSection(props){
  // const [teams, setTeams] = useState([]);
  // const [fetchTeams, loading, error] = useFetching(async () => {
  //   let url = `http://api.football-data.org/v2/competitions/${props.code}/teams`;
  //   const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
  //   const response = await axios.get(url, {
  //     headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
  //     dataType: 'json',
  //     type: 'GET',
  //   });

  //   setTeams(response.data.teams);
  // });

  return(
    <div className={cl.section}>
      <NavHeader type={props.type}/>
      <NavList data={props.data}></NavList>
    </div>
  );
}