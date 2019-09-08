import { render } from '@testing-library/react';
import React from 'react';

import { DIV_CONTAINER_TEST_ID, Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('has a div container with the `stack` CSS class', () => {
    const { getByTestId } = render(<Sidebar />);
    const cssClasses = getByTestId(DIV_CONTAINER_TEST_ID).classList;
    expect(cssClasses).toContain('stack');
  });

  it.todo('is collapsible');
});
