import { AngularFirestore } from '@angular/fire/firestore';
// Instead of using the angular service to emit an event, using the rxjs subject.
import { Subject } from 'rxjs/Subject';

import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingService {
  // 1 New subject that will hold payload of exercise, so that whoever is listening knows which exercise was chosen
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    // store the angular firestore data in the exercises property
    this.db
    // call the collection method which allows you to call from a particular collection in the angularfirestore
    .collection<any>('availableExercises')
    // different event listener that gives us an observable, allows getting the id of the data too.
    .snapshotChanges()
    // gives us an observable
    // .valueChanges()
    // map the document array into an array of exercise objects
    .map(docArray => {
      return docArray.map(doc => {
        return {
          // getting id from firestore by drilling into the object returned from firestore (payload)
          id: doc.payload.doc.id,
          // These would be if wasn't working (this.exercises would be upset right after the ngOnInit)
          // name: doc.payload.doc.data().name,
          // duration: doc.payload.doc.data().duration,
          // calories: doc.payload.doc.data().calories
          // returns an object and pulling the properties out of the returned object to the object that your returning.
          ...doc.payload.doc.data()
        };
      });
    })
    // tslint:disable-next-line: max-line-length
    // Has stuff subscribe to the exercises. If get rid of the observable, this will still attempt to subscribe to it
    // and will eat up computer use as it attempts to grab at nothing.
    .subscribe((exercises: Exercise[]) => {
      console.log(exercises);
      this.availableExercises = exercises;
      // using spread operator so copying the array rather than changing it and causing mutability issues
      this.exercisesChanged.next([...this.availableExercises]);
    });
  }

  // Set the exercise the user chose
  startExercise(selectedId: string) {
    // gives the object the user selected
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    // 1 emits the exercise and returns a new object where distribute all the running properties of
    // the runningExercise. With these you can now subscribe to exerciseChanged
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    // push this into exercise array. The spread operator (...) allows us to copy all the properties of the runningExercise.
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    // push this into exercise array
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
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
