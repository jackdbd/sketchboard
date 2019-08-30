import { render } from '@testing-library/react';
import React from 'react';

import { ShapeOption } from './observables';
import {
  DIV_CONTAINER_TEST_ID,
  SHAPE_SELECT_TEST_ID,
  Sidebar,
} from './Sidebar';

describe('Sidebar', () => {
  const label = 'Hello World';

  it('has a div container with the expected CSS classes', () => {
    const { getByTestId } = render(<Sidebar label={label} />);
    const cssClasses = getByTestId(DIV_CONTAINER_TEST_ID).classList;
    expect(cssClasses).toContain('sidebar');
    expect(cssClasses).toContain('stack');
  });

  it('has the select element starting with the expected default shape', () => {
    const { getByTestId } = render(<Sidebar label={label} />);
    const optionElement = getByTestId(SHAPE_SELECT_TEST_ID).firstChild;
    expect(optionElement).toBeDefined();
    const optValue = (optionElement as HTMLOptionElement).getAttribute('value');
    expect(optValue).toBe(ShapeOption.Circle);
  });

  it.todo('is collapsible');
});
