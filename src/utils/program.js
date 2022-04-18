"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = exports.Interval = exports.ExerciseSeries = exports.Exercise = void 0;
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
        var globalString = '{' + '"name" : "' + this.name + '";' +
            '"description" : "' + this.description + '";' +
            '"duration" : "' + this.duration + '";' +
            '"mapExerciseSeries" : "' + stringProgSequences + '}';
        return globalString;
    }
}
exports.Program = Program;
;
