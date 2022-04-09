import { EffectCallback, DependencyList } from "react";
import { getAuth, connectAuthEmulator, onAuthStateChanged } from "firebase/auth";
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

export const initFirebase = (
  stateHook: (initialState: any) => any,
  effectHook: (effect: EffectCallback, deps?: DependencyList | undefined) => void
) => {
  const [initialized, setInitialized] = stateHook(false);
  const [user, setUser] = stateHook(null);
  const [unsubscribe, setUnsubscribe] = stateHook(null);
  effectHook(() => {
    const initFb = async () => {
      firebase.initializeApp(firebaseConfig);
      const auth = getAuth();
      if (firebaseConfig.projectId.startsWith("demo")) {
        connectAuthEmulator(auth, "http://localhost:9099");
      }
      setUnsubscribe(
        onAuthStateChanged(auth, () => {
          setUser(getAuth());
        })
      );
    };
    if (!initialized) {
      setInitialized(true);
      if (firebase.apps.length === 0) {
        initFb();
      } else {
        setUser(getAuth());
      }
    }
    return () => unsubscribe && unsubscribe();
  }, [initialized, setInitialized, user, setUser, unsubscribe, setUnsubscribe]);
  return { user, loading: !user, loggedIn: user && user.currentUser };
};
