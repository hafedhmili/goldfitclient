"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program_1 = require("./program");
// Function creates a couple of programs
function createSomeData() {
    console.log('inside create some data');
    var ex1 = new program_1.Exercise('Sit-ups', 'stand in a crouching position and stand up', { min: 20, max: 30 }, new URL('https://youtu.be/ojByzJhwVFE'));
    console.log('ex1', ex1);
    var ex2 = new program_1.Exercise('Lie down', 'not as easy as it seems', { min: 40, max: 50 }, new URL('https://youtu.be/gyds04mi_z0'));
    var ex3 = new program_1.Exercise('Sleeping', 'do not laugh', { min: 50, max: 60 }, new URL('https://youtu.be/ojByzJhwVFE'));
    const eSeries1 = new program_1.ExerciseSeries('Ex12', 'Exercises 1 and 2');
    eSeries1.addExercice(ex1, { min: 2, max: 3 }, 1);
    eSeries1.addExercice(ex2, { min: 3, max: 4 }, 2);
    const eSeries2 = new program_1.ExerciseSeries('Ex13', 'Exercises 1 and 3');
    eSeries2.addExercice(ex1, { min: 2, max: 4 }, 1);
    eSeries2.addExercice(ex3, { min: 2, max: 5 }, 2);
    const eSeries3 = new program_1.ExerciseSeries('Ex123', 'Exercises 1, 2 and 3');
    eSeries3.addExercice(ex1, { min: 2, max: 4 }, 1);
    eSeries3.addExercice(ex2, { min: 4, max: 5 }, 2);
    eSeries3.addExercice(ex3, { min: 3, max: 4 }, 3);
    // two programs
    // program1: the same exercise series every day
    const program1 = new program_1.Program('PACE', 'This is the pace program', 60);
    program1.addExerciseSeries(new program_1.Interval(1, 60), eSeries3);
    console.log(program1);
    // program2: each 20 days of the program have their own exercice series
    const program2 = new program_1.Program('PATH', 'This is the path program', 45);
    program2.addExerciseSeries(new program_1.Interval(1, 15), eSeries1);
    program2.addExerciseSeries(new program_1.Interval(16, 30), eSeries2);
    program2.addExerciseSeries(new program_1.Interval(31, 45), eSeries3);
    //
    console.log('calling stringify inside createSomeData on program1 and program 2:', program1.stringify(), program2.stringify());
    return [program1, program2];
}
function testDataAccess() {
    const programs = createSomeData();
    const pg2 = programs[1];
    console.log('Exercice segments for ' + pg2.name + ': ' + pg2.getNumberOfSegments());
    var day = 1;
    console.log('Exercice segment for day: ' + day + ' of program ' + pg2.name + ' is: ' + pg2.getExerciseSeriesForDay(day));
    day = 30;
    console.log('Exercice segment for day: ' + day + ' of program ' + pg2.name + ' is: ' + pg2.getExerciseSeriesForDay(day));
    day = 60;
    console.log('Exercice segment for day: ' + day + ' of program ' + pg2.name + ' is: ' + pg2.getExerciseSeriesForDay(day));
    const segmentNumber = 2;
    console.log(segmentNumber + 'nd exercise series period: ' + pg2.getInterval(segmentNumber));
}
exports.default = { createSomeData: createSomeData, testDataAccess: testDataAccess };
