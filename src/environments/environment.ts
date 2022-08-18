// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  storageToken: "sp=racw&st=2022-08-10T11:43:06Z&se=2032-09-10T19:43:06Z&sv=2021-06-08&sr=c&sig=itPmF1oHmV0fftWV5HIzfd6yXNzSFnXNZaMC5u0WZdE%3D",
  storageResourceName: "recipes",
  storageUri: "https://recipepile.blob.core.windows.net/",
  recaptcha: {
    siteKey: "6LfnqGshAAAAAPafAk_6gqmMVUx6uEE7ZCkvbm6K"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
