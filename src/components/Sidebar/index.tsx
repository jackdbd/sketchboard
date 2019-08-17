import React, { useState } from "react";
import { BehaviorSubject } from "rxjs";

import { useSharedState } from "../../hooks";
import styles from "./styles.module.css";

interface IProps {
  text: string;
}

enum Option {
  Circle = "Circle",
  Triangle = "Triangle",
  BezierCurve = "Bezier Curve",
}

export const TEST_ID_CONTAINER = "sidebar-container-test-id";

export const PickerStateSubject = new BehaviorSubject({
  dropdownChangesCount: 0,
  shape: Option.Triangle,
});

export const Sidebar: React.FC<IProps> = props => {
  const { text } = props;

  // shared state
  const [state, setState] = useSharedState(PickerStateSubject);
  const { dropdownChangesCount, shape } = state;

  // local state
  const [clicks, setClicks] = useState(0);

  const onClick = () => {
    setClicks(clicks + 1);
  };

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      dropdownChangesCount: state.dropdownChangesCount + 1,
      shape: event.target.value as Option,
    });
  };

  return (
    <div
      className={styles.sidebar}
      data-testid={TEST_ID_CONTAINER}
      onClick={onClick}
    >
      {`${text} (${clicks} clicks)`}
      <label htmlFor="shape-select">Choose a shape to draw:</label>
      <select id="shape-select" name="shape-selector" onChange={onChange}>
        <option value={Option.Circle}>Circle</option>
        <option value={Option.Triangle}>Triangle</option>
        <option value={Option.BezierCurve}>Bezier Curve</option>
      </select>
      <p>{`You selected ${shape}`}</p>
      <p>{`You changed ${dropdownChangesCount} times`}</p>
    </div>
  );
};
