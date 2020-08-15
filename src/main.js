import React, {useState, useEffect} from 'react';
import './main.css';


export default Pomodoro(){

 return(
   <div>
      <body>
        <h1>Pomodoro Clock</h1>
        <br/>
          <span>
          <div className="subtract">v</div>
          <div className="clock">00:00</div>
          <div className="add">^</div>
          </span>
      </body>
   </div>
 )
}
