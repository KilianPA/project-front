// import something here
const firebase = require('firebase')
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  var config = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: process.env.FIREBASE_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_SENDER_ID
  }
  Vue.prototype.$firebase = firebase.initializeApp(config)
}
