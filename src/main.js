import React, {useState, useEffect, useReducer} from 'react';
import './main.css';

//&#9208; PAUSE
function reducer(state,action){
  switch(action.type){
    case "decrementbreak":
    return {...state,breakcount: state.breakcount > 1? state.breakcount - 1 : state.breakcount};
    break;
    case "incrementbreak":
    return {...state,breakcount: state.breakcount < 60? state.breakcount + 1 : state.breakcount};
    break;
    case "decrementsession":
    return {...state,sessioncount: state.sessioncount > 1? state.sessioncount - 1 : state.sessioncount};
    break;
    case "incrementsession":
    return {...state,sessioncount: state.sessioncount < 60? state.sessioncount + 1 : state.sessioncount};
    break;
    case "reset":
    return {breakcount: 1, sessioncount: 1};
    break;
  }
}

function Pomodoro() {
  const [state,dispatch] = useReducer(reducer, { breakcount : 1, sessioncount: 1, })

  return (
    <div>
       <body>
         <h1 className="title">Pomodoro Clock</h1>
         <br/>

           <div className="counter">
           <div className="break">
           <h1>Break Length</h1>
           <button onClick={()=>{dispatch({type: "decrementbreak"})}}>-</button>
           <span className="lol">{state.breakcount}</span>
           <button onClick={()=>{dispatch({type: "incrementbreak"})}}>+</button>
           </div>
           <span>
           <div className="session">
           <h1>Session Length</h1>
           <button onClick={()=>{dispatch({type: "decrementsession"})}}>-</button>
           <span className="lol">{state.sessioncount}</span>
           <button onClick={()=>{dispatch({type: "incrementsession"})}}>+</button>
           </div>
           </span>
           </div>

           <div className="timer">
              <div className="clock">
              <h3>Session Time</h3>
              <h1>{state.sessioncount}:00</h1>
              </div>
           </div>

           <div className="play">
              <button>&#11208;</button>
              <span><button onClick={()=>{dispatch({type: "reset"})}}>&#8634;</button></span>
           </div>
       </body>
    </div>
  );
}

export default Pomodoro;
