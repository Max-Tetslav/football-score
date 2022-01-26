import React from 'react';
import classes from './Button.module.scss'

export default function MyButton(props){
  console.log(classes.button)
  return (
    <button className={classes.button}>{props.value}</button>
  );
}