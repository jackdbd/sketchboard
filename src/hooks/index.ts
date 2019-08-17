import { useEffect, useState } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

/**
 * Reactive Hook that returns a tuple of resolved value and error.
 * @param { Observable<T> } observable$
 * @param { T } defaultValue
 */
export function useObservable<T>(observable$: Observable<T>, initialValue?: T) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState();

  useEffect(() => {
    const observer = {
      complete: () => {
        console.warn('COMPLETE');
      },
      error: (err: any) => {
        setError(err);
      },
      next: (val: T) => setValue(val),
    };
    const subscription = observable$.subscribe(observer);
    return () => subscription.unsubscribe();
  }, [observable$]);

  return [value, error];
}

export const useSharedState = <T>(
  subject: BehaviorSubject<T>
): [T, typeof useState] => {
  const [value, setState] = useState(subject.getValue());
  useEffect(() => {
    const observer = (s: T) => setState(s);
    const subscription = subject.pipe(skip(1)).subscribe(observer);
    return () => subscription.unsubscribe();
  });
  const newSetState = (state: T) => subject.next(state);
  // @ts-ignore
  return [value, newSetState];
};
