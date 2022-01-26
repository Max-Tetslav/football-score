import React, { Fragment } from "react";
import cl from './ListLink.module.scss';
import { Link } from "react-router-dom";
import axios from "axios";


export default function ListLink(props){
  
  // async function getTeams(code){
  //   let url = `http://api.football-data.org/v2/competitions/${code}/teams`;
  //   const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
  //   const response = await axios.get(url, {
  //     headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
  //     dataType: 'json',
  //     type: 'GET',
  //   });

  //   console.log(response.data.teams);
  // }

  return (
      <Link
      className={props.teamId ? [cl.link, cl.teamLink].join(' ') : cl.link}
      to={props.code ? `/comps/${props.code}` : `/teams/${props.teamId}`}
      onClick={() => {
        if (props.type === 'team') { 
          props.getTeamMatches(props.teamId)
        } else {
          props.clickHandler(props.code);
          props.getMatches(props.code);
        }
      }}>
      {props.name.toLocaleUpperCase()}
      </Link>
  )
}
