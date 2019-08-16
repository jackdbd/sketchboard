import { useEffect, useState } from "react";
import { Observable } from "rxjs";

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
                console.warn("COMPLETE");
            },
            error: (err: any) => {
                setError(err);
            },
            next: (val: T) => setValue(val),
        }
        const subscription = observable$.subscribe(observer);
        return () => subscription.unsubscribe();
    }, [observable$]);

    return [value, error];
}
