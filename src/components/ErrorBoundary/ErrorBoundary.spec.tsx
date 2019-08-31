import '@testing-library/jest-dom/extend-expect';
import { StateMock } from '@react-mock/state';
import { render, RenderResult, waitForElement } from '@testing-library/react';
import React from 'react';

import { DIV_CONTAINER_TEST_ID, ErrorBoundary } from '../ErrorBoundary';

interface MockedState {
  error?: Error;
}

const renderComponent = (mockedState: MockedState): RenderResult => {
  const { error } = mockedState;
  return render(
    <StateMock state={{ error }}>
      <ErrorBoundary />
    </StateMock>
  );
};

describe('ErrorBoundary', () => {
  it('renders some fallback UI when it is in an error state', async () => {
    const { getByTestId } = renderComponent({
      error: new Error('some error thrown by some component in the App'),
    });
    await waitForElement(() => getByTestId(DIV_CONTAINER_TEST_ID));
  });

  it('does not render the fallback UI when it is NOT in an error state', () => {
    const { getByTestId } = renderComponent({});
    expect(() => {
      getByTestId(DIV_CONTAINER_TEST_ID);
    }).toThrow();
  });
});
