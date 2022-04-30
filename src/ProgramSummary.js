import React from 'react'
import logo from './criugm-logo.png'
import Utils from './utils/programs'
import ReactDOM from 'react-dom'
import ProgramDetails from './ProgramDetails'
// import TestDataFunctions from './utils/data'

class ProgramSummary extends React.Component {
    
        constructor(props) {
            super(props);
            console.log('Inside constructor of ProgramSummary. Props are:' + props)
            const pgm_enrollment = this.props.program_enrollment
//            const pgm_header = this.props.enrollment_record
            console.log('Inside constructor of ProgramSummary. pgm_enrollment is:', pgm_enrollment)
            this.state = {
                programEnrollment : pgm_enrollment
            }
        
            // button showProgramDetails
            this.showProgramDetails = this.showProgramDetails.bind(this);
            this.enterDaySession = this.enterDaySession.bind(this);
          }
        
        showProgramDetails() {
 
            Utils.program_details(this.state.programEnrollment.program.name,(res) => {
                const prog = Utils.build_program(res)
                // update the program component of the programEnrollment state variable with
                // the newly retrieved/completed priogram
                var pgmEnr = this.state.programEnrollment
                pgmEnr.program = prog
                //const pg2 = TestDataFunctions.createSomeData()[1]
                // now, update the state
                this.setState({programEnrollment: pgmEnr})
                console.log('Retrieved program is: ', prog)
                ReactDOM.render(
                    <React.StrictMode>
                        <ProgramDetails programEnrollment={pgmEnr} />
                    </React.StrictMode>, document.getElementById('root')
                );
          });
        }

        enterDaySession() {
            const today = Date.now()
            if (this.state.programEnrollment.program){
                console.log('the program is defined. It is: ',this.programEnrollment.program)
            }

        }

        showMyProgression() {

        }

        changeConfiguration() {

        }

          render() {
    
            return (
                <div align="center">
                    <div align="center">
                        <img alt="CRIUGM" src={logo}/><br></br>                        
                        <label className='GoldFit-header'>Welcome {this.state.programEnrollment.patient.firstName}!</label>
                        <label className='GoldFit-header'>{this.state.programEnrollment.program.name} Program ({this.state.programEnrollment.program.duration} days)</label>
                    </div>

                    <button className="square" onClick={this.showProgramDetails}>
                        {this.state.programEnrollment.program.name} details ...
                    </button>
                    <button className="square" onClick={this.enterDaySession}>
                        Day's session
                    </button>
                    <button className="square" onClick={this.showMyProgression}>
                        Show my progression
                    </button>
                    <button className="square" onClick={this.changeConfiguration}>
                        Change configuration
                    </button>
                </div>
            
            )
        }
    }
    
export default ProgramSummary