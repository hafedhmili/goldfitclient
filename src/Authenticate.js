import React from 'react'

import ReactDOM from 'react-dom';
import logo from './criugm-logo.png'
import ProgramSummary from './ProgramSummary';
import Utils from './utils/programs';
import {Patient} from './utils/program_model';
import {Program} from './utils/program_model';
import {ProgramEnrollment} from './utils/program_model';

class Authenticate extends React.Component {
    
        constructor(props) {
            super(props);
            this.state = {code: ''};
        
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
          }
        
          handleChange(event) {
            this.setState({code: event.target.value});
          }
        
          handleSubmit(event) {
           
            const enrollmentCode = this.state.code

            Utils.program_header(enrollmentCode, (result) => {
              console.log('Inside authenticate, result is: ', result)
            //  const enrollment_record = JSON.stringify(result)
              const enrollment_record = result
              const patient = new Patient(enrollment_record.patientfirstname, enrollment_record.patientlastname,enrollment_record.idpatient)
              const program = new Program(enrollment_record.programname,enrollment_record.programdescription,enrollment_record.programduration)
              const program_enrollment = new ProgramEnrollment(patient,program,enrollmentCode,new Date(enrollment_record.programenrollmentdate),new Date(enrollment_record.programstartdate))
//              const enrollment_record = result
              console.log('Here is the enrollment record: ' + enrollment_record)
              ReactDOM.render(
                <React.StrictMode>
                  <ProgramSummary program_enrollment={program_enrollment} />
                </React.StrictMode>,
                document.getElementById('root')
              );
            })
            event.preventDefault();
          }

          render() {
    
            return (
            <form onSubmit={this.handleSubmit}>
                <img alt="CRIUGM" src={logo}/>
                <br></br>
                <h4>Registration</h4>
                <br></br>
                <input type="text" name="code" id="code" value={this.state.code} onChange={this.handleChange}/>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
            )
        }
    }
    
export default Authenticate