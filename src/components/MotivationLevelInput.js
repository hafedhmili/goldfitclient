import React from 'react';
import Radio from '@mui/material/Radio';
import ReactDOM from 'react-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import { MotivationLevel } from '../utils/program_model';
import SatisfactionLevelInput from './SatisfactionLevelInput';
import ProgramSummary from './ProgramSummary';

export default class MotivationLevelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programEnrollment : props.program_enrollment,
      // this is enough since difficulty level is an attribute of DayRecord
      dayRecord : props.day_record                               
    }

    console.log('[DEBUG] inside constructor of ', this.className)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.saveDayRecord = this.saveDayRecord.bind(this)
    this.backToSatisfactionLevel = this.backToSatisfactionLevel.bind(this)
    this.backToMain = this.backToMain.bind(this)
  }

handleRadioChange (event) {
  this.setState((state)=> {
    state.dayRecord.satisfactionLevel = event.target.value
    return state});
};

backToMain() {
  ReactDOM.render(
    <React.StrictMode>
      <ProgramSummary program_enrollment={this.state.programEnrollment} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

backToSatisfactionLevel() {
  ReactDOM.render(
      <React.StrictMode>
        <SatisfactionLevelInput program_enrollment={this.state.programEnrollment} day_record={this.state.dayRecord}/>
      </React.StrictMode>,
      document.getElementById('root')
    );

}

/**
 * this function saves the full day record in local storage, and goes back to 
 * main
 */
 saveDayRecord() {
  console.log('[DEBUG] save to local storage')
  this.backToMain();
}



render() {
  return (
    <div>
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="motivation-level-input">Select motivation level</FormLabel>
        <RadioGroup
          aria-labelledby="motivation-level-input"
          name="motivationLevel"
          value={this.state.dayRecord.motivationLevel}
          onChange={this.handleRadioChange}
        >
          <FormControlLabel value="Motivated" control={<Radio />} label={MotivationLevel["Motivated"]} />
          <FormControlLabel value="NotMotivated" control={<Radio />} label={MotivationLevel["NotMotivated"]} />
       </RadioGroup>
        <button className="square" onClick={this.saveDayRecord}>Save the day record ...</button>
        <button className="square" onClick={this.backToSatisfactionLevel}>&lt; Set satisfaction level</button>
        <button className="square" onClick={this.backToMain}>&lt; Main</button>
      </FormControl>
      </div>
  );
  }
}
