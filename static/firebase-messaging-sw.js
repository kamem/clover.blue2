importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.0.0/firebase-messaging.js')

firebase.initializeApp({
    apiKey: "AIzaSyC8d5a_FwTGPjryNCJbuq2OCpU-1fPirJU",
    authDomain: "cloverblue-1341.firebaseapp.com",
    databaseURL: "https://cloverblue-1341.firebaseio.com",
    projectId: "cloverblue-1341",
    storageBucket: "cloverblue-1341.appspot.com",
    messagingSenderId: "895752575471",
    appId: "1:895752575471:web:d6bb8a49bb60adca537e1a"
})

const messaging = firebase.messaging()