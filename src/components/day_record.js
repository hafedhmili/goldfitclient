import React from 'react'
import ReactDOM from 'react-dom';
import logo from '../criugm-logo.png';
// import Utils from './utils/programs'
import ProgramSummary from './ProgramSummary';
import DatePicker from 'react-date-picker';
import 'bootstrap/dist/css/bootstrap.css';
// import { Exercise, ExerciseSeries, Interval, Program } from './utils/program';
  
import Accordion from 'react-bootstrap/Accordion';
import ReactPlayer from 'react-player';  
import DifficultyLevelInput from './DifficultyLevelInput';
// import { Button } from 'react-bootstrap';


class ExerciseComponent extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            exerciseRecord : props.exercise_record,
            seriesInterval : props.series_range
        }

        console.log('[DEBUG] inside constructor of ExerciseComponent')
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
            const progEnrollment = props.program_enrollment
            const recordDate = props.date
            // get day record for date. If not found, create one
            var day_record = progEnrollment.getDayRecordForDay(recordDate)
            if (!day_record) {
                console.log('[DEBUG]: did not find day record for day: ',recordDate, ' thus creating a new one.')
                progEnrollment.initializeDayRecordForDay(recordDate)
                day_record = progEnrollment.getDayRecordForDay(recordDate)
            }

            this.state = {
                programEnrollment: progEnrollment,
                dayRecord: day_record,
                date : recordDate,
            }
        
            //
            this.getAccordionItems = this.getAccordionItems.bind(this)

            // 
            this.backToMain = this.backToMain.bind(this)

            //
            this.newDate = this.newDate.bind(this)

            //
            this.enterDifficultyLevel = this.enterDifficultyLevel.bind(this)
         }

        getAccordionItems(day_record) {
            console.log('[DEBUG] Inside getAccordionItems()')
            var accordionBody = [] 
            const exerciseSeries = day_record.exerciseSeries
            day_record.exerciceRecords.forEach((value,key,map) =>{
                // key is the exercise
                // value is the exercise record
                var eventKeyString = key.name  
                var accordionItemKey = key.name+day_record.day
                const series_range = exerciseSeries.getNumberSeriesForExercise(key)
                console.log('[DayRecord.getAccordionItems()] Series range for exercise ', key.name, ' in exercice series ', exerciseSeries.name, ' is: ', series_range)
                accordionBody.push(
                    <Accordion.Item eventKey={eventKeyString} key={accordionItemKey}>
                        <Accordion.Header>{key.name}</Accordion.Header>
                        <Accordion.Body>
                            <ExerciseComponent exercise_record={value} series_range={series_range}/>
                        </Accordion.Body>
                    </Accordion.Item>)   
                }
            )
            console.log('[DEBUG] inside getAccordionItems(), prior to returning, accordion body is ',accordionBody)
            return accordionBody
        }


        /**
         * call back once user selects a date
         * @param {*} event 
         * @returns 
         */
        newDate(value){
            // first check that user did not fool around then fall
            // back on original date
            if ((this.state.date.getDate() === value.getDate() ) && 
                (this.state.date.getMonth()=== value.getMonth() ) && 
                (this.state.date.getFullYear()=== value.getFullYear())) return;
            // OK, so it is a different date from the previous one.
            var day_record = this.state.programEnrollment.getDayRecordForDay(value)
            if (!day_record) {
                console.log('[DEBUG]: did not find day record for day: ',value, ' thus creating a new one.')
                this.setState((state)=> {
                    state.programEnrollment.initializeDayRecordForDay(value)
                    state.dayRecord = state.programEnrollment.getDayRecordForDay(value)
                    state.date = value
                    return state
                })
            }
        }

        enterDifficultyLevel() {
            ReactDOM.render(
                <React.StrictMode>
                    <DifficultyLevelInput program_enrollment={this.state.programEnrollment} day_record={this.state.dayRecord}/>
                </React.StrictMode>, document.getElementById('root')
            );

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
            const dayRecord = this.state.dayRecord
            console.log('[DEBUG] Inside render() of DayRecord, this.state.dayRecord is',dayRecord)
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
                        this.getAccordionItems(dayRecord)
                        }
                    </Accordion>
                    <button className="square" onClick={this.backToMain}>
                    &lt; Main
                    </button>
                    <button className="square" onClick={this.enterDifficultyLevel}>
                        Summary Difficulty Level &gt;
                    </button>
                </div>
            );
        }
    }
    
export default DayRecord