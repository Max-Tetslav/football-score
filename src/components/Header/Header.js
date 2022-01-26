import React from "react";
import cl from './Header.module.scss';
import Nav from "./Nav/Nav";
import { Link } from "react-router-dom";
import App from '../../app/App'

export default function Header(){
  return (
    <header className={cl.header}>
      <div className={cl.titleContainer}>
        <div className={cl.logo}></div>
        <Link className={cl.title} to='/' element={<App/>}>Your SCORES</Link>
      </div>
      <Nav/>
    </header>
  );
}