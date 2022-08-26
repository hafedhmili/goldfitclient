import React from 'react'
import ReactDOM from 'react-dom';
import logo from '../criugm-logo.png';
import Utils from '../utils/programs';
import ProgramSummary from './ProgramSummary';
import 'bootstrap/dist/css/bootstrap.css';
// import { Exercise, ExerciseSeries, Interval, Program } from './utils/program';
  
import Accordion from 'react-bootstrap/Accordion';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import ReactPlayer from 'react-player';  
//import { Button } from 'react-bootstrap';


function ExerciseComponent(props) {
    const exercise = props.exercise

    return (
        <div>
            <label>{exercise.description}</label>
            <br></br>
            <ReactPlayer className="react-player" url={exercise.url} controls={true} light={true} width="100%" />
            <br></br>
            <label>Repetitions: {exercise.numberRepetitions.min} - {exercise.numberRepetitions.max}</label>
        </div>
    )
}


class ProgramDetails extends React.Component {
    
        constructor(props) {
            super(props);
//            console.log('Inside constructor of ProgramDetails. Props are:' + props)
            const progEnr = props.program_enrollment

            this.state = {
                programEnrollment: progEnr,
                segmentNumber: 1
            }
        
            // button showProgramDetails
            this.showProgramDetails = this.showProgramDetails.bind(this);
            this.incrementSegmentNumber = this.incrementSegmentNumber.bind(this);
            this.decrementSegmentNumber = this.decrementSegmentNumber.bind(this);
            this.backToMain = this.backToMain.bind(this);
          }
        
          showProgramDetails() {
              Utils.program_details(this.state.programEnrollment.program.name,(res) => {
                  console.log('[DEBUG] Here are the details of the returned program: '+res)
              })

          }

        getAccordionItems(programSegment) {
            let accordionBody = [] 
            const numberOfSeries = programSegment.getNumberOfExercices()
            for (let index = 1; index <=numberOfSeries; index++) {
                let accordionItemKey = programSegment.getExerciseAtPosition(index).name
                var eventKeyString = ""+index
                accordionBody.push(
                <Accordion.Item eventKey={eventKeyString} key={accordionItemKey}>
                    <Accordion.Header>{accordionItemKey} [Series: {programSegment.getNumberSeriesForExercise(programSegment.getExerciseAtPosition(index)).min} - {programSegment.getNumberSeriesForExercise(programSegment.getExerciseAtPosition(index)).max}]</Accordion.Header>
                    <Accordion.Body>
                        <ExerciseComponent exercise={programSegment.getExerciseAtPosition(index)} />
                    </Accordion.Body>
                </Accordion.Item>)   
            }
            return accordionBody

        }

        incrementSegmentNumber() {
            if (this.state.segmentNumber < this.state.programEnrollment.program.getNumberOfSegments()) {
                this.setState({
                    programEnrollment: this.state.programEnrollment,
                    segmentNumber: this.state.segmentNumber+1
                })
            }
            
        }

        decrementSegmentNumber() {
            if (this.state.segmentNumber > 1) {
                this.setState({
                    programEnrollment: this.state.programEnrollment,
                    segmentNumber: this.state.segmentNumber-1
                })
            }
 
        }

        backToMain() {
            ReactDOM.render(
                <React.StrictMode>
                  <ProgramSummary program_enrollment={this.state.programEnrollment} />
                </React.StrictMode>,
                document.getElementById('root')
              );

        }

          render() {
              const currentProgramSegment = this.state.programEnrollment.program.getInterval(this.state.segmentNumber)
              const currentExerciceSeries = this.state.programEnrollment.program.getExerciseSeriesForDay(currentProgramSegment.min)
                return (
                  <div style={{ display: 'block', width: 700, padding: 30 }} align="center">
                    <div >
                        <img alt="CRIUGM" src={logo}/><br></br>                        
                    </div>
                    <label className="GoldFit-header">Program {this.state.programEnrollment.program.name} ({this.state.programEnrollment.program.duration} days) </label>
                    <label className="GoldFit-header">Segment: </label> <button className="counter" onClick={this.decrementSegmentNumber}>-</button><label style={{ paddingLeft: '5px',paddingRight: '5px' }}>{this.state.segmentNumber}</label><button className="counter" onClick={this.incrementSegmentNumber}>+</button>
                    <label className="GoldFit-header">Days: [{currentProgramSegment.min} - {currentProgramSegment.max}]</label>
                    <label className="GoldFit-header">Series: {currentExerciceSeries.name}</label>
                    <Accordion defaultActiveKey="1">
                        { 
                        this.getAccordionItems(currentExerciceSeries)
                        }
                    </Accordion>
                    <button className="square" onClick={this.backToMain}>
                        Main
                    </button>
                  </div>
                );
              }
    }
    
export default ProgramDetails