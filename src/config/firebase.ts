import * as firebase from 'firebase/app';
import { getDatabase } from 'firebase/database';

import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBUjR_LpKzbeLaBANVXDN84BDLPLRn6VhM',
  authDomain: 'clinus-1d1d1.firebaseapp.com',
  databaseURL: 'https://clinus-1d1d1-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'clinus-1d1d1',
  storageBucket: 'clinus-1d1d1.appspot.com',
  messagingSenderId: '698964272341',
  appId: '1:698964272341:web:f8e27c1489c69dbf6cee5c',
  measurementId: 'G-13Z9189280',
};

// Initialize Firebase
export const firebaseApp = !firebase.getApps().length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.getApps()[0];

export const analytics = getAnalytics(firebaseApp);

export const realtimeDB = getDatabase(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);





