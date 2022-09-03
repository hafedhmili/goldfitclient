import React from 'react'
import logo from '../criugm-logo.png';
import Utils from '../utils/programs';
import ReactDOM from 'react-dom';
import ProgramDetails from './ProgramDetails';
import DayRecord from './day_record';
// import TestDataFunctions from './utils/data'

class ProgramSummary extends React.Component {
    
        constructor(props) {
            super(props);
            console.log('[DEBUG] Inside constructor of ProgramSummary. Props are:' + props)
            const pgm_enrollment = this.props.program_enrollment
            console.log('[DEBUG] Inside constructor of ProgramSummary. pgm_enrollment is:', pgm_enrollment)
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
                console.log('[DEBUG] Retrieved program is: ', prog)
                ReactDOM.render(
                    <React.StrictMode>
                        <ProgramDetails program_enrollment={pgmEnr} />
                    </React.StrictMode>, document.getElementById('root')
                );
          });
        }

        /**
         * Function to enter day session. This requires that the program enrollment object has already been retrieved,
         * which in turn assume that the program itself has already been retrieved.
         * Thus, we start by checking whether the full program is 'live'. If not, get it from localStorage, if it
         * was saved before, or go ahead and retrieve it from the server.
         * 
         * Next, check the enrollment object itself. Again, check if it has been initialized. If not, check if
         * it has been saved in local storage. and if not, retrieve it.
         * 
         * Only then, do you start worrying about what day session to display. If program hasn't started, display a
         * message to that effect. If program is completed, show it starting date. If program is ongoing, then
         * display today's session.
         * 
         * The challenge is to do these things and keep the GUI synchronized.
         * @returns 
         */
        enterDaySession() {
            var progEnrollment = this.state.programEnrollment
            // A. check if program has been initialized
            if (progEnrollment.program.getNumberOfSegments()===0){
                var fullProgram = null
                // it hasn't. Thus:
                // 1. check if program stored in localStorage
                var programDescriptionString = localStorage.getItem(progEnrollment.program)
                if (programDescriptionString) {
                    // 1.a: program was stored in local storage. Thus recreate it from there
                    // remember that array representing the join of program related tables
                    // was stored as a string using JSON.stringify(), thus we need to
                    // JSON.parse() the string retrieved from local storage
                    fullProgram = Utils.build_program(JSON.parse(programDescriptionString))
        
                    // now, update the state
                    this.setState((state)=> {
                        progEnrollment.program = fullProgram
                        return {programEnrollment: progEnrollment}})
                } else {
                    // detailed program was not stored in local storage. Thus retrieve it from
                    // server
                    console.log('[DEBUG]. Inside ProgramSummary.enterDaySession(). the program is neither defined, nor stored in local storage. Go and fetch it from server')
                    Utils.program_details(progEnrollment.program.name,(res) => {
                        fullProgram = Utils.build_program(res)
                        // update the program component of the programEnrollment state variable with
                        // the newly retrieved/completed program
                        progEnrollment.program = fullProgram
        
                        // now, update the state
                        this.setState((state) => {return {programEnrollment: progEnrollment}})

                        // make a recursive call so that the next time it enters, it moves 
                        // to the next stage
                        return this.enterDaySession()
                    });
                }
    
            }
            console.log('[DEBUG] Inside ProgramDetails.showDaySession(): I am supposed to have a full program here:', progEnrollment.program)
            // now, figure out what day session to display.
            const today = new Date()
            const programStartDate = progEnrollment.startDate

            // if program hasn't started, display a message and don't do anything
            if (today < programStartDate) {
                console.log('[DEBUG] should display a prompt to say program has not started')
                return
            }

            // if we are still here, it means the program started. Thus, we go and retrieve the 
            // the program enrollment data
            // first check that it hasn't been initialized
            if (!progEnrollment.hasDayRecords()) {
                // it hasn't. Thus check it is stored in local storage
                var programEnrollmentDescriptionString = localStorage.getItem(progEnrollment.enrollmentCode)
                if (programEnrollmentDescriptionString) {
                    // 1.a: program enrollment was stored in local storage. Thus recreate it from there
                    // remember that array representing the join of program related tables
                    // was stored as a string using JSON.stringify(), thus we need to
                    // JSON.parse() the string retrieved from local storage
                    progEnrollment.buildEnrollmentFromEnrollmentDetailsQueryResults(JSON.parse(programEnrollmentDescriptionString),progEnrollment.patient,progEnrollment.program)
                    // now, update the state
                    this.setState((state) => {return {programEnrollment: progEnrollment}})
                } else {
                    // this means that it is not stored locally. Thus go look for it on server
                    Utils.program_enrollment_details(progEnrollment.enrollmentCode,(res) => {
                        progEnrollment.buildEnrollmentFromEnrollmentDetailsQueryResults(res,progEnrollment.patient,progEnrollment.program)
                        // now, update the state
                        this.setState((state) => {return {programEnrollment: progEnrollment}})
                    });
                }
                
            }
            // assume program still active today
            var sessionDate = today
                        
            // check if it is indeed, because if it isn't, show first day of 
            // the program, and let the user navigate to the desired date
            if (progEnrollment.getNumberOfDaysBetween(programStartDate,today) >= progEnrollment.program.duration) {
                // show first date of the program
                sessionDate = programStartDate
            }
            

            ReactDOM.render(
                <React.StrictMode>
                    <DayRecord program_enrollment={this.state.programEnrollment} date={sessionDate}/>
                    </React.StrictMode>, document.getElementById('root')
                );
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