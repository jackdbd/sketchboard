import clsx from 'clsx';
import { saveAs } from 'file-saver';
import React from 'react';
import { saveSvgAsPng } from 'save-svg-as-png';

import { useSharedState } from '../../hooks';
import { ShapeOption, shapePickerSubject$ } from './observables';
import styles from './styles.module.css';

export const DIV_CONTAINER_TEST_ID = 'sidebar-container-test-id';
export const SHAPE_SELECT_TEST_ID = 'sidebar-select-test-id';
const SHAPE_SELECT_ID = 'shape-select-id';
const SHAPE_SELECT_NAME = 'shape-selector';

interface Props {
  label: string;
}

const saveAsPNG = (): void => {
  const svg = document.querySelector('svg');
  if (svg) {
    saveSvgAsPng(svg, 'drawing.png', {
      scale: 0.5,
    });
  }
};

const saveAsSVG = (): void => {
  const svg = document.querySelector('svg');
  if (svg) {
    const serializer = new XMLSerializer();
    const svgBlob = new Blob([serializer.serializeToString(svg)], {
      type: 'image/svg+xml',
    });
    saveAs(svgBlob, 'disegno.svg');
  }
};

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

      <button onClick={saveAsSVG} type="button">
        Save as SVG
      </button>
      <button onClick={saveAsPNG} type="button">
        Save as PNG
      </button>
    </div>
  );
};
