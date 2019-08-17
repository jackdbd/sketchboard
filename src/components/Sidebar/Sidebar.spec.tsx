import { render } from '@testing-library/react';
import React from 'react';

import { Option } from './observables';
import { Sidebar, TEST_ID_CONTAINER, TEST_ID_SELECT } from './Sidebar';

describe('Sidebar', () => {
  const label = 'Hello World';

  it('has a div container with the expected CSS classes', () => {
    const { getByTestId } = render(<Sidebar label={label} />);
    const cssClasses = getByTestId(TEST_ID_CONTAINER).classList;
    expect(cssClasses).toContain('sidebar');
    expect(cssClasses).toContain('stack');
  });

  it('has the select element starting with the expected default shape', () => {
    const { getByTestId } = render(<Sidebar label={label} />);
    const optionElement = getByTestId(TEST_ID_SELECT).firstChild;
    expect(optionElement).toBeDefined();
    const optValue = (optionElement as HTMLOptionElement).getAttribute('value');
    expect(optValue).toBe(Option.Circle);
  });

  it.todo('is collapsible');
});
