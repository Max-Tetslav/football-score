import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import cl from './MatchesSection.module.scss';
import {  DatePicker, Space } from 'antd';
import 'antd/dist/antd.min.css';
import { useCalendar } from '../../hooks/useCalendar'

import ListTitle from "../NavSection/ListTitle/ListTitle";
import { Match } from "../Match/Match";

const { RangePicker } = DatePicker;


export default function MatchesSection(){
  const [calendarRange, setCalendarRange] = useState([]);
  // const [matches, setMatches] = useState([]);
  const matches = useSelector(state => state.compMatches.compMatches);
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

  console.log(calendarRange);

  // let rangeMatches = useCalendar(calendarRange, matches);


  // useEffect(() => {
  //   const rangeMatches = useCalendar(calendarRange, matches);
  // })

  const rangeMatches = useCalendar(calendarRange, matches);

  console.log(rangeMatches);

  function convertDate(utcDate){
    const date = new Date(utcDate);
    const day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate();
    const month = String(date.getMonth() + 1).length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; 

    return `${day}/${month}/${date.getFullYear()}`;
  }


  return (
    <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20, alignItems: 'center', width: '50vw'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '20%'}}>
          <ListTitle title='Matches'/>
          <Space size={12}>
            <RangePicker
              onChange={(start, end) => {
                setCalendarRange([...end]);
              }}
              format={dateFormatList}/>
          </Space>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', gap: 20, height: '80%', marginBottom: 20, overflow: 'hidden'}}>
            { matches.length
            ? matches.map(item => (
              <Match
                key={item.id}
                homeTeam={item.homeTeam.name}
                awayTeam={item.awayTeam.name}
                homeScore={item.score.fullTime.homeTeam}
                awayScore={item.score.fullTime.awayTeam}
                winner={item.score.winner === 'HOME_TEAM' ? item.homeTeam.name : item.score.winner === 'AWAY_TEAM' ? item.awayTeam.name : false}
                date={convertDate(item.utcDate)}
              />
            ))
            : <p>Нет данных</p>}
        </div>
      </div>
  );
}