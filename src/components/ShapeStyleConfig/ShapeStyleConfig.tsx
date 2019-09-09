import clsx from 'clsx';
import React from 'react';

import { useSharedState } from '../../hooks';
import { shapePickerSubject$ } from '../ShapeSelect';
import { shapeStyleConfigSubject$ } from './observables';
import { DashArray } from './types';

export const ShapeStyleConfig: React.FC<{}> = () => {
  const [{ shape }] = useSharedState(shapePickerSubject$);
  const [state, setSharedState] = useSharedState(shapeStyleConfigSubject$);

  const onFillChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setSharedState({
      ...state,
      fill: event.target.value,
    });
  };

  const onOpacityChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setSharedState({
      ...state,
      opacity: event.target.value,
    });
  };

  const onStrokeChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setSharedState({
      ...state,
      stroke: event.target.value,
    });
  };

  const onStrokeDashArrayChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = event => {
    const options = (event.nativeEvent.srcElement as HTMLSelectElement).options;
    setSharedState({
      ...state,
      'stroke-dasharray': options[options.selectedIndex].value,
    });
  };

  const onStrokeOpacityChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    setSharedState({
      ...state,
      'stroke-opacity': event.target.value,
    });
  };

  const onStrokeWidthChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    setSharedState({
      ...state,
      'stroke-width': event.target.value,
    });
  };

  return (
    <div className={'font-size:biggish'}>
      <label>{`Config style for ${shape}`}</label>
      <div className={clsx('box')}>
        <div>
          <label htmlFor="fill">fill</label>
          <input
            id="fill"
            name="fill"
            onChange={onFillChange}
            type="color"
            value={state.fill}
          />
        </div>
        <div>
          <label htmlFor="opacity">opacity</label>
          <input
            id="opacity"
            max="1"
            min="0"
            name="opacity"
            onChange={onOpacityChange}
            step="0.1"
            type="number"
            value={state.opacity}
          />
        </div>
        <div>
          <label htmlFor="stroke">stroke</label>
          <input
            id="stroke"
            name="stroke"
            onChange={onStrokeChange}
            type="color"
            value={state.stroke}
          />
        </div>
        <div>
          <label htmlFor="stroke-dasharray">stroke-dasharray</label>
          <select
            id="stroke-dasharray"
            name="stroke-dasharray"
            onChange={onStrokeDashArrayChange}
          >
            <option value={'none'}>No dashes nor gaps</option>
            <optgroup label="Dashes and gaps of the same size">
              <option value={DashArray.Three}>{DashArray.Three}</option>
              <option value={DashArray.Four}>{DashArray.Four}</option>
            </optgroup>
            <optgroup label="Dashes and gaps of different size">
              <option value={DashArray.FiveTen}>{DashArray.FiveTen}</option>
              <option value={DashArray.Odd}>{DashArray.Odd}</option>
              <option value={DashArray.Even}>{DashArray.Even}</option>
              <option value={DashArray.Other}>{DashArray.Other}</option>
            </optgroup>
          </select>
        </div>
        <div>
          <label htmlFor="stroke-opacity">stroke-opacity</label>
          <input
            id="stroke-opacity"
            max="1"
            min="0"
            name="stroke-opacity"
            onChange={onStrokeOpacityChange}
            step="0.1"
            type="number"
            value={state['stroke-opacity']}
          />
        </div>
        <div>
          <label htmlFor="stroke-width">stroke-width</label>
          <input
            id="stroke-width"
            name="stroke-width"
            onChange={onStrokeWidthChange}
            placeholder="e.g. 20px"
            type="text"
            value={state['stroke-width']}
          />
        </div>
      </div>
    </div>
  );
};
