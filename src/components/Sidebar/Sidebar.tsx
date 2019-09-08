import clsx from 'clsx';
import React from 'react';

import { useSharedState } from '../../hooks';
import { Exports } from '../Exports';
import { ShapeOption, shapePickerSubject$ } from './observables';

export const DIV_CONTAINER_TEST_ID = 'sidebar-container-test-id';
export const SHAPE_SELECT_TEST_ID = 'sidebar-select-test-id';
const SHAPE_SELECT_ID = 'shape-select-id';
const SHAPE_SELECT_NAME = 'shape-selector';

interface Props {
  label: string;
}

export const Sidebar: React.FC<Props> = props => {
  const { label } = props;

  const [state, setSharedState] = useSharedState(shapePickerSubject$);
  const { dropdownChangesCount, shape } = state;

  const onShapeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSharedState({
      dropdownChangesCount: state.dropdownChangesCount + 1,
      shape: event.target.value as ShapeOption,
    });
  };

  return (
    <div className={clsx('stack')} data-testid={DIV_CONTAINER_TEST_ID}>
      <div className={clsx('stack-small')}>
        <label htmlFor={SHAPE_SELECT_ID}>{label}</label>
        <select
          id={SHAPE_SELECT_ID}
          data-testid={SHAPE_SELECT_TEST_ID}
          name={SHAPE_SELECT_NAME}
          onChange={onShapeChange}
        >
          <option value={ShapeOption.Circle}>Circle</option>
          <option value={ShapeOption.Triangle}>Triangle</option>
          <option value={ShapeOption.Rectangle}>Rectangle</option>
          <option value={ShapeOption.BezierCurve}>Bezier Curve</option>
        </select>
      </div>

      <div className={clsx('stack-large')}>
        <p>{`You selected ${shape}`}</p>
        <p>{`You changed shape ${dropdownChangesCount} times`}</p>
      </div>
      <Exports />
    </div>
  );
};
