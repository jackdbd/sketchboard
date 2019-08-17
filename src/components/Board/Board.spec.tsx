import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Board, TEST_ID_CONTAINER, TEST_ID_SVG } from './Board';

describe('Board', () => {
  it('has a svg whose width and height are responsive', () => {
    const { getByTestId } = render(<Board />);
    const svg = getByTestId(TEST_ID_SVG);
    expect(svg.getAttribute('width')).toBe('100%');
    expect(svg.getAttribute('height')).toBe('100%');
  });

  it('can be clicked (TODO: re-render, wait for click to take effect?)', () => {
    const { getByTestId } = render(<Board />);
    const el = getByTestId(TEST_ID_CONTAINER);
    fireEvent(el, new MouseEvent('click'));
  });

  it.todo('something to be done');
});
