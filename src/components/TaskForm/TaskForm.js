import React from 'react';
import classes from './TaskForm.module.scss'
import MyButton from '../UILib/Button/Button';
import MyInput from '../UILib/Input/Input';

export default function TaskForm(props){
  return (
    <div className={classes.taskForm}>
      <MyInput placeholder={props.placeholder}/>
      {/* <MyButton value={props.buttonValue}/> */}
    </div>
  );
}