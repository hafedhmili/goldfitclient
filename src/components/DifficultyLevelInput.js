import React from 'react';
import Radio from '@mui/material/Radio';
import ReactDOM from 'react-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import { DifficultyLevel } from '../utils/program_model';
import DayRecord from './day_record';
import ProgramSummary from './ProgramSummary';

export default class DifficultyLevelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programEnrollment : props.program_enrollment,
      // this is enough since difficulty level is an attribute of DayRecord
      dayRecord : props.day_record                               
    }

    console.log('[DEBUG] inside constructor of DifficultyLevelInput')
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.setConfidenceLevel = this.setConfidenceLevel.bind(this)
    this.backToDayRecord = this.backToDayRecord.bind(this)
    this.backToMain = this.backToMain.bind(this)
  }

  handleRadioChange (event) {
    this.setState((state)=> {
      state.dayRecord.difficultyLevel = event.target.value
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

backToDayRecord() {
  ReactDOM.render(
      <React.StrictMode>
        <DayRecord program_enrollment={this.state.programEnrollment} />
      </React.StrictMode>,
      document.getElementById('root')
    );

}

setConfidenceLevel() {
  console.log("[DEBUG] Set confidence level")
}



render() {
  return (
    <div>
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="demo-error-radios">Select difficulty level</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="difficultyLevel"
          value={this.state.DifficultyLevel}
          onChange={this.handleRadioChange}
        >
          <FormControlLabel value="VeryEasy" control={<Radio />} label={DifficultyLevel["VeryEasy"]} />
          <FormControlLabel value="Easy" control={<Radio />} label={DifficultyLevel["Easy"]} />
          <FormControlLabel value="Difficult" control={<Radio />} label={DifficultyLevel["Difficult"]} />
          <FormControlLabel value="VeryDifficult" control={<Radio />} label={DifficultyLevel["VeryDifficult"]} />
        </RadioGroup>
        <button className="square" onClick={this.setConfidenceLevel}>Set confidence level &gt;</button>
        <button className="square" onClick={this.backToDayRecord}>&lt; Day record</button>
        <button className="square" onClick={this.backToMain}>&lt; Main</button>
      </FormControl>
      </div>
  );
  }
}
