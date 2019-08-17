import { Button, Icon, Slider, Switch } from 'antd';
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

  const className = clsx(styles.sidebar, 'stack');

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
        <p>{`You changed shape ${dropdownChangesCount} times`}</p>
      </div>
      <div className="stack-small">
        {'Some icons'}
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
