import React from 'react';
import Radio from '@mui/material/Radio';
import ReactDOM from 'react-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { SelfEfficacy } from '../models/program';
import DifficultyLevelInput from './DifficultyLevelInput';
import ProgramSummary from './ProgramSummary';
import PainLevelInput from './PainLevelInput';

export default class SelfEfficacyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programEnrollment : props.program_enrollment,
      // this is enough since difficulty level is an attribute of DayRecord
      dayRecord : props.day_record                               
    }

    console.log('[DEBUG] inside constructor of SelfEfficacyInput')
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.setPainLevel = this.setPainLevel.bind(this)
    this.backToDifficultyLevelInput = this.backToDifficultyLevelInput.bind(this)
    this.backToMain = this.backToMain.bind(this)
  }

handleRadioChange (event) {
  this.setState((state)=> {
    state.dayRecord.selfEfficacy = event.target.value
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

backToDifficultyLevelInput() {
  ReactDOM.render(
      <React.StrictMode>
        <DifficultyLevelInput program_enrollment={this.state.programEnrollment} day_record={this.state.dayRecord}/>
      </React.StrictMode>,
      document.getElementById('root')
    );

}

setPainLevel() {
  ReactDOM.render(
    <React.StrictMode>
      <PainLevelInput program_enrollment={this.state.programEnrollment} day_record={this.state.dayRecord}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}



render() {
  return (
    <div>
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="self-efficacy-level-input">Select self efficacy level</FormLabel>
        <RadioGroup
          aria-labelledby="self-efficacy-level-input"
          name="selfEfficacyLevel"
          value={this.state.dayRecord.selfEfficacy}
          onChange={this.handleRadioChange}
        >
          <FormControlLabel value="HighlyConfident" control={<Radio />} label={SelfEfficacy["HighlyConfident"]} />
          <FormControlLabel value="Confident" control={<Radio />} label={SelfEfficacy["Confident"]} />
          <FormControlLabel value="LittleConfident" control={<Radio />} label={SelfEfficacy["LittleConfident"]} />
          <FormControlLabel value="NotConfident" control={<Radio />} label={SelfEfficacy["NotConfident"]} />
        </RadioGroup>
        <button className="square" onClick={this.setPainLevel}>Set pain level &gt;</button>
        <button className="square" onClick={this.backToDifficultyLevelInput}>&lt; Difficulty level</button>
        <button className="square" onClick={this.backToMain}>&lt; Main</button>
      </FormControl>
      </div>
  );
  }
}
