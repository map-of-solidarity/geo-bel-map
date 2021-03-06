import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/messaging";
const firebaseDevConfig = {
  apiKey: "AIzaSyDAq7f8_hKXQ5kK4rUdDWTsUhl_sLDnzOA",
  authDomain: "geobel-5a886.firebaseapp.com",
  databaseURL: "https://geobel-5a886.firebaseio.com",
  projectId: "geobel-5a886",
  storageBucket: "geobel-5a886.appspot.com",
  messagingSenderId: "788850460983",
  appId: "1:788850460983:web:434744acb5d3e38bc172b2",
  measurementId: "G-1QYVEBK6H3",
};

const firebaseProdConfig = {
  apiKey: "AIzaSyDAq7f8_hKXQ5kK4rUdDWTsUhl_sLDnzOA",
  authDomain: "geobel-5a886.firebaseapp.com",
  databaseURL: "https://geobel-5a886.firebaseio.com",
  projectId: "geobel-5a886",
  storageBucket: "geobel-5a886.appspot.com",
  messagingSenderId: "788850460983",
  appId: "1:788850460983:web:434744acb5d3e38bc172b2",
  measurementId: "G-1QYVEBK6H3",
};

const firebaseConfig =
  process.env.NODE_ENV === "production"
    ? firebaseProdConfig
    : firebaseDevConfig;

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.initFirebase().catch(e => console.log('err in firebase init', e))
  }

  async initFirebase() {

    if (await firebase.analytics.isSupported()) {
      this.analytics = firebase.analytics();
    } else {
      console.warn('firebase analytics not supported')
    }
    if (await firebase.messaging.isSupported()) {
      this.messaging = firebase.messaging();
    } else {
      console.warn('firebase messaging not supported')
    }
  }
}

const firebaseInst = new Firebase();
export default firebaseInst;
