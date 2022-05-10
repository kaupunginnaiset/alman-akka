import styles from "../../../styles/Home.module.css";

import data, { EventFromJSON } from "../../../data";
import { EventCard } from "./EventCard";

interface Event extends EventFromJSON {
  id: string;
}

export const Frontpage = () => {
  return (
    <>
      <h1 className={styles.title}>Tapahtumat</h1>
      <div className={styles.events}>
        {data.map((item: Event) => (
          <EventCard key={item.id} event={item} />
        ))}
      </div>
    </>
  );
};
