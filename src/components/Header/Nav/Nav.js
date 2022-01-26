import React from "react";
import cl from './Nav.module.scss';
import { NavLink } from "react-router-dom";

export default function Nav(){
  return (
    <nav className={cl.navContainer}>
        <NavLink to='/comps'>Comps</NavLink>
        <NavLink to='/teams'>Teams</NavLink>
    </nav>
  );
}