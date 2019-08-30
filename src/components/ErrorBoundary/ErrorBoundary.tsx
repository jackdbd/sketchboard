import React, { ErrorInfo } from 'react';

import styles from './styles.module.css';

interface Props {
  debug?: boolean;
}

interface State {
  error?: Error;
  errorInfo?: ErrorInfo;
}

export const DIV_CONTAINER_TEST_ID = 'error-boundary-div-container-test-id';

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });
  }

  public render(): JSX.Element {
    const { children, debug } = this.props;
    const { error, errorInfo } = this.state;
    if (error && debug) {
      console.error('--- ERROR ---', error);
    }
    return error ? (
      <div
        className={styles['error-boundary']}
        data-testid={DIV_CONTAINER_TEST_ID}
      >
        <h1>Something went wrong.</h1>
        <details>
          {error && error.toString()}
          <br />
          {errorInfo && errorInfo.componentStack}
        </details>
      </div>
    ) : (
      <React.Fragment>{children}</React.Fragment>
    );
  }
}
