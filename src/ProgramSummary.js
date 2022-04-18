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
            const pgm_header = JSON.parse(this.props.enrollment_record)
//            const pgm_header = this.props.enrollment_record
            console.log('Inside constructor of ProgramSummary. pgm_header is:' + pgm_header)
            this.state = {
                firstName : pgm_header.patientfirstname,
                lastName : pgm_header.patientlastname,
                programName : pgm_header.programname,
                programDuration : pgm_header.programduration,
            }
        
            // button showProgramDetails
            this.showProgramDetails = this.showProgramDetails.bind(this);
          }
        
        showProgramDetails() {
 
            Utils.program_details(this.state.programName,(res) => {
                const pg1 = Utils.build_program(res)
                //const pg2 = TestDataFunctions.createSomeData()[1]
                console.log('pg1 is: ', pg1)
                ReactDOM.render(
                    <React.StrictMode>
                        <ProgramDetails program={pg1} />
                    </React.StrictMode>, document.getElementById('root')
                );
          });
        }

        enterDaySession() {

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
                        <label className='GoldFit-header'>Welcome {this.state.firstName}!</label>
                        <label className='GoldFit-header'>{this.state.programName} Program ({this.state.programDuration} days)</label>
                    </div>

                    <button className="square" onClick={this.showProgramDetails}>
                        {this.state.programName} details ...
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