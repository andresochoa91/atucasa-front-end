import firebase from "firebase";
import "firebase/storage";

export const app = firebase.initializeApp({
  "projectId": process.env.REACT_APP_FIREBASE_PROJECT_ID,
  "appId": process.env.REACT_APP_FIREBASE_APP_ID,
  "databaseURL": process.env.REACT_APP_FIREBASE_DATABASE,
  "storageBucket": process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  "locationId": process.env.REACT_APP_FIREBASE_LOCATION_ID,
  "apiKey": process.env.REACT_APP_FIREBASE_KEY,
  "authDomain": process.env.REACT_APP_FIREBASE_DOMAIN,
  "messagingSenderId": process.env.REACT_APP_FIREBASE_SENDER_ID   
});
