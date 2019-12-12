import { AppState } from './../app.state';
import { Tutorial } from './../models/tutorial.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TutorialActions from '../actions/tutorials.action';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  tutorials: Observable<Tutorial[]>;

  constructor(private store: Store<AppState>) {
    this.tutorials = store.select('tutorial');
  }

  ngOnInit() {
  }

  deleteTutorial(index: number) {
    this.store.dispatch(new TutorialActions.RemoveTutorial(index));
  }

}
