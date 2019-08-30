import { Button, Icon, Slider, Switch } from 'antd';
import clsx from 'clsx';
import React from 'react';

import { useSharedState } from '../../hooks';
import { ShapeOption, shapePickerSubject$ } from './observables';
import styles from './styles.module.css';

export const DIV_CONTAINER_TEST_ID = 'sidebar-container-test-id';
export const SHAPE_SELECT_TEST_ID = 'sidebar-select-test-id';
const SHAPE_SELECT_ID = 'shape-select-id';
const SHAPE_SELECT_NAME = 'shape-selector';

interface IProps {
  label: string;
}

export const Sidebar: React.FC<IProps> = props => {
  const { label } = props;

  const [state, setSharedState] = useSharedState(shapePickerSubject$);
  const { dropdownChangesCount, shape } = state;

  const onShapeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSharedState({
      dropdownChangesCount: state.dropdownChangesCount + 1,
      shape: event.target.value as ShapeOption,
    });
  };

  return (
    <div
      className={clsx(styles.sidebar, 'stack')}
      data-testid={DIV_CONTAINER_TEST_ID}
    >
      <div className={clsx('stack-small')}>
        <label htmlFor={SHAPE_SELECT_ID}>{label}</label>
        <select
          className={styles.select}
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

      <div className="stack-small">
        <p>{'Some icons'}</p>
        <div style={{ outline: '0.2rem solid orange' }}>
          <Icon type="caret-up" />
          <Icon type="play-circle" />
          <Icon type="radar-chart" />
          <Icon type="heat-map" />
        </div>
        {'Some sliders and switches'}
        <div style={{ outline: '0.2rem solid orange' }}>
          <Slider defaultValue={30} disabled={true} />
          <Slider range defaultValue={[20, 50]} disabled={false} />
          {'Disabled:'}
          <Switch size="small" checked={false} style={{ width: '33%' }} />
          {'Enabled:'}
          <Switch size="small" checked={true} style={{ width: '50%' }} />
        </div>
        <Button type="primary" shape="circle" icon="search" />
        <Button type="primary">
          <span>Button with icon</span>
          <Icon type="taobao" />
        </Button>
        <Button type="dashed" icon="search">
          Search
        </Button>
      </div>

      <Button type="primary">
        <span>Button with icon</span>
        <Icon type="taobao" />
      </Button>
    </div>
  );
};
