import axios from 'axios'
import {Exercise,ExerciseSeries,Interval,Program} from './program'

const program_header = (enrollmentCode,callback) => {
    // if enrollment code is empty, it is an error
    if (!enrollmentCode){
        callback('No enrollment code',undefined)
    }

    // build the URL to invoke the service
    const URL = process.env.SERVER_BASE_URL+'programs?ec=' + enrollmentCode

    // make the call
    axios.get(URL)
        .then(res => {
            console.log('The outcome of the call to program header is: ',res.data[0])
            callback(res.data[0])
        })
        .catch( error=>{
                console.log('Error: '+error)    
        })
}

const program_details = (program_name,callback) => {
    // if enrollment code is empty, it is an error
    if (!program_name){
        callback('No program name',undefined)
    }

    // build the URL to invoke the service
    const URL = process.env.SERVER_BASE_URL+'programs/program?pgm_name=' + program_name

    // make the call
    axios.get(URL)
        .then(res => {
            console.log('The outcome of the call to program details is: ',res.data)
            callback(res.data)
        })
        .catch( error=>{
                console.log('Error: '+error)    
        })
}

const build_program = (programDescription) => {
    console.log('Program description inside build_program:', programDescription)
    // programDescription consists of a bunch of rows, each one is the result
    // of joining a bunch of tables. I have to untangle them

    var tablePrograms = new Map();
    var tableExerciceSeries = new Map();
    var tableExercises = new Map();
    var currentProgram = null
    var currentExerciseSeries = null
    var currentExercise = null

    programDescription.forEach(element => {
        // see if object was already created
        currentProgram = tablePrograms.get(element.idprogram)
        if (!currentProgram) {
            currentProgram = new Program(element.programname,element.programdescription,element.programduration)
            tablePrograms.set(element.idprogram,currentProgram)
        }

        // see if exercise series was already created
        
        currentExerciseSeries = tableExerciceSeries.get(element.exerciceseriesid)
        // console.log('exercice series with id: ' + element.ExerciceSeriesId + ' is: ',currentExerciseSeries)
        if (!currentExerciseSeries) {
            currentExerciseSeries = new ExerciseSeries(element.exerciceseriesname,element.exerciceseriesdescription)
            tableExerciceSeries.set(element.exerciceseriesid,currentExerciseSeries)
        }

        // add exercice series for the appropriate start and end date
        // if it has not beed added yet
        var startDay = element.startday, endDay = element.endday
        var progExSeries = currentProgram.getExerciseSeriesForDay(startDay)
        if (!progExSeries) {
            // this means that exercise series has not been added to program
            // thus, add it
            currentProgram.addExerciseSeries(new Interval(startDay,endDay),currentExerciseSeries)
        }

        // now, check if exercise exists, if not, create it
        currentExercise = tableExercises.get(element.exerciceid)
        // console.log('exercice with id: ' + element.ExerciceId + ' is: ',currentExercise)
        if (!currentExercise) {
            currentExercise = new Exercise(element.exercicename,element.exercicedescription,new Interval(element.exercicenumberrepetitionsmin, element.exercicenumberrepetitionsmax), element.exercicedescriptionurl)
            tableExercises.set(element.exerciceid,currentExercise)
        }

        // now, check if currentExercise has been added to currentExerciseSeries, else
        // add it
        var numberSeries = currentExerciseSeries.getNumberSeriesForExercise(currentExercise)
        // console.log('numberSeries in build_program is: ',numberSeries)
        if (!numberSeries) {
            currentExerciseSeries.addExercice(currentExercise,new Interval(element.exercicenumberrepetitionsmin,element.exercicenumberrepetitionsmax),element.exerciseorder)
        } 
    });

    return currentProgram;
}

const Utils = {program_header: program_header, program_details:program_details, build_program:build_program}
export default Utils