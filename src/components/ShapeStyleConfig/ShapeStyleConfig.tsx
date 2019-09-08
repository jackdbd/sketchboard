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
            name="fill"
            onChange={onFillChange}
            placeholder="e.g. #ff0000, red"
            type="text"
            value={state.fill}
          />
        </div>
        <div>
          <label htmlFor="opacity">opacity</label>
          <input
            name="opacity"
            onChange={onOpacityChange}
            placeholder="e.g. 0.5"
            type="text"
            value={state['opacity']}
          />
        </div>
        <div>
          <label htmlFor="stroke">stroke</label>
          <input
            name="stroke"
            onChange={onStrokeChange}
            placeholder="e.g. #ff0000, red"
            type="text"
            value={state.stroke}
          />
        </div>
        <div>
          <label htmlFor="stroke-dasharray">stroke-dasharray</label>
          <select name="stroke-dasharray" onChange={onStrokeDashArrayChange}>
            <option value={DashArray.One}>One</option>
            <option value={DashArray.Two}>Two</option>
            <option value={DashArray.Three}>Three</option>
          </select>
        </div>
        <div>
          <label htmlFor="stroke-opacity">stroke-opacity</label>
          <input
            name="stroke-opacity"
            onChange={onStrokeOpacityChange}
            placeholder="e.g. 0.5"
            style={{ maxWidth: '5rem' }}
            type="text"
            value={state['stroke-opacity']}
          />
        </div>
        <div>
          <label htmlFor="stroke-width">stroke-width</label>
          <input
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
