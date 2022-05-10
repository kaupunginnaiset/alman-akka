import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { collection, addDoc, query, where, DocumentData, QueryDocumentSnapshot, getDocs } from "firebase/firestore";

import { initFirebase } from "../../utils/firebase-utils";

export const MyEventsPage = () => {
  const { loading, loggedIn, db, user } = initFirebase(useState, useEffect);
  const router = useRouter();

  const [eventAdded, setEventAdded] = useState(false);
  const [events, setEvents] = useState<QueryDocumentSnapshot<DocumentData>[] | null>(null);

  const addEvent = async () => {
    setEventAdded(true);

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
    if (loggedIn && !events && db) {
      (async () => {
        const q = query(collection(db, "events"), where("addedBy", "==", user.currentUser.uid));
        const docs = await getDocs(q);
        setEvents(docs.docs);
      })();
    }
  });

  return loading || !loggedIn ? (
    <></>
  ) : (
    <>
      <h1>Omat tapahtumat</h1>
      {eventAdded ? (
        <p>Tapahtumasi on lähetetty julkaisujonoon!</p>
      ) : (
        <button onClick={addEvent}>Lisää tapahtuma</button>
      )}
      {events && events.map((item: QueryDocumentSnapshot<DocumentData>) => <p key={item.id}>{item.data().title}</p>)}
    </>
  );
};
