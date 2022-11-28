import app from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAiHFqRVJBOoLC6kjUSpySvV02Xm6NLL1w",
  authDomain: "infinity-f0f24.firebaseapp.com",
  projectId: "infinity-f0f24",
  storageBucket: "infinity-f0f24.appspot.com",
  messagingSenderId: "114369220665",
  appId: "1:114369220665:web:8146763c77d19069bf7de8",
  measurementId: "G-S4GEM0QSGG"
};
  
  // Initialize Firebase

app.initializeApp(firebaseConfig);
const db = app.firestore();
 const auth = app.auth();
 export {db,auth}