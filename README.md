# NgRxtutorial

This project is used to connect with the state management redux using the ngrx/store plugin

## What is Store

Store is a controlled state container designed to help write performant, consistent application on top of Angular

## Key concepts

* Actions - Describes unique events that are dispatched from components and services
* Reducers - State changes are handled by a pure function called reducers that takes the current state and the latest action to compute a new state
* Selectors - It is a pure function that is used to select derive and compose pieces of state
* Store - State is accessed with store an observable of state and observer of actions


## Installation

* Install the plugin from the [Link](https://www.npmjs.com/package/@ngrx/store)
* Website / Documentation [Link](https://ngrx.io/guide/store)

## About the application

The application created has two modules namely 
  * Create a record
  * List the record

What this appplication will do is it will store the created records in a store and read the records from the store and list it.  

## Store Architecture 

The store has 2 components namely
  * Actions
  * Reducers

### Actions
  It will acts an intermediate between the reducer and the controller where the data which needs to be stored will be passed via the actions

### Reducers
  It will act an intermediate between the store and the action where what kind of operations are needs to be performed when an particular action is get called

## Action syntax

```
export class AddTutorial implements Action {
  readonly type = ADD_TUTORIAL;

  constructor(public payload: Tutorial) {}
}
```

## Reducer syntax

```
import { Tutorial } from '../models/tutorial.model';
import * as TutorialActions from '../actions/tutorials.action';

const initialState: Tutorial = {
  name: 'Initial Tutorial',
  url: 'https://google.com'
};

export function tutorialReducer(state: Tutorial[] = [initialState], action: TutorialActions.Actions) {
  switch (action.type) {
    case TutorialActions.ADD_TUTORIAL:
      return [...state, action.payload];

    case TutorialActions.REMOVE_TUTORIAL:
       state.splice(action.payload, 1);
       return state;
    default:
      return state;
  }
}
```

## Adding reducer to store in app.module.ts

Import the store module and the reducer to app.module.ts like below

```
import { StoreModule } from '@ngrx/store';
import { tutorialReducer } from './reducers/tutorials.reducer';
```

once the files are imported create the store with root in imports

```
imports: [
  BrowserModule,
  StoreModule.forRoot({
    tutorial: tutorialReducer
  })
],
```

## Getting / Reading the reducer in a component

To get the datas from the store to  a component do like below

Open the component.ts file of the selected component and then import the files like below

```
import { AppState } from './../app.state';
import { Tutorial } from './../models/tutorial.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TutorialActions from '../actions/tutorials.action';
```

once the import statements are added create a observable and then pass the tutorial model in it like below and in the constructor inject the store with AppState
Once the injection is done use the command `store.select('your reducer')`

```
  tutorials: Observable<Tutorial[]>;

  constructor(private store: Store<AppState>) {
    this.tutorials = store.select('tutorial');
  }
```

## Writing to a reducer / store

To write the datas to the store using actions do like below

Open the components.ts file of the selected component and then import the files like below

```
import { AppState } from './../app.state';
import { Store } from '@ngrx/store';
import * as TutorialActions from '../actions/tutorials.action';
```

In the above import we have called the action file also. once it is done inject the store in constructor

```
constructor(private store: Store<AppState>) { }

```
Once the injection is done add the store.dispatch method to add data to the reducer like below

```
addTutorial(name, url) {
  this.store.dispatch(new TutorialActions.AddTutorial({ name: name, url: url }));
}
```



## To Be know

 * Why the app.state.ts is used


