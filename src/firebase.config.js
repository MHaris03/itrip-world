import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyAEyHzJHpObcc2zzitArm-Fi-FCOrIAmzo",
  authDomain: "itrip-world-ce7e6.firebaseapp.com",
  projectId: "itrip-world-ce7e6",
  storageBucket: "itrip-world-ce7e6.firebasestorage.app",
  messagingSenderId: "176660109572",
  appId: "1:176660109572:web:ad4b52076cb95fce3f5851"
};
// Initialize Firebase
const initializeAuthentication = () => {
  return initializeApp(firebaseConfig);
};

export default initializeAuthentication;