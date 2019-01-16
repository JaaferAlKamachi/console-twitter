const firebase = require('firebase')


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA5Escv8ShoTt9rHMFkT9oMy-fPuk61qG4",
    authDomain: "twitterconsoleclone.firebaseapp.com",
    databaseURL: "https://twitterconsoleclone.firebaseio.com",
    projectId: "twitterconsoleclone",
    storageBucket: "twitterconsoleclone.appspot.com",
    messagingSenderId: "772483044838"
  };
  firebase.initializeApp(config);
  const settings = {timestampsinsnapshots:true}
  firebase.firestore().settings(settings)