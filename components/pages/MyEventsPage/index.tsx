import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { collection, addDoc } from "firebase/firestore";

import { EventFromJSON } from "../../../data";
import { initFirebase } from "../../utils/firebase-utils";
import { start } from "repl";

export const MyEventsPage = () => {
  const { loading, loggedIn, db, user } = initFirebase(useState, useEffect);
  const router = useRouter();

  const addEvent = async () => {
    const currentDate = new Date();
    const startTime = new Date(currentDate);
    startTime.setDate(currentDate.getDate() + 1);
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);
    const dummyEvent = {
      externalId: "dummy",
      category: ["dummy-category"],
      event: "dummy-event",
      title: "Dummy event",
      location: "Online",
      address: "http://localhost",
      area: "dummy-area",
      description: "Dummy event description",
      url: "http://localhost",
      startTime,
      endTime,
      wholeDay: false,
      lastModified: currentDate,
      addedBy: user.currentUser.uid
    };
    await addDoc(collection(db, "events"), dummyEvent);
  };

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
      <button onClick={addEvent}>Lisää tapahtuma</button>
    </>
  );
};
