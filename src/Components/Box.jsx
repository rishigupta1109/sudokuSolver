import React, {useState} from 'react'
import "../Css/Box.css";
export default function Box(props) {
    let classes=`box ${props.class}`;
    const changeHandler=(e)=>{
        console.log(isNaN(Number(e.target.value)));
        if(!isNaN(Number(e.target.value))){
            props.set(props.x,props.y,e.target.value)
        }
    }
  return (
    <div className={classes}>
    
        <input type="text" onChange={changeHandler} maxLength={1} value={props.data}></input>
    </div>
  )
}
