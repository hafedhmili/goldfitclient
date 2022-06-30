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
import SelfEfficacyInput from './SelfEfficacyInput';

export default class DifficultyLevelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programEnrollment : props.program_enrollment,
      dayRecord : props.day_record  // difficulty level is an attribute of DayRecord                           
    }

    console.log('[DEBUG] inside constructor of',this.className)
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.setSelfEfficacyLevel = this.setSelfEfficacyLevel.bind(this)
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
        <DayRecord program_enrollment={this.state.programEnrollment} date={this.state.dayRecord.date}/>
      </React.StrictMode>,
      document.getElementById('root')
    );

}

setSelfEfficacyLevel() {
  ReactDOM.render(
    <React.StrictMode>
      <SelfEfficacyInput program_enrollment={this.state.programEnrollment} day_record={this.state.dayRecord}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}



render() {
  return (
    <div>
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="difficulty-level-input">Select difficulty level</FormLabel>
        <RadioGroup
          aria-labelledby="difficulty-level-input"
          name="difficultyLevel"
          value={this.state.dayRecord.difficultyLevel}
          onChange={this.handleRadioChange}
        >
          <FormControlLabel value="VeryEasy" control={<Radio />} label={DifficultyLevel["VeryEasy"]} />
          <FormControlLabel value="Easy" control={<Radio />} label={DifficultyLevel["Easy"]} />
          <FormControlLabel value="Difficult" control={<Radio />} label={DifficultyLevel["Difficult"]} />
          <FormControlLabel value="VeryDifficult" control={<Radio />} label={DifficultyLevel["VeryDifficult"]} />
        </RadioGroup>
        <button className="square" onClick={this.setSelfEfficacyLevel}>Set efficacy level &gt;</button>
        <button className="square" onClick={this.backToDayRecord}>&lt; Day record</button>
        <button className="square" onClick={this.backToMain}>&lt; Main</button>
      </FormControl>
      </div>
  );
  }
}
