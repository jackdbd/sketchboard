import React, { useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
// import { filter, map } from "rxjs/operators";

import styles from "./styles.module.css";

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
    // console.warn("effect", ref.current, fromEvent);
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
      const clientY = (ev as MouseEvent).clientX;
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
  });

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
      <ul>
        {events.map(ev => (
          <li
            key={ev.timestamp}
          >{`Timestamp: ${ev.timestamp} x: ${ev.x}; y: ${ev.y} clientX: ${ev.clientX} clientY: ${ev.clientY}`}</li>
        ))}
      </ul>
    </div>
  );
};
