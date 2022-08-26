"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramEnrollment = exports.ProgramDayRecord = exports.MotivationLevel = exports.SatisfactionLevel = exports.PainLevel = exports.SelfEfficacy = exports.DifficultyLevel = exports.ExerciseRecord = exports.Patient = exports.Program = exports.Interval = exports.ExerciseSeries = exports.Exercise = void 0;
class Exercise {
    constructor(n, d, nR, ur) {
        this.name = n;
        this.description = d;
        this.numberRepetitions = nR;
        this.url = ur;
    }
}
exports.Exercise = Exercise;
;
class ExerciseSeries {
    constructor(n, d) {
        this.name = n;
        this.description = d;
        this.exercices = new Map();
        this.exerciseOrders = new Map();
    }
    addExercice(ex, interv, position) {
        this.exercices.set(ex, interv);
        this.exerciseOrders.set(position, ex);
    }
    getExerciseAtPosition(position) {
        return this.exerciseOrders.get(position);
    }
    getNumberSeriesForExercise(ex) {
        return this.exercices.get(ex);
    }
    getNumberSeriesForExerciseNumber(num) {
        const ex = this.getExerciseAtPosition(num);
        if (ex)
            return this.exercices.get(ex);
        return undefined;
    }
    getNumberOfExercices() {
        return this.exercices.size;
    }
}
exports.ExerciseSeries = ExerciseSeries;
;
class Interval {
    constructor(mi, ma) {
        this.min = mi;
        this.max = ma;
    }
}
exports.Interval = Interval;
;
class Program {
    constructor(n, des, d) {
        this.name = n;
        this.description = des;
        this.duration = d;
        this.mapExerciseSeries = new Map();
    }
    addExerciseSeries(itr, exSeries) {
        this.mapExerciseSeries.set(itr, exSeries);
    }
    getExerciseSeriesForDay(day) {
        if ((day < 1) || (day > this.duration)) {
            console.log('No exercise series for day: ', day, '. Program is only ', this.duration, ' days long.');
            return null;
        }
        const keys = Array.from(this.mapExerciseSeries.keys());
        const l = keys.length;
        for (var i = 0; i < l; i++) {
            let interval = keys[i];
            if ((day >= interval.min) && (day <= interval.max))
                return this.mapExerciseSeries.get(interval);
        }
        ;
        return null;
    }
    ;
    getNumberOfSegments() {
        return this.mapExerciseSeries.size;
    }
    getInterval(rank) {
        const keys = Array.from(this.mapExerciseSeries.keys());
        keys.sort(function (inta, intb) { return inta.min - intb.min; });
        return keys[rank - 1];
    }
    stringify() {
        var stringProgSequences = '{' + this.mapExerciseSeries + '}';
        //    this.mapExerciseSeries.forEach((element)=> {
        //        stringProgSequences = stringProgSequences+ element.key + '->' + element.value +','
        //    })
        //    stringProgSequences = stringProgSequences.replace(/.$/,'}')
        var globalString = '{ "name" : "' + this.name + '";"description" : "' +
            this.description + '"; "duration" : "' + this.duration +
            '"; "mapExerciseSeries" : "' + stringProgSequences + '}';
        return globalString;
    }
}
exports.Program = Program;
;
class Patient {
    constructor(fName, lName, id) {
        this.firstName = fName;
        this.lastName = lName;
        this.patientId = id;
    }
}
exports.Patient = Patient;
class ExerciseRecord {
    constructor(ex, numSeries, numRepetitions) {
        this.exercise = ex;
        this.numberSeries = numSeries;
        this.numberRepetitions = numRepetitions;
    }
}
exports.ExerciseRecord = ExerciseRecord;
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel["VeryEasy"] = "Very  Easy";
    DifficultyLevel["Easy"] = "Easy";
    DifficultyLevel["Difficult"] = "Difficult";
    DifficultyLevel["VeryDifficult"] = "Very Difficult";
})(DifficultyLevel = exports.DifficultyLevel || (exports.DifficultyLevel = {}));
var SelfEfficacy;
(function (SelfEfficacy) {
    SelfEfficacy["HighlyConfident"] = "Highly Confident";
    SelfEfficacy["Confident"] = "Confident";
    SelfEfficacy["LittleConfident"] = "Little Confident";
    SelfEfficacy["NotConfident"] = "Not Confident";
})(SelfEfficacy = exports.SelfEfficacy || (exports.SelfEfficacy = {}));
var PainLevel;
(function (PainLevel) {
    PainLevel["NoPain"] = "No Pain";
    PainLevel["LittlePain"] = "Little Pain";
    PainLevel["ModeratePain"] = "Moderate Pain";
    PainLevel["SeverePain"] = "Severe Pain";
})(PainLevel = exports.PainLevel || (exports.PainLevel = {}));
var SatisfactionLevel;
(function (SatisfactionLevel) {
    SatisfactionLevel["VerySatisfied"] = "Very Satisfied";
    SatisfactionLevel["Satisfied"] = "Satisfied";
    SatisfactionLevel["Insatisfied"] = "Insatisfied";
    SatisfactionLevel["VeryInsatisfied"] = "Very Insatisfied";
})(SatisfactionLevel = exports.SatisfactionLevel || (exports.SatisfactionLevel = {}));
var MotivationLevel;
(function (MotivationLevel) {
    MotivationLevel["Motivated"] = "Motivated";
    MotivationLevel["NotMotivated"] = "NotMotivated";
})(MotivationLevel = exports.MotivationLevel || (exports.MotivationLevel = {}));
class ProgramDayRecord {
    constructor(d, exSeries) {
        this.day = d;
        this.exerciseSeries = exSeries;
        this.exerciceRecords = new Map();
        this.difficultyLevel = DifficultyLevel.Easy;
        this.selfEfficacy = SelfEfficacy.NotConfident;
        this.painLevel = PainLevel.NoPain;
        this.satisfactionLevel = SatisfactionLevel.Satisfied;
        this.motivationLevel = MotivationLevel.Motivated;
        if (!exSeries) {
            console.log('Exercise series is undefined. Cannot define program day record. The list of exercise records is empty');
            return;
        }
        var exRecord;
        const numExs = exSeries.getNumberOfExercices();
        for (var idx = 1; idx <= numExs; idx++) {
            const exercise = exSeries.getExerciseAtPosition(idx);
            if (exercise) {
                exRecord = new ExerciseRecord(exercise, 0, 0);
                this.exerciceRecords.set(exercise, exRecord);
            }
        }
    }
}
exports.ProgramDayRecord = ProgramDayRecord;
class ProgramEnrollment {
    constructor(p, prog, code, enrDate, startDate) {
        this.patient = p;
        this.program = prog;
        this.enrollmentCode = code;
        this.enrollmentDate = enrDate;
        this.startDate = startDate;
        this.dayRecords = new Map();
    }
    /**
     * A utility function that computes the number of days elapsed between
     * two dates given as an argument
     * @param d1
     * @param d2
     * @returns
     */
    getNumberOfDaysBetween(d1, d2) {
        const days1 = Math.round(d1.getTime() / (1000 * 3600 * 24));
        const days2 = Math.round(d2.getTime() / (1000 * 3600 * 24));
        return days2 - days1;
    }
    /**
     * Given a date as an argument, figures out which day (ordinal number) of the program
     * this is. For example, a program stars April 25th. May 2 is Day 8th of the program
     * @param day
     * @returns
     */
    getDayOfTheProgramCorrespondingToDate(day) {
        return this.getNumberOfDaysBetween(this.startDate, day) + 1;
    }
    /**
     * returns the exercice series that corresponds to a particular date. This
     * depends on: 1) the (structure of the) program, and 2) the start date of
     * the program. If we are out of range, it displays a message to that
     * effect and returns null
     * @param day
     * @returns
     */
    getExerciseSeriesForDay(day) {
        const dayOfTheProgram = this.getDayOfTheProgramCorrespondingToDate(day);
        if (dayOfTheProgram > this.program.duration) {
            console.log('Date ', day, ' is beyond end of the program (', this.program.name, ')');
            return null;
        }
        return this.program.getExerciseSeriesForDay(dayOfTheProgram);
    }
    /**
     * This function takes a date and strips it of hour, minute and second component.
     * This will simply with maps indexed by dates, so that different times during the
     * same day map to the same key/object
     * @param date
     * @returns a Date object having the same year, month, and day
     */
    stripDateToYearMonthDate(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return new Date(year, month, day);
    }
    /**
     * This function is used to initialize a program day record for <code>day</code>
     * based on date day, on program start date, and on program itself.
     * Users can then edit values for series and repetitions for the exercises in the
     * series of the day.
     * We should note that here, we strip the day of hour-min-sec, and leave it just with
     * year, month, and day.
     * This stripping will be used for inserting/writing and retrieving/reading
     * @param day
     * @returns
     */
    initializeDayRecordForDay(fullDateObject) {
        const day = this.stripDateToYearMonthDate(fullDateObject);
        const exerciseSeries = this.getExerciseSeriesForDay(day);
        if (exerciseSeries) {
            const progDayRecord = new ProgramDayRecord(day, exerciseSeries);
            this.dayRecords.set(day.getTime(), progDayRecord);
            return progDayRecord;
        }
        return null;
    }
    /**
     * returns the day record for a specific date
     */
    getDayRecordForDay(fullDateObject) {
        const day = this.stripDateToYearMonthDate(fullDateObject);
        return this.dayRecords.get(day.getTime());
    }
}
exports.ProgramEnrollment = ProgramEnrollment;
