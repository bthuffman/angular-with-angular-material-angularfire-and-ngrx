import { Component, OnInit } from '@angular/core';
//1 For subscribing to the changedExercise (training.service) and also to unsubscribe to save memory (that's why rxjs chosen)
import { Subscription } from 'rxjs/Subscription';


import { TrainingService } from './training.service';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining=false;
  //Property of type subscription
  exerciseSubscription: Subscription;
  
  //Inject trainingService
  constructor(private trainingService: TrainingService) { }

  //Set up subscription to the training service. Store it in the subscription, it is whatever gets returned by the subscribe method which is executed on the traingService exervise changed
  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => { 
      if (exercise) {
      this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }
     });
  }

}
