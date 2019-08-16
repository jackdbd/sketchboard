import React, { useEffect, useRef, useState } from "react";
import { fromEvent, Observable, Observer } from "rxjs";
import { filter, map, take, tap } from "rxjs/operators";

import styles from "./styles.module.css";

const subscriberFunction = (observer: Observer<string | boolean>) => {
  observer.next("ciao");
  observer.next("helloooo");
  observer.next("bye");
  observer.next(true);
  // observer.next({ a: 123, b: "456" });
};

const obs = Observable.create(subscriberFunction);

const obsModified = obs.pipe(
  take(2),
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

const subscription = (v: any) => {
  console.log("next value", v);
};
obsModified.subscribe(subscription);

// range(1, 10)
//   .pipe(
//     filter(x => x % 2 === 1),
//     map(x => x + x)
//   )
//   .subscribe((x: any) => console.warn(x));

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
      // ev.stopPropagation();
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
        </svg>
      )}
    </div>
  );
};
