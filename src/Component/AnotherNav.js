import React, { useEffect } from 'react';
import TimeZone from './TimeZone';
import WorkingZone from './WorkingZone';
import { useState,useRef } from 'react';

function AnotherNav(props) {
  const [nowDate, setNowDate] = useState(new Date().getDate());
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.toLocaleString('default', { month: 'short' }));
  const [currentSelection, setCurrentSelection] = useState('europe');
  const [currentTime, setCurrentTime] = useState(date.toLocaleString('en-US', { timeZone: 'Europe/Athens' }));
  const [days, setDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday']);
  const [currentDate, setCurrentDate] = useState(date.getDate());
  const [currentDay, setCurrentDay] = useState(date.getDay());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const[fullTime,setFullTime]=useState(new Date().getDate()+"/"+new Date().getMonth());
  const[checked,setChecked]=useState(false);
  const[totalchecked,setTotalChecked]=useState([])
  const timelist = [
    '8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm',
    '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '7:00pm', '7:30pm',
    '8:00pm', '8:30pm', '9:00pm', '9:30pm', '10:00pm', '10:30pm', '11:00pm'
  ];

  const isMounted = useRef(true);

  useEffect(() => {
    const updateComponent = () => {
    
      let newDate = new Date(date);
      newDate.setDate(nowDate);

      setMonth(newDate.toLocaleString('default', { month: 'short' }));
      setCurrentDate(newDate.getDate());
      setCurrentDay(newDate.getDay());
      setCurrentMonth(newDate.getMonth());
      setCurrentTime(newDate.toLocaleString('en-US', { timeZone: currentSelection === 'europe' ? 'CET' : 'IST' }));

     
      let newWorkingDays = days.slice();
      for (let i = newDate.getDay() + 2; i >= 0; i--) {
        newWorkingDays.unshift(newWorkingDays.pop());
      }
      newWorkingDays = newWorkingDays.filter((item) => item !== 'Saturday' && item !== 'Sunday');
      setDays(newWorkingDays);
    };

    if (isMounted.current) {
      updateComponent();
    }

    return () => {
      isMounted.current = false; 
    };
  }, [nowDate, currentSelection, date, days]);
const[showtime,setShowTime]=useState(new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
  function ShowprevWeek() {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      setNowDate(newDate.getDate());
      let finalDate=newDate.getDate()+"/"+newDate.getMonth()+"/"+newDate.getFullYear();
      setFullTime(finalDate);
      console.log("This is finaldate",finalDate);
       let showingtime=newDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
         setShowTime(showingtime);
      return newDate;
    });
  }

  function ShowNextvWeek() {
    setDate((prevDate)=>{
        const newDate=new Date(prevDate);
        newDate.setDate(prevDate.getDate()+7);
        setNowDate(newDate.getDate());
        console.log(newDate);
        let finalDate=newDate.getDate()+"/"+newDate.getMonth()+"/"+newDate.getFullYear();
        setFullTime(finalDate);
        let showingtime=newDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        setShowTime(showingtime);
        return newDate;
    })
  }
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
  function handleCheckSelection(e,index)
  {
           setChecked(!checked);
           const newObj={time:e.target.value, date:fullTime,day:index}
           setTotalChecked((prev)=>[...prev,newObj]);
           
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className='prev'>
           <button className='prevbtn' onClick={ShowprevWeek} >⬅️Previous Week</button>
        </div>
        <div className='current'>
          {/* <h2>{month} {currentDate} {date.getFullYear()}{currentTime}</h2> */}
         
          <h4>{showtime}</h4>
        </div>
        <div className='next'>
           <button className='nextbtn' onClick={ShowNextvWeek}>Next week➡️</button>
        </div>
      </div>
      <TimeZone handleChange={handleChange} currentSelection={currentSelection} currentTime={fullTime} />
      <WorkingZone
        days={days}
        currentDate={showtime}
        currentDay={currentDay}
        currentMonth={currentMonth}
        months={currentMonth}
        timelist={timelist}
        handleCheckSelection={handleCheckSelection}
        checked={checked}
        totalchecked={totalchecked}
      />
    </>
  );
}

export default AnotherNav;
