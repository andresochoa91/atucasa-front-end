"use strict";
exports.__esModule = true;
exports.app = void 0;
var firebase_1 = require("firebase");
require("firebase/storage");
exports.app = firebase_1["default"].initializeApp({
    "projectId": "leaflet-react",
    "appId": "1:249401140596:web:177c70e0b412a67119b821",
    "databaseURL": "https://leaflet-react-default-rtdb.firebaseio.com",
    "storageBucket": "leaflet-react.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyBJOu7zQTBJHahpqP_g7M6Xy8yORbaRblM",
    "authDomain": "leaflet-react.firebaseapp.com",
    "messagingSenderId": "249401140596"
});
