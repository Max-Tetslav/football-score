import classes from './App.module.scss';
import { Route, Routes, Link, NavLink } from "react-router-dom";
import { Fragment, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ListLink from '../components/NavSection/ListLink/ListLink';
import NavHeader from '../components/NavSection/NavHeader/NavHeader';
import { Match } from '../components/Match/Match';
import ListTitle from '../components/NavSection/ListTitle/ListTitle';
import TaskForm from '../components/TaskForm/TaskForm';
import {  DatePicker, Space } from 'antd';
import 'antd/dist/antd.min.css';
import MyInput from '../components/UILib/Input/Input';
import { CompsList } from '../components/CompsList/CompsList';
import { useSearching } from '../hooks/useSearching';

const { RangePicker } = DatePicker;


const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';

function App() {
  const [comps, setComps] = useState([]);
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  // useEffect(() => {
  // const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
  //   const url = `http://api.football-data.org/v2/competitions?plan=${'TIER_ONE'}`;
  
  //   axios.get(url, {
  //     headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
  //     dataType: 'json',
  //     type: 'GET',
  //   }).then(res => {
  //     console.log(res.data);
  //     setComps(res.data.competitions.sort((a, b) => a.name.length - b.name.length));
  //   }).catch(err => {
  //     console.log(err);
  //   });
  // }, []);

  async function getTeams(code){
    const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
    const url = `http://api.football-data.org/v2/competitions/${code}/teams`;
  
    axios.get(url, {
      headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
      dataType: 'json',
      type: 'GET',
    }).then(res => {
      console.log(res.data.teams);
      setTeams(res.data.teams.sort((a, b) => a.name.length - b.name.length));
    }).catch(err => {
      console.log(err);
    });
  }

  async function getAllMatches(code){
    const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
    const url = `http://api.football-data.org/v2/competitions/${code}/matches`;
  
    axios.get(url, {
      headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
      dataType: 'json',
      type: 'GET',
    }).then(res => {
      console.log(res.data);
      setMatches(res.data.matches);
   }).catch(err => {
      console.log(err);
    });
  }

  async function getTeamMatches(id){
    const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
    const url = `http://api.football-data.org/v2/teams/${id}/matches`;

    axios.get(url, {
      headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
      dataType: 'json',
      type: 'GET',
    }).then(res => {
      console.log(res.data);
      setMatches(res.data.matches);
    }).catch(err => {
      console.log(err);
    });
  }

  function convertDate(utcDate){
    const date = new Date(utcDate);
    const day = String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate();
    const month = String(date.getMonth() + 1).length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1; 

    return `${day}/${month}/${date.getFullYear()}`;
  }

  const style = {
    width: '100%',
    maxWidth: 360,
    height: '100vh',
    backgroundColor: 'black',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  }

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

  function useSearching(string, data){
    const searchingItems = useMemo(() => {
      return data.filter(item => item.name.toLocaleLowerCase().includes(string.toLocaleLowerCase()));
    },[string, data]);

    return searchingItems;
  }

  function useCalendar(range ,data){
    const rangeMatches = useMemo(() => {
      return data.filter(item => {
        const start = range[0].split('/').reverse().map((item, index) => {
          if(index === 1){
            item = Number(item) - 1;
          }
          return Number(item);
        });

        const end = range[1].split('/').reverse().map((item, index) => {
          if(index === 1){
            item = Number(item) - 1;
          }
          return Number(item);
        });

        const itemDate = new Date(item.utcDate).getTime();
        const startRange = new Date(...start).getTime();
        const endRange = new Date(...end).getTime();

        return itemDate >= startRange && itemDate <= endRange;
      })
    }, []);

    return rangeMatches;
  }

  // const [searchComp, setSearchComp] = useState('');
  const [searchTeam, setSearchTeam] = useState('');
  const [calendarRange, setCalendarRange] = useState([]);

  // const searchingComps = useSearching(searchComp, comps);
  const searchingTeams = useSearching(searchTeam, teams);
  const rangeMatches = useCalendar(calendarRange, matches);

  return (
    <div style={{display: 'flex', height: '100%'}}>
      {/* <div style={{width: '25vw', height: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' ,height: '20%'}}>
          <ListTitle title='Competitions'/>
          <input
            value={searchComp}
            onChange={(e) => {
              setSearchComp(e.target.value);
            }}
          />
        </div>
        <nav style={{display: 'flex', flexDirection: 'column', height: '80%'}}>
          <ul style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-around', gap: '10px 10px'}}>
            {searchingComps.length 
              ? searchingComps.map(item => (
                <ListLink 
                  type='comp'
                  code={item.code}
                  name={item.name}
                  key={item.code}
                  clickHandler={getTeams}
                  getMatches={getAllMatches}
                />
              )) 
              : <p>Нет данных</p>}
          </ul>
        </nav>
      </div> */}
      <CompsList/>
      <div style={{width: '25vw', height: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: '20%'}}>
          <ListTitle title='Teams'/>
          <input
            value={searchTeam}
            onChange={(e) => {
              setSearchTeam(e.target.value);
            }}
          />
        </div>
        <nav style={{display: 'flex', flexDirection: 'column', height: '80%'}}>
          <ul style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-around', gap: '10px 10px'}}>
            {searchingTeams.length 
              ? searchingTeams.map(item => (
                <ListLink
                type='team'
                code={item.code || null}
                teamId={item.id || null}
                name={item.name}
                key={item.code || item.id}
                getTeamMatches={getTeamMatches}
                />
              )) 
              : <p>Choose competition</p>}
          </ul>
        </nav>
      </div>
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
            { rangeMatches.length 
            ? rangeMatches.map(item => (
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
       
    </div>
  );
}

export default App;
