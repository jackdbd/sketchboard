import React, { ErrorInfo } from 'react';

import styles from './styles.module.css';

interface IProps {
  debug?: boolean;
}

interface IState {
  error?: Error;
  errorInfo?: ErrorInfo;
}

export const DIV_CONTAINER_TEST_ID = 'error-boundary-div-container-test-id';

export class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
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
