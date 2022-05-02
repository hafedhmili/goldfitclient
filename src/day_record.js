import React from 'react'
import ReactDOM from 'react-dom';
import logo from './criugm-logo.png'
import Utils from './utils/programs'
import ProgramSummary from './ProgramSummary';
import DatePicker from 'react-date-picker';
import 'bootstrap/dist/css/bootstrap.css';
// import { Exercise, ExerciseSeries, Interval, Program } from './utils/program';
  
import Accordion from 'react-bootstrap/Accordion';
import ReactPlayer from 'react-player';  
import { Button } from 'react-bootstrap';


class ExerciseComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            exerciseRecord : props.exercise_record,
            seriesInterval : props.series_range
        }

        this.newNumberRepetitions = this.newNumberRepetitions.bind(this)
        this.newNumberSeries = this.newNumberSeries.bind(this)
    }

    newNumberRepetitions(event) {
        console.log('Changing number of repetitions to: ',event.target.value)
        this.setState((state)=> {
            state.exerciseRecord.numberRepetitions = event.target.value
            return state
        })
    }

    newNumberSeries(event) {
        console.log('Changing number of series to: ',event.target.value)
        this.setState((state)=> {
            state.exerciseRecord.numberSeries = event.target.value
            return state
        })
    }


    render() {
    return (
        <div>
            <label>{this.state.exerciseRecord.exercise.description}</label>
            <br></br>
            <ReactPlayer className="react-player" url={this.state.exerciseRecord.exercise.url} controls={true} light={true} width="100%" />
            <br></br>
            <label>Series [{this.state.seriesInterval.min} - {this.state.seriesInterval.max}]: </label>
            <input type="text" name="numSeries" id="numSeries" value={this.state.exerciseRecord.numberSeries} onChange={this.newNumberSeries}/>
            <br></br>
            <label>Repetitions [{this.state.exerciseRecord.exercise.numberRepetitions.min} - {this.state.exerciseRecord.exercise.numberRepetitions.max}]: </label>
            <input type="text" name="numRepetitions" id="numRepetitions" value={this.state.exerciseRecord.numberRepetitions} onChange={this.newNumberRepetitions}/>
                
        </div>
    )
    }
}


class DayRecord extends React.Component {
    
        constructor(props) {
            super(props);
            const progEnrollment = props.programEnrollment
            const today = new Date()
            // get day record for date. If not found, create one
            var day_record = progEnrollment.getDayRecordForDay(today)
            if (!day_record) {
                console.log('[DEBUG]: did not find day record for day: ',today, ' thus creating a new one.')
                progEnrollment.initializeDayRecordForDay(today)
                day_record = progEnrollment.getDayRecordForDay(today)
            }

            this.state = {
                programEnrollment: progEnrollment,
                dayRecord: day_record,
                date : today,
            }
        
            // 
            this.backToMain = this.backToMain.bind(this)

            //
            this.newDate = this.newDate.bind(this)

            //
            this.enterAppreciation = this.enterAppreciation.bind(this)
         }

        getAccordionItems(day_record) {
            let accordionBody = [] 
            const exerciseSeries = day_record.exerciseSeries
            day_record.exerciceRecords.forEach((value,key,map) =>{
                // key is the exercise
                // value is the exercise record
                var eventKeyString = key.name  
                const series_range = exerciseSeries.getNumberSeriesForExercise(key)
                console.log('[DayRecord.getAccordionItems()] Series range for exercise ', key.name, ' in exercice series ', exerciseSeries.name, ' is: ', series_range)
                accordionBody.push(
                    <Accordion.Item eventKey={eventKeyString}>
                        <Accordion.Header>{key.name}</Accordion.Header>
                        <Accordion.Body>
                            <ExerciseComponent exercise_record={value} series_range={series_range}/>
                        </Accordion.Body>
                    </Accordion.Item>)   
                }
            )
            return accordionBody
        }


        newDate(){

        }

        enterAppreciation() {

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
              const exerciseSeriesName = this.state.dayRecord.exerciseSeries.name
                return (
                  <div style={{ display: 'block', width: 700, padding: 30 }} align="center">
                    <div >
                        <img alt="CRIUGM" src={logo}/><br></br>                        
                    </div>
                    <label className="GoldFit-header">Program {this.state.programEnrollment.program.name} ({this.state.programEnrollment.program.duration} days) </label>
                    <label className="GoldFit-header">Series: {exerciseSeriesName}</label>
                    <label className="GoldFit-header">Date </label><DatePicker onChange={this.newDate} value={this.state.date} /><label className="GoldFit-header">(Day {this.state.programEnrollment.getDayOfTheProgramCorrespondingToDate(this.state.date)}) </label> 
                    <Accordion defaultActiveKey="1">
                        { 
                        this.getAccordionItems(this.state.dayRecord)
                        }
                    </Accordion>
                    <button className="square" onClick={this.backToMain}>
                    &lt; Main
                    </button>
                    <button className="square" onClick={this.enterAppreciation}>
                        Appreciation &gt;
                    </button>
                  </div>
                );
              }
    }
    
export default DayRecord