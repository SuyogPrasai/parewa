import axios from "axios";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf8igzftaoVeI1xRCxTzfcJ5JueQ1r1_Q",
  authDomain: "parewa-messaging.firebaseapp.com",
  projectId: "parewa-messaging",
  storageBucket: "parewa-messaging.firebasestorage.app",
  messagingSenderId: "60767045489",
  appId: "1:60767045489:web:6da20e40af4759580d58d0",
  measurementId: "G-Z1YR0XZE62"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    console.log(process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY)
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      
      await axios.post("/api/store-fcm-token", { token });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
