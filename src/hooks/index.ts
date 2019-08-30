import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';

export const useSharedState = <T>(
  subject: BehaviorSubject<T>
): [T, typeof useState] => {
  const [state, setState] = useState(subject.getValue());

  useEffect(() => {
    const observer = (state: T): void => setState(state);
    /*
      The first event is skipped because a BehaviorSubject always notifies its
      subscribers (i.e observers) of its initial state.
    */
    const subscription = subject.pipe(skip(1)).subscribe(observer);
    return (): void => subscription.unsubscribe();
  });

  const newSetState = (state: T): void => subject.next(state);

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return [state, newSetState];
};
