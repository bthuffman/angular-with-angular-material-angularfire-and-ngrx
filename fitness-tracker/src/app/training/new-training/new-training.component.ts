import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Rx';
// import { map } from 'rxjs/operators'; //NOTE this didn't work, whereas adding the three import rxjs/add/operator/***** worked to allow it to compile. 
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/take'; 
// import 'rxjs/add/operator/subscribeOn'; 

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>;
  constructor(
    private trainingService: TrainingService, 
    //inject AngularFirestore
    private db: AngularFirestore) { }

  ngOnInit() {
    //store this in the exercises property
    this.exercises = this.db
    //call the collection method which allows you to call from a particular collection in the angularfirestore
    .collection<any>('availableExercises')
    //different event listener that gives us an observable, allows getting the id of the data too.
    .snapshotChanges()
    //gives us an observable
    // .valueChanges()
    .map(docArray => {
      return docArray.map(doc => {
        return {
          //getting id from firestore
          id: doc.payload.doc.id,
          // These would be if wasn't working.
          name: doc.payload.doc.data().name,
          duration: doc.payload.doc.data().duration,
          calories: doc.payload.doc.data().calories
          //returns an object and pulling the properties out of the returned object to the object that your returning.
          // ...doc.payload.doc.data()
        };
      });
    })
    //Has stuff subscribe to the exercises. If get rid of the observable, this will still attempt to subscribe to it and will eat up computer use as it attempts to grab at nothing. 
    this.exercises.subscribe((stuff) => {
      console.log(stuff);
    });
  }


  // This form will give us access to the selected exercise id from the html.
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
