import React from "react";
import cl from './NavHeader.module.scss';
import ListTitle from "../ListTitle/ListTitle";
import TaskForm from "../../TaskForm/TaskForm";

export default function NavHeader(props){
  return (
    <div className={cl.header}>
      <ListTitle title={props.type === 'team' ? 'Teams' : 'Competitions'}/>
      <TaskForm placeholder="Search..." buttonValue="Apply"/>
    </div>
  );
}