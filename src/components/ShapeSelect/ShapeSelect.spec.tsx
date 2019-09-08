import { render } from '@testing-library/react';
import React from 'react';

import { ShapeOption } from './observables';
import { SHAPE_SELECT_TEST_ID, ShapeSelect } from './ShapeSelect';

describe('ShapeSelect', () => {
  it('has the select element starting with the expected default shape', () => {
    const { getByTestId } = render(<ShapeSelect />);
    const optionElement = getByTestId(SHAPE_SELECT_TEST_ID).firstChild;
    expect(optionElement).toBeDefined();
    const optValue = (optionElement as HTMLOptionElement).getAttribute('value');
    expect(optValue).toBe(ShapeOption.Circle);
  });
});
