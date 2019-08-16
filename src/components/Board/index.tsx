import React, { useEffect, useRef, useState } from "react";
import { fromEvent, Observable, Observer } from "rxjs";
import { filter, map, pairwise, take, tap } from "rxjs/operators";

import styles from "./styles.module.css";

const subscriberFunction = (ob: Observer<string | boolean>) => {
  ob.next("ciao");
  ob.next("helloooo");
  ob.next("bye");
  ob.next(true);
  // ob.next({ a: 123, b: "456" });
};

const observable = Observable.create(subscriberFunction);

const obsModified = observable.pipe(
  take(40),
  pairwise(),
  tap(x => {
    console.warn("DEBUG after take", x);
  }),
  map((x: string) => `${x.toUpperCase()}`),
  tap(x => {
    console.warn("DEBUG after map", x);
  }),
  filter((x: string) => x.length > 5),
  tap(x => {
    console.warn("DEBUG after filter", x);
  })
);

const observer = {
  complete: () => console.log("COMPLETE"),
  error: (error: any) => console.log(error),
  next: (value: string) => console.log("NEXT value", value),
};

const subscriber = obsModified.subscribe(observer);
console.warn(
  "observable",
  observable,
  "obsModified",
  obsModified,
  "subscriber",
  subscriber
);

subscriber.unsubscribe();

const observableOfClicks = fromEvent<MouseEvent>(document, "click");

const observableOfPairClicks = observableOfClicks.pipe(pairwise());

type PairClicks = [MouseEvent, MouseEvent];
type TripletClicks = [MouseEvent, MouseEvent, MouseEvent];

const makeTripletOfClicks = (events: [PairClicks, PairClicks]) => {
  const ev0 = events[0][0];
  const ev1 = events[0][1];
  const ev2 = events[1][1];
  const triplet = [ev0, ev1, ev2] as TripletClicks;
  return triplet;
};

const observableOfTripletClicks = observableOfClicks.pipe(
  pairwise(),
  pairwise(),
  map(makeTripletOfClicks)
);

const makeCircleFromPairClicks = (pair: PairClicks) => {
  const [ev0, ev1] = pair;
  const cx = ev0.clientX;
  const cy = ev0.clientY;
  const x = ev1.clientX;
  const y = ev1.clientY;
  const r = Math.sqrt(
    Math.pow(Math.abs(x - cx), 2) + Math.pow(Math.abs(y - cy), 2)
  );
  const circle = { cx, cy, r };
  console.warn("circle", circle);
};

observableOfPairClicks.subscribe(makeCircleFromPairClicks);

const makeTriangleFromTriplet = (triplet: TripletClicks) => {
  const [ev0, ev1, ev2] = triplet;
  const a = { x: ev0.clientX, y: ev0.clientY };
  const b = { x: ev1.clientX, y: ev1.clientY };
  const c = { x: ev2.clientX, y: ev2.clientY };
  const triangle = { a, b, c };
  console.warn("triangle", triangle);
};

observableOfTripletClicks.subscribe(makeTriangleFromTriplet);

interface IProps {
  text: string;
}

interface IEvent {
  clientX: number;
  clientY: number;
  timestamp: number;
  x: number;
  y: number;
}

export const TEST_ID_CONTAINER = "board-container-test-id";

export const Board: React.FC<IProps> = props => {
  const { text } = props;

  const [clicks, setClicks] = useState(0);
  const [events, setEvents] = useState<IEvent[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      throw new Error("ASSERT: ref.current is mounted in the DOM");
    }
    console.warn("effect");
    const observableEvent = fromEvent(ref.current, "click");
    observableEvent.subscribe(ev => {
      ev.preventDefault();
      ev.stopPropagation();
      const eventTarget = ev.target;
      if (!eventTarget) {
        throw new Error("ASSERT: the event has a target");
      }
      const div = eventTarget as HTMLDivElement;
      const domRect = div.getBoundingClientRect() as DOMRect;
      const clientX = (ev as MouseEvent).clientX;
      const clientY = (ev as MouseEvent).clientY;
      console.warn("DOM Rect", domRect, "event", ev);
      setEvents([
        ...events,
        {
          clientX,
          clientY,
          timestamp: ev.timeStamp,
          x: domRect.x,
          y: domRect.y,
        },
      ]);
    });
  }, [ref, events]);

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setClicks(clicks + 1);
  };

  return (
    <div
      className={styles.board}
      data-testid={TEST_ID_CONTAINER}
      onClick={onClick}
      ref={ref}
    >
      <h1>{`${text} (${clicks} clicks)`}</h1>
      <p>{"Events"}</p>
      <ol>
        {events.map(ev => (
          <li
            key={ev.timestamp}
          >{`Timestamp: ${ev.timestamp} x: ${ev.x}; y: ${ev.y} clientX: ${ev.clientX} clientY: ${ev.clientY}`}</li>
        ))}
      </ol>
      {events.length && (
        <svg
          height="100%"
          width="100%"
          viewBox="0 0 600 400"
          style={{ outline: "1px dashed orange" }}
        >
          <circle
            cx={events[events.length - 1].clientX}
            cy={events[events.length - 1].clientY}
            r="40"
            stroke="black"
            strokeWidth="3"
            fill={events.length % 2 ? "red" : "green"}
          />
          <text
            className={styles["circle-center"]}
            x={events[events.length - 1].clientX}
            y={events[events.length - 1].clientY}
          >
            {`x: ${events[events.length - 1].clientX}; y: ${events[events.length - 1].clientY}`}
          </text>
        </svg>
      )}
    </div>
  );
};
