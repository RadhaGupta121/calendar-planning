import React, { useState } from 'react';
import SaveDataButton from './SaveData';

function WorkingZone({currentDate,currentMonth,months,days,timelist,handleCheckSelection,checked,totalchecked}) {
 console.log(totalchecked,checked);
//  const monthName=['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
const[jsonFormat,setJsonFormat]=useState(false);
function handleJSONData()
{
  setJsonFormat(!jsonFormat);
}
  return (
    <div >
      
     {
      days.map((index)=>{
        return(
          <>
              <div style={{display:"flex",gap:'1rem',justifyContent:"space-around"}}>
                <div style={{width:"10%",backgroundColor:"lightgray",padding:"12px"}} >
                <h3 style={{color:"red"}}>{index}</h3>
              <p>{currentDate}</p>
              </div>
              <div style={{width:"80%"}}>
               <div style={{display:"flex",border:"1px solid gray",flexWrap:"wrap",padding:"12px"}}>
               {
                timelist.map((item)=>{
                  return(
                   <div >
                    <label style={{margin:"12px"}}>
                      <input type='checkbox' 
                      onClick={(e)=>handleCheckSelection(e,index)} value={item}/>{item}
                    </label>
                    </div>
                    
                  )
                })
                
               }
               </div>
               </div>
              </div>
          </>
        )
      })
     }
     <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap",gap:"2rem"}}>
    <button onClick={handleJSONData}>{
      jsonFormat?"Hide":"Show"
    } JSON Format</button>
    <SaveDataButton data={totalchecked}/>
    </div>
     <div>
      {
        jsonFormat ? (
          <div>
            {'['}
            {
              totalchecked.map((item,index) => {
                const formattedDate = new Date(item.date);
                const dayOfWeek = formattedDate.toLocaleDateString('en-US', { weekday: 'long' });

                return (
                  <div key={index}>
                  <div>  {'{'}</div>
                  <div>Id:{index}</div>
                   <div> 
                   
                   Time: {item.time},</div>  
                     <div> Date: {item.date},</div>
                    <div> Day: {dayOfWeek}
                   
                    </div> 
                 <div> {' },'}</div>
                  </div>
                );
              })
            }
          </div>
        ) : null
      }
      {']'}
    </div>
    </div>
  );
}

export default WorkingZone;