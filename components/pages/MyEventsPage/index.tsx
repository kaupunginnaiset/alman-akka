import { useState, useEffect } from "react";
import { initFirebase } from "../LoginPage/firebase-utils";
import { useRouter } from "next/router";

export const MyEventsPage = () => {
  const { loading, loggedIn } = initFirebase(useState, useEffect);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !loggedIn) {
      router.push("/login");
    }
  });

  return loading || !loggedIn ? (
    <></>
  ) : (
    <>
      <h1>Omat tapahtumat</h1>
    </>
  );
};
