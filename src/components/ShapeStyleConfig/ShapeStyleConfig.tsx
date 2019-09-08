import clsx from 'clsx';
import React from 'react';
import useForm from 'react-hook-form';

import { useSharedState } from '../../hooks';
import { shapePickerSubject$ } from '../Sidebar';
import { shapeStyleConfigSubject$ } from './observables';
import { DashArray, ShapeStyleConfigState } from './types';

/**
 * TODO: maybe I don't need to use a form and react-hook-form.
 * I could use value and onChange on each input/select field and call
 * setSharedState.
 */
export const ShapeStyleConfig: React.FC<{}> = () => {
  const [{ shape }] = useSharedState(shapePickerSubject$);
  const [state, setSharedState] = useSharedState(shapeStyleConfigSubject$);

  const { register, handleSubmit } = useForm<ShapeStyleConfigState>();

  const onSubmit = (data: ShapeStyleConfigState): void => {
    console.log('state', state);

    setSharedState({
      fill: data.fill,
      stroke: data.stroke,
      'stroke-dasharray': data['stroke-dasharray'],
      'stroke-width': data['stroke-width'],
    });
  };

  return (
    <form className={'font-size:biggish'} onSubmit={handleSubmit(onSubmit)}>
      <label>{`Config style for ${shape}`}</label>
      <div className={clsx('box')}>
        <div>
          <label htmlFor="fill">fill</label>
          <input
            type="text"
            name="fill"
            placeholder="e.g. #ff0000, red"
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="stroke">stroke</label>
          <input
            type="text"
            name="stroke"
            placeholder="e.g. #ff0000, red"
            ref={register}
          />
        </div>
        <div>
          <label htmlFor="stroke-dasharray">stroke-dasharray</label>
          <select name="stroke-dasharray" ref={register}>
            <option value={DashArray.One}>One</option>
            <option value={DashArray.Two}>Two</option>
            <option value={DashArray.Three}>Three</option>
          </select>
        </div>
        <div>
          <label htmlFor="stroke-opacity">stroke-opacity</label>
          <input
            type="text"
            name="stroke-opacity"
            placeholder="e.g. 0.5"
            ref={register}
            style={{ maxWidth: '5rem' }}
          />
        </div>
        <div>
          <label htmlFor="stroke-width">stroke-width</label>
          <input
            type="text"
            name="stroke-width"
            placeholder="e.g. 20px"
            ref={register}
          />
        </div>
        <input type="submit" />
      </div>
    </form>
  );
};
