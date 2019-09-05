import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
// import { map } from 'rxjs/operators'; //NOTE this didn't work, whereas adding the three import
// rxjs/add/operator/***** worked to allow it to compile.
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/subscribeOn';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(
    private trainingService: TrainingService) { }

  ngOnInit() {
    // these are always called when go to new training
    // want to subscribe to the subject
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => (this.exercises = exercises)
      );
    this.trainingService.fetchAvailableExercises();
  }

  // This form will give us access to the selected exercise id from the html.
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
