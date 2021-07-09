import React from "react";
import {secondsToDuration} from "../utils/duration/index";


export default function SessionTitle({onBreak, isStopped, focusDuration, breakDuration }) {
  if (isStopped){
    return null  
  } 
  else {
    return (
        <h2 data-testid="session-title">
            {onBreak === false ? `Focusing for ${secondsToDuration(focusDuration)} minutes` : `On Break for ${secondsToDuration(breakDuration)} minutes`}
        </h2>
    )
 }
}