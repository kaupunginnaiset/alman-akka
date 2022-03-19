import styles from "../../../styles/Home.module.css";

import data from "../../../data";
import { EventCard } from "./EventCard";

export const Frontpage = () => {
  return (
    <>
      <h1 className={styles.title}>Tapahtumat</h1>
      <div className={styles.events}>
        {data.map(item => (
          <EventCard key={item.id} event={item} />
        ))}
      </div>
    </>
  );
};
