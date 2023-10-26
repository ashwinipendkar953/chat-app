import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyB1ERPt_WgDgkL8zeR3YjL0edCifTIkzv0',
  authDomain: 'chat-app-2ad33.firebaseapp.com',
  databaseURL: 'https://chat-app-2ad33-default-rtdb.firebaseio.com/',
  projectId: 'chat-app-2ad33',
  storageBucket: 'chat-app-2ad33.appspot.com',
  messagingSenderId: '60871952585',
  appId: '1:60871952585:web:559f33107ecc3d8c222518',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
