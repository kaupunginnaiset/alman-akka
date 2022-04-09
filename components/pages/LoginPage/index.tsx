import { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useRouter } from "next/router";

import { initFirebase } from "../../utils/firebase-utils";

const uiConfig = {
  signInSuccessUrl: "/my-events",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.FacebookAuthProvider.PROVIDER_ID]
};

export const LoginPage = () => {
  const { loading, loggedIn } = initFirebase(useState, useEffect);
  const router = useRouter();
  useEffect(() => {
    if (!loading && loggedIn) {
      router.push("/my-events");
    }
  });

  return loading || loggedIn ? (
    <></>
  ) : (
    <>{!loggedIn && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}</>
  );
};
