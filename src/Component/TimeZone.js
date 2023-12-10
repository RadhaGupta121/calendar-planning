import React, { useState } from 'react';

function TimeZone({handleChange,currentSelection,currentTime}) {
  
    return (
        <div>
          <label style={{margin:"3rem",padding:"12px"}}>Timestamps:</label><br/>
              <select onChange={handleChange} style={{width:"90%",padding:"12px",margin:"3rem",
              marginTop:"0.2rem",border:"2px solid gray"}}>
                <option value="europe" name='europe'>Europe/Athens UTC</option>
                <option value="india" name='india'>IST UTC+5:30</option>
              </select>
           
        </div>
    );
}

export default TimeZone;