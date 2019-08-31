import React from 'react';

import styles from './styles.module.css';

export const DIV_CONTAINER_TEST_ID = 'fallback-ui-div-container-test-id';

interface Props {
  error: Error;
  errorInfo?: React.ErrorInfo;
  eventId?: string;
  onReportCrashButtonClick: () => void;
}

export const FallbackUI: React.FC<Props> = props => {
  const { error, errorInfo, eventId, onReportCrashButtonClick } = props;

  return (
    <div className={styles['fallback-ui']} data-testid={DIV_CONTAINER_TEST_ID}>
      <h1>Something went wrong.</h1>
      <details>
        {error.toString()}
        <br />
        {errorInfo && errorInfo.componentStack}
      </details>
      {eventId && (
        <button onClick={onReportCrashButtonClick}>Report feedback</button>
      )}
    </div>
  );
};
