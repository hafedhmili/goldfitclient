import React from 'react';
import Radio from '@mui/material/Radio';
import ReactDOM from 'react-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { SatisfactionLevel } from '../models/program';
import PainLevelInput from './PainLevelInput';
import ProgramSummary from './ProgramSummary';
import MotivationLevelInput from './MotivationLevelInput';

export default class SatisfactionLevelInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      programEnrollment : props.program_enrollment,
      // this is enough since difficulty level is an attribute of DayRecord
      dayRecord : props.day_record                               
    }

    console.log('[DEBUG] inside constructor of SatisfactionLevelInput')
    this.handleRadioChange = this.handleRadioChange.bind(this)
    this.setMotivationLevel = this.setMotivationLevel.bind(this)
    this.backToPainLevel = this.backToPainLevel.bind(this)
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

backToPainLevel() {
  ReactDOM.render(
      <React.StrictMode>
        <PainLevelInput program_enrollment={this.state.programEnrollment} day_record={this.state.dayRecord}/>
      </React.StrictMode>,
      document.getElementById('root')
    );

}

 setMotivationLevel() {
  ReactDOM.render(
    <React.StrictMode>
      <MotivationLevelInput program_enrollment={this.state.programEnrollment} day_record={this.state.dayRecord}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}



render() {
  return (
    <div>
      <FormControl sx={{ m: 3 }} variant="standard">
        <FormLabel id="satisfaction-level-input">Select satisfaction level</FormLabel>
        <RadioGroup
          aria-labelledby="satisfaction-level-input"
          name="satisfactionLevel"
          value={this.state.dayRecord.satisfactionLevel}
          onChange={this.handleRadioChange}
        >
          <FormControlLabel value="VerySatisfied" control={<Radio />} label={SatisfactionLevel["VerySatisfied"]} />
          <FormControlLabel value="Satisfied" control={<Radio />} label={SatisfactionLevel["Satisfied"]} />
          <FormControlLabel value="Insatisfied" control={<Radio />} label={SatisfactionLevel["Insatisfied"]} />
          <FormControlLabel value="VeryInsatisfied" control={<Radio />} label={SatisfactionLevel["VeryInsatisfied"]} />
       </RadioGroup>
        <button className="square" onClick={this.setMotivationLevel}>Set motivation level ...</button>
        <button className="square" onClick={this.backToPainLevel}>&lt; Set pain level</button>
        <button className="square" onClick={this.backToMain}>&lt; Main</button>
      </FormControl>
      </div>
  );
  }
}
