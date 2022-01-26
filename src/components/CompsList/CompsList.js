import React, { Fragment, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import cl from './CompsList.module.scss';
import { useSearching } from "../../hooks/useSearching";
import ListTitle from "../NavSection/ListTitle/ListTitle";
import ListLink from "../NavSection/ListLink/ListLink";
import { useDispatch, useSelector } from 'react-redux';
import { fetchComps } from "../../API/fetchComps";

export function CompsList(props){
  // console.log(props.comps)
  // const [comps, setComps] = useState(props.comps);
  // const [searchComp, setSearchComp] = useState('');
  // const searchingComps = useSearching(searchComp, comps);
  const dispatch = useDispatch();

  const comps = useSelector(state => state.comps.comps);

  useEffect(() => {
    dispatch(fetchComps())
  }, []);

  console.log(comps);
  

  // const [matches, setMatches] = useState([]);
  // const [teams, setTeams] = useState([]);


  // async function getAllMatches(code){
  //   const FOOTBALL_API = '62a1e77b1f7b415eb72701a665d74b02';
  //   const url = `http://api.football-data.org/v2/competitions/${code}/matches`;
  
  //   axios.get(url, {
  //     headers: { 'X-Auth-Token': `${FOOTBALL_API}` },
  //     dataType: 'json',
  //     type: 'GET',
  //   }).then(res => {
  //     console.log(res.data);
  //     setMatches(res.data.matches);
  //  }).catch(err => {
  //     console.log(err);
  //   });
  // }

  return (
    <Fragment>
      <div style={{width: '25vw', height: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' ,height: '20%'}}>
          <ListTitle title='Competitions'/>
          <input
            // value={searchComp}
            // onChange={(e) => {
            //   setSearchComp(e.target.value);
            // }}
          />
        </div>
        <nav style={{display: 'flex', flexDirection: 'column', height: '80%'}}>
          <ul style={{display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-around', gap: '10px 10px'}}>
            {comps.length 
              ? comps.map(item => (
                <a
                  key={item.code}
                  className={cl.link}
                  onClick={(e) => {
                      e.preventDefault();
                      dispatch(props.handleCompClick(item.code));
                    }
                  }
                  >
                  {item.name.toLocaleUpperCase()}
                </a>
              )) 
              : <p>Нет данных</p>}
          </ul>
        </nav>
      </div>
    </Fragment>
  );
}