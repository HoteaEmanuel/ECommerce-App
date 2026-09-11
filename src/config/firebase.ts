import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Optionally import the services that you want to use
// import {...} from 'firebase/database';

// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBO2jiltGs2C3CdW4wDqlDGGbz-yZAGJto",
  authDomain: "smart-ecommerce-9dd57.firebaseapp.com",
  projectId: "smart-ecommerce-9dd57",
  storageBucket: "smart-ecommerce-9dd57.firebasestorage.app",
  messagingSenderId: "988119754947",
  appId: "1:988119754947:web:5e15679251497241491a76",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
