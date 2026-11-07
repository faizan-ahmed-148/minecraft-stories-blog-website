// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyC76csqGMYEVosNGIGMz_ZAtBg9PO2zzNw",
  authDomain: "minecraft-stories.firebaseapp.com",
  projectId: "minecraft-stories",
  storageBucket: "minecraft-stories.firebasestorage.app",
  messagingSenderId: "417719094516",
  appId: "1:417719094516:web:2394bc9d0cb05584ba62a1"
};
  
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// self.addEventListener("push", (event) => {
//   const notification = event.data.json();
//   event.waitUntil(self.registration.showNotification(notification.title, {
//       body: notification.body,
//       icon: null,
//       data: {
//           notifURL: notification.url
//       }
//   }));
// });