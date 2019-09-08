import clsx from 'clsx';
import React from 'react';

import { useSharedState } from '../../hooks';
import { ShapeOption, shapePickerSubject$ } from './observables';

export const SHAPE_SELECT_TEST_ID = 'sidebar-select-test-id';
const SHAPE_SELECT_ID = 'shape-select-id';
const SHAPE_SELECT_NAME = 'shape-selector';

export const ShapeSelect: React.FC<{}> = () => {
  const [state, setSharedState] = useSharedState(shapePickerSubject$);

  const onShapeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSharedState({
      dropdownChangesCount: state.dropdownChangesCount + 1,
      shape: event.target.value as ShapeOption,
    });
  };

  return (
    <div className={clsx('font-size:biggish')}>
      <label htmlFor={SHAPE_SELECT_ID}>{SHAPE_SELECT_NAME}</label>
      <div className="box">
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
    </div>
  );
};
