// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://instaroof-dev-be.corecotechnologies.com',
  boqBuilderUrl: "https://bom.solarjunction.ai/",
  googlemapKey: "AIzaSyCs3A770pqkEUiqgrcfij2QEJdNh723Ank",
  weatherApiBaseUrl: 'https://api.openweathermap.org',
  geoZipEndpoint: '/geo/1.0/zip',
  weatherApiKey: 'b7574c3c4c844f7cca4bdd492352fa7c',
  firebase: {
    apiKey: "************************************",
    authDomain: "**********************************************",
    projectId: "**********************************************",
    storageBucket: "**********************************************",
    messagingSenderId: "**********************************************",
    appId: "**********************************************",
    measurementId: "**********************************************"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
