import React from "react";
import cl from './Match.module.scss';

export function Match(props) {
  return (
    <div  className={cl.matchContainer}>
      <div>
        <p style={{margin: 0}}>{props.date}</p>
      </div>
      <div className={cl.teamsContainer}>
        <div className={cl.teamContainer}>
          <p className={props.winner === props.homeTeam ? [cl.team, cl.winner].join(' ') : cl.team}>
            {`Home: ` + props.homeTeam}
            <span className={cl.score}>{typeof props.homeScore === 'number' ? props.homeScore : ' - '}</span>
          </p>
        </div>
        <div className={cl.teamContainer}>
          <p className={props.winner === props.awayTeam ? [cl.team, cl.winner].join(' ') : cl.team}>
            {`Away: ` + props.awayTeam}
            <span className={cl.score}>{typeof props.awayScore === 'number' ? props.awayScore : ' - '}</span>
          </p>
        </div>
      </div>
    </div>
  );
}