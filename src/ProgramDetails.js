import React from 'react'
import logo from './criugm-logo.png'
import Utils from './utils/programs'
import 'bootstrap/dist/css/bootstrap.css';
// import { Exercise, ExerciseSeries, Interval, Program } from './utils/program';
  
import Accordion from 'react-bootstrap/Accordion';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import ReactPlayer from 'react-player';  


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
            const prog = props.program

            this.state = {
                program: prog,
                segmentNumber: 1
            }
        
            // button showProgramDetails
            this.showProgramDetails = this.showProgramDetails.bind(this);
            this.incrementSegmentNumber = this.incrementSegmentNumber.bind(this);
            this.decrementSegmentNumber = this.decrementSegmentNumber.bind(this);
          }
        
          showProgramDetails() {
              Utils.program_details(this.state.program.name,(res) => {
                  console.log('Here are the details of the returned program: '+res)
              })

          }

          enterDaySession() {

          }

          showMyProgression() {

          }

          changeConfiguration() {

        }

        getAccordionItems(programSegment) {
            let accordionBody = [] 
            const numberOfSeries = programSegment.getNumberOfExercices()
            for (let index = 1; index <=numberOfSeries; index++) {
                var eventKeyString = ""+index
                accordionBody.push(
                <Accordion.Item eventKey={eventKeyString}>
                    <Accordion.Header>{programSegment.getExerciseAtPosition(index).name} [Series: {programSegment.getNumberSeriesForExercise(programSegment.getExerciseAtPosition(index)).min} - {programSegment.getNumberSeriesForExercise(programSegment.getExerciseAtPosition(index)).max}]</Accordion.Header>
                    <Accordion.Body>
                        <ExerciseComponent exercise={programSegment.getExerciseAtPosition(index)} />
                    </Accordion.Body>
                </Accordion.Item>)   
            }
            return accordionBody

        }

        incrementSegmentNumber() {
            if (this.state.segmentNumber < this.state.program.getNumberOfSegments()) {
                this.setState({
                    program: this.state.program,
                    segmentNumber: this.state.segmentNumber+1
                })
            }
            
        }

        decrementSegmentNumber() {
            if (this.state.segmentNumber > 1) {
                this.setState({
                    program: this.state.program,
                    segmentNumber: this.state.segmentNumber-1
                })
            }
 
        }

          render() {
              const currentProgramSegment = this.state.program.getInterval(this.state.segmentNumber)
              const currentExerciceSeries = this.state.program.getExerciseSeriesForDay(currentProgramSegment.min)
                return (
                  <div style={{ display: 'block', width: 700, padding: 30 }} align="center">
                    <div >
                        <img alt="CRIUGM" src={logo}/><br></br>                        
                    </div>
                    <label className="GoldFit-header">Program {this.state.program.name} ({this.state.program.duration} days) </label>
                    <label className="GoldFit-header">Segment: </label> <button className="counter" onClick={this.decrementSegmentNumber}>-</button><label style={{ paddingLeft: '5px',paddingRight: '5px' }}>{this.state.segmentNumber}</label><button className="counter" onClick={this.incrementSegmentNumber}>+</button>
                    <label className="GoldFit-header">Days: [{currentProgramSegment.min} - {currentProgramSegment.max}]</label>
                    <label className="GoldFit-header">Series: {currentExerciceSeries.name}</label>
                    <Accordion defaultActiveKey="1">
                        { 
                        this.getAccordionItems(currentExerciceSeries)
                        }
                    </Accordion>
                  </div>
                );
              }
    }
    
export default ProgramDetails