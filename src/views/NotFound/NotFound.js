import React from "react";
import cl from './NotFound.module.scss';

export default function NotFound(){
  return (
    <div className={cl.errContainer}>
      <h1>Sorry, page not found...</h1>
    </div>
  );
}