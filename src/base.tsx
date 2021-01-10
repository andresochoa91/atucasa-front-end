import firebase from "firebase";
import "firebase/storage";

export const app = firebase.initializeApp({
  // "projectId": "leaflet-react",
  // "appId": "1:249401140596:web:177c70e0b412a67119b821",
  // "databaseURL": "https://leaflet-react-default-rtdb.firebaseio.com",
  // "storageBucket": "leaflet-react.appspot.com",
  // "locationId": "us-central",
  // "apiKey": "AIzaSyBJOu7zQTBJHahpqP_g7M6Xy8yORbaRblM",
  // "authDomain": "leaflet-react.firebaseapp.com",
  // "messagingSenderId": "249401140596"
  "projectId": process.env.REACT_APP_FIREBASE_PROJECT_ID,
  "appId": process.env.REACT_APP_FIREBASE_APP_ID,
  "databaseURL": process.env.REACT_APP_FIREBASE_DATABASE,
  "storageBucket": process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  "locationId": process.env.REACT_APP_FIREBASE_LOCATION_ID,
  "apiKey": process.env.REACT_APP_FIREBASE_KEY,
  "authDomain": process.env.REACT_APP_FIREBASE_DOMAIN,
  "messagingSenderId": process.env.REACT_APP_FIREBASE_SENDER_ID   
});
