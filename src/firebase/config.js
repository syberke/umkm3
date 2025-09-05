import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAiV3x-AVtGqOPNKh-HHx1N2fKVYbbWb1I",
  authDomain: "umkm1-8b782.firebaseapp.com",
  projectId: "umkm1-8b782",
  storageBucket: "umkm1-8b782.firebasestorage.app",
  messagingSenderId: "411008593271",
  appId: "1:411008593271:web:a9f4a5948ae4eb99628572",
  measurementId: "G-S5PD346NEG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;