import { getMessaging, isSupported } from "firebase/messaging";
import { initializeApp } from "firebase/app";

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging (FCM)
export let messaging;

if (typeof window !== "undefined") {
  try {
    isSupported().then((res) => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register('/firebase-messaging-sw.js', { scope: '/firebase-cloud-messaging-push-scope' })
          .then((registration) => {
            messaging = getMessaging(firebaseApp);
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      } else {
        console.warn("Service Worker is not supported in this browser.");
      }
    });
  } catch (e) {
    console.warn("Messaging error:", e);
  }
}
