import clsx from 'clsx';
import React from 'react';

import { useSharedState } from '../../hooks';
import { Option, ShapePickerSubject } from './observables';
import styles from './styles.module.css';

interface IProps {
  label: string;
}

export const TEST_ID_CONTAINER = 'sidebar-container-test-id';
export const TEST_ID_SELECT = 'sidebar-select-test-id';

export const Sidebar: React.FC<IProps> = props => {
  const { label } = props;

  const [state, setState] = useSharedState(ShapePickerSubject);
  const { dropdownChangesCount, shape } = state;

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState({
      dropdownChangesCount: state.dropdownChangesCount + 1,
      shape: event.target.value as Option,
    });
  };

  const className = clsx(styles.sidebar, 'stack', 'stack-debug');

  return (
    <div className={className} data-testid={TEST_ID_CONTAINER}>
      <div className="stack-small">
        <label htmlFor="shape-select">{label}</label>
        <select
          className={styles.select}
          id="shape-select"
          data-testid={TEST_ID_SELECT}
          name="shape-selector"
          onChange={onChange}
        >
          <option value={Option.Circle}>Circle</option>
          <option value={Option.Triangle}>Triangle</option>
          <option value={Option.BezierCurve}>Bezier Curve</option>
        </select>
      </div>

      <div className="stack-large">
        <p>{`You selected ${shape}`}</p>
        <p>{`You changed ${dropdownChangesCount} times`}</p>
      </div>
    </div>
  );
};
