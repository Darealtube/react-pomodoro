import React, {useState, useEffect, useRef} from 'react';
import './main.css';

function Pomodoro() {
  const [breaks,setbreaks] = useState(1);
  const [session,setsession] = useState(1);
  const [able,setable] = useState(null);
  const [second,setsecond] = useState("00");
  const [minute,setminute] = useState(1);
  const lol = useRef(null);
  const [switches, setswitches] = useState(false);
  const audioEl = document.getElementsByClassName("audio-element")[0]
  const times = useRef(null);

 //HANDLES RESET
  function reset(){
    setbreaks(1);
    setsession(1);
    setable(null);
    setsecond("00");
    setminute(1);
    clearInterval(lol.current);
  }

  //HANDLES RESET ALL
  function rewind(){
    setbreaks(1);
    setsession(1);
    setable(null);
    setsecond("00");
    setminute(1);
    clearInterval(lol.current);
    setswitches(false);
  }

//HANDLES SESSION TO BREAK CHANGE AND BREAK TO SESSION CHANGE;
 useEffect(()=>{
   if(switches === false){
   if(second === "00" && minute === 0){
     setswitches(true);
     setminute(breaks);
     setsecond("00");
     audioEl.play();
   }
 }
 },[second,minute,able,switches]);

 useEffect(()=>{
   if(switches === true){
   if(second === "00" && minute === 0){
     setswitches(false);
     setminute(session);
     setsecond("00");
     audioEl.play();
   }
  }
 },[second,minute,switches]);

 //MINUTE WILL CHANGE WHEN SESSION CHANGES
 useEffect(()=>{
   if(switches === false){
   setminute(session)
 }
 },[session,switches]);

 useEffect(()=>{
   if(switches === true){
    setminute(breaks)
  }
 },[switches,breaks]);

 //HANDLES MINUTE CHANGE
 useEffect(()=> {
     if(able === false){
      times.current = setTimeout(()=>{
       setminute(prevminute => second === "00"? prevminute - 1 : prevminute);
     }, 1010);
   }
     if(able === true){
       clearTimeout(times.current);
     }
 },[second,able])

//HANDLES THE SECONDS COUNTDOWN, TRANSITION FROM 00 TO 59, AND CLEARINTERVAL WHEN PAUSING
 useEffect(()=>{
  if(able === false){
  lol.current = setInterval(()=>{
    setsecond(prevsecond => prevsecond === "00" && minute !== 0? "59" : prevsecond == "10" || prevsecond < "10"? ("0").concat(prevsecond - 1) : prevsecond - 1);
  }, 1000);
 }
 if(able === true){
   clearInterval(lol.current);
 }
},[able])

//HANDLES SESSION TIME AND BREAK TIME CHANGE WHEN PAUSED AND SESSION OR BREAK IS INCREASED OR DECREASED
useEffect(()=>{
  if(switches === false){
  setsecond("00")
  }
},[session,switches]);

useEffect(()=>{
  if(switches === true){
  setsecond("00");
  }
},[breaks,switches]);

//HANDLES PLAY AND PAUSE
function play(){
  setable(prevable => prevable === null? false : prevable === false? true : prevable === true? false : null);
}


  return (
    <div>
       <body>
         <h1 className="title">Pomodoro Clock</h1>
         <br/>

           <div className="counter">
           <div className="break">
           <h1>Break Length</h1>
           <button disabled={able === false} onClick={()=> setbreaks(prevbreaks => prevbreaks > 1? breaks - 1 : prevbreaks)}>-</button>
           <span className="lol">{breaks}</span>
           <button disabled={able === false}  onClick={()=> setbreaks(prevbreaks => prevbreaks < 60? breaks + 1 : prevbreaks)}>+</button>
           </div>
           <span>
           <div className="session">
           <h1>Session Length</h1>
           <button disabled={able === false} onClick={()=> setsession(prevsession => prevsession > 1? session - 1 : prevsession)}>-</button>
           <span className="lol">{session}</span>
           <button disabled={able === false} onClick={()=> setsession(prevsession => prevsession < 60? session + 1 : prevsession)}>+</button>
           </div>
           </span>
           </div>

           <div className="timer">
              <div className="clock">
              <h3>{switches? "Break" : "Session"} Time</h3>
              <h1 style={minute < 1? {color: "red"} : {color: "#ddcfd1"}}>{minute}:{second}</h1>
              </div>
           </div>

           <div className="play">
              <button className="bot" onClick={play}>{able === null || able === true? String.fromCharCode(parseInt("2bc8",16)) : (String.fromCharCode(parseInt("275a",16)) + String.fromCharCode(parseInt("275a",16)))}</button>
              <span><button onClick={reset}>&#8634;</button></span>
              <button className="all" onClick={rewind}>&#128472;</button>
           </div>
       </body>
       <audio className="audio-element">
          <source src="https://assets.coderrocketfuel.com/pomodoro-times-up.mp3"></source>
        </audio>
    </div>
  );
}

export default Pomodoro;
