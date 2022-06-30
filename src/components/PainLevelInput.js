import React from 'react';
import Radio from '@mui/material/Radio';
import ReactDOM from 'react-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

import { PainLevel } from '../utils/program_model';
import SelfEfficacyInput from './SelfEfficacyInput';
import ProgramSummary from './ProgramSummary';
import SatisfactionLevelInput from './SatisfactionLevelInput';

export default class PainLevelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programEnrollment : props.program_enrollment,
      // this is enough since difficulty level is an attribute of DayRecord
      dayRecord : props.day_record                               
    }

    console.log('[DEBUG] inside constructor of DifficultyLevelInput')
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.setSatisfactionLevel = this.setSatisfactionLevel.bind(this)
    this.backToSelfEfficacyInput = this.backToSelfEfficacyInput.bind(this)
    this.backToMain = this.backToMain.bind(this)
  }

handleRadioChange (event) {
  this.setState((state)=> {
    state.dayRecord.painLevel = event.target.value
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

backToSelfEfficacyInput() {
  ReactDOM.render(
      <React.StrictMode>
        <SelfEfficacyInput program_enrollment={this.state.programEnrollment} day_record={this.state.dayRecord}/>
      </React.StrictMode>,
      document.getElementById('root')
    );

}

setSatisfactionLevel() {
  ReactDOM.render(
    <React.StrictMode>
      <SatisfactionLevelInput program_enrollment={this.state.programEnrollment} day_record={this.state.dayRecord}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}



render() {
  return (
    <div>
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="pain-level-input">Select pain level</FormLabel>
        <RadioGroup
          aria-labelledby="pain-level-input"
          name="painLevel"
          value={this.state.dayRecord.painLevel}
          onChange={this.handleRadioChange}
        >
          <FormControlLabel value="NoPain" control={<Radio />} label={PainLevel["NoPain"]} />
          <FormControlLabel value="LittlePain" control={<Radio />} label={PainLevel["LittlePain"]} />
          <FormControlLabel value="ModeratePain" control={<Radio />} label={PainLevel["ModeratePain"]} />
          <FormControlLabel value="SeverePain" control={<Radio />} label={PainLevel["SeverePain"]} />
        </RadioGroup>
        <button className="square" onClick={this.setSatisfactionLevel}>Set satisfaction level &gt;</button>
        <button className="square" onClick={this.backToSelfEfficacyInput}>&lt; Self efficacy level</button>
        <button className="square" onClick={this.backToMain}>&lt; Main</button>
      </FormControl>
      </div>
  );
  }
}
