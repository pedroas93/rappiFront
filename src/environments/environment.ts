// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBriKId0VuL-Au0ULaL_fOdBkEwg-MfmlE',
    authDomain: 'gluck-91514.firebaseapp.com',
    databaseURL: 'https://gluck-91514.firebaseio.com',
    projectId: 'gluck-91514',
    storageBucket: 'gluck-91514.appspot.com',
    messagingSenderId: '286571691707'
  },
  days: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
  roles: ['admin', 'professional']
};
// nodeserver: 'http://192.168.2.70:8080', Johan
// nodeServer = 'http://192.168.2.197:8080'; anitsirc
export const nodeServer = 'http://192.168.2.70:8080';

