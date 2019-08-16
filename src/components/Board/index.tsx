import React, { useEffect, useRef } from "react";
import { fromEvent, Observable, Observer } from "rxjs";
import { useEventCallback } from "rxjs-hooks";
import { filter, map, pairwise, scan, take, tap } from "rxjs/operators";

import {
  makeCircleFromPairClicks,
  makeTriangleFromTriplet,
  myObserver,
} from "./observers";

import { EventsList } from "../EventsList";
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

observableOfPairClicks.subscribe(makeCircleFromPairClicks);
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

  // const [clicks, setClicks] = useState(0);
  // const [events, setEvents] = useState<IEvent[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      throw new Error("ASSERT: ref.current is mounted in the DOM");
    }
    // console.warn("effect", setEvents);
    const observableEvent = fromEvent(ref.current, "click");
    const subscription = observableEvent.subscribe(myObserver);
    console.log(
      "Remember to unsubscribe with subscription.unsubscribe()",
      subscription
    );
  }, [ref]);

  const accumulator = (
    acc: IEvent[],
    ev: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    return [
      ...acc,
      {
        clientX: ev.clientX,
        clientY: ev.clientY,
        timestamp: ev.timeStamp,
        x: ev.screenX,
        y: ev.screenY,
      },
    ];
  };

  const [clickCallback, events] = useEventCallback<
    React.MouseEvent<HTMLElement, MouseEvent>,
    IEvent[]
  >(event$ => {
    return event$.pipe(scan(accumulator, []));
  }, []);

  return (
    <div
      className={styles.board}
      data-testid={TEST_ID_CONTAINER}
      onClick={clickCallback}
      ref={ref}
    >
      <h1>{text}</h1>
      <EventsList events={events} />
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
