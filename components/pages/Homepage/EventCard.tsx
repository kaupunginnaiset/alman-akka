import Image from "next/image";
import format from "date-fns/format";
import styles from "../../../styles/Home.module.css";
import { isSameDay } from "date-fns";

interface Event {
  title: string;
  category?: string[];
  location: string;
  img?: string;
  altText?: string;
  startTime: string;
  endTime?: string | null;
  wholeDay?: boolean;
}

interface EventCardProps {
  event: Event;
}

interface TimeProps {
  startDateTime: string;
  endDateTime?: string | null;
  wholeDay?: boolean;
}

interface CategoryProps {
  category: string;
}

const dayFormatString = "d.L.yyyy";
const dayFormatStringWithoutYear = "d.L.";
const timeFormatString = "HH:mm";

const Time = ({ startDateTime, endDateTime, wholeDay }: TimeProps) => {
  const startTimeDate = new Date(startDateTime);
  const endTimeDate = endDateTime ? new Date(endDateTime) : null;
  const startTime = format(startTimeDate, timeFormatString);
  const endTime = endTimeDate ? format(endTimeDate, timeFormatString) : null;

  const shouldShowEndDate = !!endTimeDate && !isSameDay(startTimeDate, endTimeDate);

  return (
    <div className={styles.times}>
      <time dateTime={format(startTimeDate, "yyyy-LL-dd")}>
        {format(startTimeDate, shouldShowEndDate ? dayFormatStringWithoutYear : dayFormatString)}
      </time>
      {shouldShowEndDate ? (
        <>
          -<time dateTime={format(endTimeDate, "yyyy-LL-dd")}>{format(endTimeDate, dayFormatString)}</time>
        </>
      ) : (
        ""
      )}{" "}
      {!wholeDay ? (
        <>
          <time dateTime={startTime}>{startTime}</time>
          {endTime ? (
            <>
              -<time dateTime={endTime}>{endTime}</time>
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const Category = ({ category }: CategoryProps) => {
  return <span className={styles.category}>{category}</span>;
};

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className={styles["event-card"]}>
      <div className={styles["image-container"]}>
        <Image src="https://picsum.photos/200" alt="" width={200} height={200} />
      </div>
      <Time startDateTime={event.startTime} endDateTime={event.endTime} wholeDay={event.wholeDay} />
      <h2>{event.title}</h2>
      <address>{event.location}</address>
      <div className={styles.categories}>
        {event.category?.map(category => (
          <Category key={`${category}-${event.startTime}`} category={category} />
        ))}
      </div>
    </div>
  );
};
