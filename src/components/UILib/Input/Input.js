import React, { useState } from 'react';
import classes from './Input.module.scss'

export default function MyInput(props){
  return (
    <input {...props} 
    className={classes.myInput}
    value={props.value}
    onChange={(e) => props.filter}
    >
    </input>
  );
}