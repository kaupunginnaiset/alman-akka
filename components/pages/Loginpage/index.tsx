import { useState, useEffect } from "react";
import { getAuth, connectAuthEmulator } from "firebase/auth";
//import { initializeApp } from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "demo-test",
  authDomain: "demo-test.firebaseapp.com",
  projectId: "demo-test",
  storageBucket: "demo-test.appspot.com",
  messagingSenderId: "demo-test",
  appId: "demo-test"
};

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID]
};

export const Loginpage = () => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    const initFb = async () => {
      //const app = initializeApp(firebaseConfig);
      firebase.initializeApp(firebaseConfig);
      if (firebaseConfig.projectId.startsWith("demo")) {
        const auth = getAuth();
        connectAuthEmulator(auth, "http://localhost:9099");
      }
    };
    if (!initialized) {
      setInitialized(true);
      initFb();
    }
  }, [initialized, setInitialized]);
  return (
    <>
      <h1>Login</h1>
      {initialized && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
    </>
  );
};
