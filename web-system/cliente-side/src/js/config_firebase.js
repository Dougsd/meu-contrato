var firebaseConfig = {
    apiKey: "AIzaSyBmbzN2GCTcVJ4QMrejwY0SaYwZf0uBOMw",
    authDomain: "efcaz-f8ca9.firebaseapp.com",
    projectId: "efcaz-f8ca9",
    databaseURL: "https://efcaz-f8ca9-default-rtdb.firebaseio.com/",
    storageBucket: "efcaz-f8ca9.appspot.com",
    messagingSenderId: "469059133543",
    appId: "1:469059133543:web:9b039e1d492518f252b4c2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  var database = firebase.database();
  var storage = firebase.storage();
  var storageRef = firebase.storage().ref();
  var db = firebase.firestore();
