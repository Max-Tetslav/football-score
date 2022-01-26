import React from "react";
import cl from './NavList.module.scss';
import ListLink from "../ListLink/ListLink";

export default function NavList(props){
  return (
    <nav className={cl.nav}>
      <ul className={cl.list} style={{display: 'flex', flexDirection: 'column'}}>
        {props.data.length 
          ? props.data.map(item => (
            <ListLink code={item.code} name={item.name} key={item.code}/>
          )) 
          : <p>Нет данных</p>}
      </ul>
    </nav>
  );
}