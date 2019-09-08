import clsx from 'clsx';
import { saveAs } from 'file-saver';
import React from 'react';
import { saveSvgAsPng } from 'save-svg-as-png';

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

export const Exports: React.FC<{}> = () => {
  return (
    <div className={clsx('font-size:biggish')}>
      <label>Exports</label>
      <div
        className={clsx('box', 'stack')}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <button onClick={saveAsSVG} style={{ fontSize: '1em' }} type="button">
          Save as SVG
        </button>
        <button onClick={saveAsPNG} style={{ fontSize: '1em' }} type="button">
          Save as PNG
        </button>
      </div>
    </div>
  );
};
