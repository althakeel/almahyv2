import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAxwGkgc-tF80w8BLjX3LJywAWXmkojS-w",
  authDomain: "almahy-726d5.firebaseapp.com",
  projectId: "almahy-726d5",
  storageBucket: "almahy-726d5.firebasestorage.app",
  messagingSenderId: "34417985004",
  appId: "1:34417985004:web:1c33899060a03fa44d2cc9",
  measurementId: "G-MQHRT267VN",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

if (typeof window !== "undefined") {
  void isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export const auth = getAuth(app);
export default app;
