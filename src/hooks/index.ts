import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';

export const useSharedState = <T>(
  subject: BehaviorSubject<T>
): [T, typeof useState] => {
  const [state, setState] = useState(subject.getValue());

  useEffect(() => {
    const observer = (state: T) => setState(state);
    const subscription = subject.pipe(skip(1)).subscribe(observer);
    return () => subscription.unsubscribe();
  });

  const newSetState = (state: T) => subject.next(state);

  // @ts-ignore
  return [state, newSetState];
};
