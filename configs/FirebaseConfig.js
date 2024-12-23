import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcXK3H3RqpNSicGrIVBTXlD0Yte8Pue9Y",
  authDomain: "final-lab-exam-11.firebaseapp.com",
  projectId: "final-lab-exam-11",
  storageBucket: "final-lab-exam-11.firebasestorage.app",
  messagingSenderId: "100133611967",
  appId: "1:100133611967:web:f1b467fef8e210d693d90a",
  measurementId: "G-62GL6J0J6J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export const db = getFirestore(app)