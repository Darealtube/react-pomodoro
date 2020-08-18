import React, {useState, useEffect} from 'react';
import './main.css';

function Pomodoro() {
  const [breaks,setbreaks] = useState(1);
  const [session,setsession] = useState(1);
  const [able,setable] = useState(true);
  const [second,setsecond] = useState("00");
  const [minute,setminute] = useState(1);

  function reset(){
    setbreaks(1);
    setsession(1);
    setable(true);
    setsecond("00");
    setminute(1);
  }

 useEffect(()=>{ setminute(session) },[session]);

 useEffect(()=> {
     if(able === false){
       setminute(prevminute => prevminute >=0 && second === "59"? prevminute - 1 : prevminute);
   }
 },[second,able])

 useEffect(()=>{
  if(able === false){
  var lol = setInterval(()=>{
    setsecond(prevsecond => prevsecond === "00" && minute !== 0? "59" : prevsecond == "10" || prevsecond < "10"? ("0").concat(prevsecond - 1) : prevsecond - 1);
  }, 1000);
}
},[able])

  return (
    <div>
       <body>
         <h1 className="title">Pomodoro Clock</h1>
         <br/>

           <div className="counter">
           <div className="break">
           <h1>Break Length</h1>
           <button disabled={!able} onClick={()=> setbreaks(prevbreaks => prevbreaks > 1? breaks - 1 : prevbreaks)}>-</button>
           <span className="lol">{breaks}</span>
           <button disabled={!able}  onClick={()=> setbreaks(prevbreaks => prevbreaks < 60? breaks + 1 : prevbreaks)}>+</button>
           </div>
           <span>
           <div className="session">
           <h1>Session Length</h1>
           <button disabled={!able} onClick={()=> setsession(prevsession => prevsession > 1? session - 1 : prevsession)}>-</button>
           <span className="lol">{session}</span>
           <button disabled={!able} onClick={()=> setsession(prevsession => prevsession < 60? session + 1 : prevsession)}>+</button>
           </div>
           </span>
           </div>

           <div className="timer">
              <div className="clock">
              <h3>Session Time</h3>
              <h1>{minute}:{second}</h1>
              </div>
           </div>

           <div className="play">
              <button className="bot" onClick={()=> setable(prevable => !prevable)}>{able? String.fromCharCode(parseInt("2bc8",16)) : (String.fromCharCode(parseInt("275a",16)) + String.fromCharCode(parseInt("275a",16)))}</button>
              <span><button onClick={reset}>&#8634;</button></span>
           </div>
       </body>
    </div>
  );
}

export default Pomodoro;
