import React, { useEffect, useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration";
import SessionTitle from "./SessionTitle";
import Focus from "./Focus"
import Break from "./Break";
import Timer from "./Timer";


function Pomodoro() {
  
  
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running

  const [onBreak, setOnBreak] = useState(false)
  const [isStopped, setIsStopped] = useState(true)
  // ToDo: Allow the user to adjust the focus and break duration.
  const [focusDuration, setFocusDuration] = useState(1500);
  const [breakDuration, setBreakDuration] = useState(300);
  const [timeLeftFocus, setTimeLeftFocus] = useState(focusDuration)
  const [timeLeftBreak, setTimeLeftBreak] = useState(breakDuration)
  const [ariaValue, setAriaValue] = useState(0)
  const formattedTimeLeftFocus = secondsToDuration(timeLeftFocus)
  const formattedTimeLeftBreak = secondsToDuration(timeLeftBreak)

  const decreaseFocusDuration = () => {
    const newFocusDuration = focusDuration - 300 
    if (newFocusDuration <= 300){
      setFocusDuration(300)
    }
    else {
      setFocusDuration(newFocusDuration)
    }
  }

  const increaseFocusDuration = () => {
    const newFocusDuration = focusDuration + 300
    if (newFocusDuration >= 3600){
      setFocusDuration(3600)
    }
    else {
      setFocusDuration(newFocusDuration)
    }    
  }

  const decreaseBreakDuration = () => {
    const newBreakDuration = breakDuration - 60 
    if (newBreakDuration <= 60){
      setBreakDuration(60)
    }
    else {
      setBreakDuration(newBreakDuration)
    }
  }

  const increaseBreakDuration = () => {
    const newBreakDuration = breakDuration + 60
    if (newBreakDuration >= 900){
      setBreakDuration(900)
    }
    else {
      setBreakDuration(newBreakDuration)
    }   
  }

  const sessionHandler = () => {
    if (timeLeftFocus > 0){
      setTimeLeftFocus((prevState) => prevState - 1)
    }
    else {
    new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play()  
    setOnBreak(true)
    if (timeLeftBreak > 0){
      setTimeLeftBreak((prevState) => prevState - 1)
    }
    if (timeLeftFocus === 0 && timeLeftBreak === 0){      
      setOnBreak(false)
      setTimeLeftBreak(breakDuration)
      setTimeLeftFocus(focusDuration)    
    }
  }
  if (!onBreak){
    setAriaValue(100 * (focusDuration - timeLeftFocus) / focusDuration)
  }
  else{
    setAriaValue(100 * (breakDuration - timeLeftBreak) / breakDuration)
  }
}
  const stoppedHandler = () => {
    setIsTimerRunning(false)
    setOnBreak(false)
    setIsStopped(true)
    setFocusDuration(1500)
    setBreakDuration(300)
    setTimeLeftFocus(focusDuration)
    setTimeLeftBreak(breakDuration)   
  }


  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useEffect(() => {
    setTimeLeftFocus(focusDuration)
    setTimeLeftBreak(breakDuration)
    console.log(timeLeftBreak, timeLeftFocus)
  }, [focusDuration, breakDuration])

  useInterval(() => {
      sessionHandler()
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => !prevState)
    setIsStopped(false)
  }

  return (
    <div className="pomodoro">    
      <div className="row">
        <Focus increaseFocusDuration={increaseFocusDuration} decreaseFocusDuration={decreaseFocusDuration} focusDuration={focusDuration} />
        <Break increaseBreakDuration={increaseBreakDuration} decreaseBreakDuration={decreaseBreakDuration} breakDuration={breakDuration} />       
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session. and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={stoppedHandler}
              disabled={isStopped}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
        <div  className="row mb-2">
        <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
          <SessionTitle onBreak={onBreak} isStopped={isStopped} focusDuration={focusDuration} breakDuration={breakDuration} />
          <Timer formattedTimeLeftFocus={formattedTimeLeftFocus} formattedTimeLeftBreak={formattedTimeLeftBreak} onBreak={onBreak} isStopped={isStopped}/>
          
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={ariaValue} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${ariaValue}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Pomodoro;
