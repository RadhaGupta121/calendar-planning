import React, { useEffect } from 'react';
import TimeZone from './TimeZone';
import WorkingZone from './WorkingZone';
import { useState } from 'react';
function Nav(props) {
   let[nowDate,setNowDate]=useState(new Date().getDate());
    let date=new Date();
    const month = date.toLocaleString('default', { month: 'short' });
    
    let IndiaTime = date.toLocaleString("en-US",{timeZone: 'IST'});
   let EuropeTime=date.toLocaleString('en-US',{timeZone:'Europe/Athens'})
    const[currentSelection,setCurrentSelection]=useState('europe');
       const[currentTime,setCurrentTime]=useState(EuropeTime);
   
   
   console.log(currentSelection);
  
   console.log(IndiaTime,EuropeTime);
   function handleChange(e)
   {
    console.log(e.target.value);
    if(e.target.value==='europe')
     {        //date.toLocaleString('default', { month: 'short' });
        setCurrentTime(date.toLocaleString('en-US',{timeZone:'CET'}));
    }
    else{
        setCurrentTime(date.toLocaleString('en-US',{timeZone:'IST'}))
    }
    setCurrentSelection(e.target.value)
   }

//    WorkingZones
let days=['Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday','Sunday'];
const months=['Jan','Feb','March','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
  let currentDate=date.getDate();
  let currentDay=date.getDay();
  let currentMonth=date.getMonth();
 
  // let EuropeTime=date.toLocaleString('en-US',{timeZone:'Europe/Athens'})
  
  console.log(currentDate,days[currentDay-1],months[currentMonth]);
  
  const timelist=['8:00am','8:30am','9:00am','9:30am','10:00am','10:30am','11:00am','11:30am','12:00pm','12:30pm',
'1:00pm','1:30pm','2:00pm','2:30pm','3:00pm','3:30pm','4:00pm','4:30pm','5:00pm','7:00pm','7:30pm','8:00pm','8:30pm',
'9:00pm','9:30pm','10:00pm','10:30pm','11:00pm'];
  for(let i=currentDay+2;i>=0;i--)
  {
    days.unshift(days.pop());
  }
  let workingdays=days.filter((item)=>item!=='Saturday' && item!=='Sunday')
  console.log(days);

  //
  function ShowprevWeek()
  {
    let prevDate=date.getDate()-7;
    let prevDay=date.getDay();
    let prevMonth=date.getMonth();
    console.log(prevDate+"/"+months[prevMonth],days[(prevDay+1)%days.length]);
    setNowDate((prev)=>prev-7);
    console.log("Now date",nowDate);
  }
  function ShowNextvWeek()
  {
    let nextDate=date.getDate()+7;
    let nextDay=date.getDay();
    let prevMonth=date.getMonth();
    console.log(nextDate+"/"+months[prevMonth],days[(nextDay+1)%days.length]);
    setNowDate((prev)=>prev+7);
    console.log("Now date",nowDate);
  }
    return (
        <>
        <div style={{display:"flex",justifyContent:"space-between"}}>
           <div className='prev'>
                <button onClick={ShowprevWeek} >Previous Week</button>
           </div>
           <div className='current'>
           <h2>{month} {date.getDate()} {date.getFullYear()}{currentTime}</h2>
           </div>
           <div className='next'>
               <button onClick={ShowNextvWeek}>Next week</button>
           </div>
            
        </div>
        <TimeZone handleChange={handleChange} currentSelection={currentSelection} currentTime={currentTime} />
        <WorkingZone days={workingdays} currentDate={currentDate} currentDay={currentDay} currentMonth={currentMonth}
        months={months} timelist={timelist}/>
        </>
    );
}

export default Nav;