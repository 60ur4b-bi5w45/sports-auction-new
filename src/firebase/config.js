import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAJmyKAS9_NnbT7pxyY4enAquvDngoJN5s",
  authDomain: "sports-auction-6efb8.firebaseapp.com",
  projectId: "sports-auction-6efb8",
  storageBucket: "sports-auction-6efb8.firebasestorage.app",
  messagingSenderId: "265292752732",
  appId: "1:265292752732:web:dafa4d3a89c8f0023e8399",
  measurementId: "G-D1RMTBP3VW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export default app; 