// Instead of using the angular service to emit an event, using the rxjs subject.
import { Subject } from 'rxjs/Subject';

import { Exercise } from "./exercise.model";

export class TrainingService {
    //1 New subject that will hold payload of exercise, so that whoever is listening knows which exercise was chosen 
    exerciseChanged = new Subject<Exercise>();

    private availableExercises: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
        { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ];
private runningExercise: Exercise;
private exercises: Exercise[] = [];
    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id == selectedId);
        //1 emits the exercise and returns a new object where distribute all the running properties of the runningExercise. With these you can now subscribe to exerciseChanged
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        //push this into exercise array
        this.exercises.push({ 
            ...this.runningExercise, 
            date: new Date(), 
            state: 'completed' });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        //push this into exercise array
        this.exercises.push({ 
            ...this.runningExercise, 
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(), 
            state: 'cancelled' });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }
}