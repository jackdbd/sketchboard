import * as Sentry from '@sentry/browser';
import React, { ErrorInfo } from 'react';

import { FallbackUI } from './FallbackUI';

interface Props {
  debug?: boolean;
}

interface State {
  error?: Error;
  errorInfo?: ErrorInfo;
  eventId?: string;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined, eventId: undefined };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ error, errorInfo, eventId });
    });
  }

  public render(): JSX.Element {
    const { children, debug } = this.props;
    const { error, errorInfo, eventId } = this.state;

    if (error && debug) {
      console.error('--- ERROR ---', error);
    }

    return error ? (
      <FallbackUI
        error={error}
        errorInfo={errorInfo}
        eventId={eventId}
        onReportCrashButtonClick={this.onReportCrash}
      />
    ) : (
      <React.Fragment>{children}</React.Fragment>
    );
  }

  private onReportCrash = (): void => {
    Sentry.showReportDialog({ eventId: this.state.eventId });
  };
}
