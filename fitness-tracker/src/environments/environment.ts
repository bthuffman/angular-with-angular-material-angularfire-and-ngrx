// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //Adding firebase config/initialize firebase 
  firebase: {
    apiKey: "AIzaSyAC1Ef05ZuJfK-CBotFN1AUgS-QfRhSPvQ",
    authDomain: "all-things-angular-f119f1.firebaseapp.com",
    databaseURL: "https://all-things-angular-f119f1.firebaseio.com",
    projectId: "all-things-angular-f119f1",
    storageBucket: "all-things-angular-f119f1.appspot.com",
    messagingSenderId: "345868579059",
    appId: "1:345868579059:web:0c844d37b3d07e82"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
