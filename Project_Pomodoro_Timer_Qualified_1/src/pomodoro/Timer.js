import React, { useState, useEffect} from "react";

export default function Timer({formattedTimeLeftFocus, formattedTimeLeftBreak, onBreak, isStopped}) {
    if (isStopped){
        return null
    }
    else {
    return (
        
          <div className="col">
            {/* TODO: Update message below correctly format the time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {onBreak === false ? formattedTimeLeftFocus : formattedTimeLeftBreak} remaining
            </p>
          </div>
    )
  }
}