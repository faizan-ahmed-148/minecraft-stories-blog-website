"use client"
import { useEffect } from 'react';

const useFirebaseNotifications = () => {
  useEffect(() => {
    // Check if browser supports service workers and PushManager
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker Registered', registration);
          // Firebase messaging setup logic goes here
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    } else {
      console.warn('Service Worker or PushManager not supported');
    }
  }, []);
};

export default useFirebaseNotifications;
