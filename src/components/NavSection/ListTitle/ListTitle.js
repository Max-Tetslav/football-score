import React, { Fragment } from "react";
import cl from './ListTitle.module.scss';

export default function ListTitle(props){
  return(
    <Fragment>
      <h2 className={cl.title}>{props.title}</h2>
    </Fragment>
  );
}