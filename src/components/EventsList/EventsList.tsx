import React from "react";

interface IProps {
  events: any;
}

export const EventsList: React.FC<IProps> = props => {
  const { events } = props;
  return (
    <div>
      <p>{`Got ${events.length} events`}</p>
      <ol>
        {events.map((ev: any) => (
          <li
            key={ev.timestamp}
          >{`ts: ${ev.timestamp} x: ${ev.x}; y: ${ev.y} clientX: ${ev.clientX} clientY: ${ev.clientY}`}</li>
        ))}
      </ol>
    </div>
  );
};
