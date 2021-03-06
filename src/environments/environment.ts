// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDJzkITNAiY_OIGpxgwNbjOQpYzoGKEBXY',
    authDomain: 'grocery-7a2cc.firebaseapp.com',
    databaseURL: 'https://grocery-7a2cc.firebaseio.com',
    projectId: 'grocery-7a2cc',
    storageBucket: 'grocery-7a2cc.appspot.com',
    messagingSenderId: '829896509671'
  },
  actionCodeSettings: {
    url: 'http://localhost:4200/login',
    handleCodeInApp: true
  },
  apiSettings: {
    apiUrl: 'https://us-central1-grocery-7a2cc.cloudfunctions.net'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
