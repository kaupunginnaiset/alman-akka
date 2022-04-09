import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";

import { useRouter } from "next/router";

import { initFirebase } from "../../utils/firebase-utils";

export const LogoutPage = () => {
  const { user } = initFirebase(useState, useEffect);
  const router = useRouter();
  useEffect(() => {
    if (user && user.currentUser) {
      signOut(user);
    }
    router.push("/");
  });

  return <></>;
};
