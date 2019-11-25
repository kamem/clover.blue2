import Vue from 'vue'
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyC8d5a_FwTGPjryNCJbuq2OCpU-1fPirJU",
    authDomain: "cloverblue-1341.firebaseapp.com",
    databaseURL: "https://cloverblue-1341.firebaseio.com",
    projectId: "cloverblue-1341",
    storageBucket: "cloverblue-1341.appspot.com",
    messagingSenderId: "895752575471",
    appId: "1:895752575471:web:d6bb8a49bb60adca537e1a"
  })
}


const db = firebase.firestore()
if(db) {
  const usersRef = db.collection('users')
  Vue.prototype.$usersRef = usersRef
}

if (firebase.messaging) {
  const messaging = firebase.messaging()
  // Add the public key generated from the console here.
  messaging.usePublicVapidKey('BFBXlbHexn9KAOYevEspjrWSojPXMcsYpZr-U5LTDu1Jnd-S_QqNDMqc88XdcC4nTmOKgjaY99JBTQZsXDZp2d0')
  Vue.prototype.$messaging = messaging
} else {
  Vue.prototype.$messaging = false
}

export default firebase