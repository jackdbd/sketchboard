import { Subscription } from 'rxjs';

import { initialState, shapePickerSubject$, ShapeOption } from './observables';

// we don't care about dropdownChangesCount, so we don't change it.
const dropdownChangesCount = 0;

function onShapeOptionChange(event: Event): void {
  if (!event.target) {
    throw new Error(
      'ASSERT: change event is dispatched by a select element, so it always has a target'
    );
  }
  const value = (event.target as HTMLSelectElement).value;
  const shape = value as ShapeOption;
  shapePickerSubject$.next({ dropdownChangesCount, shape });
}

describe('shapePickerSubject$', () => {
  let select: HTMLSelectElement;
  let defaultOption: HTMLOptionElement;
  let unselectedOption: HTMLOptionElement;
  let selectedOption: HTMLOptionElement;
  const observer0 = jest.fn();
  const observer1 = jest.fn();
  let subscription0: Subscription;
  let subscription1: Subscription;

  beforeAll(() => {
    select = document.createElement('select');
    select.addEventListener('change', onShapeOptionChange);
    defaultOption = new Option(
      'Circle (default, unselected)',
      ShapeOption.Circle,
      true,
      false
    );
    unselectedOption = new Option(
      'Triangle (unselected)',
      ShapeOption.Triangle,
      false,
      false
    );
    selectedOption = new Option(
      'Triangle (selected)',
      ShapeOption.Triangle,
      false,
      true
    );
  });

  afterAll(() => {
    select.removeEventListener('change', onShapeOptionChange);
  });

  beforeEach(() => {
    subscription0 = shapePickerSubject$.subscribe(observer0);
    subscription1 = shapePickerSubject$.subscribe(observer1);
    select.appendChild(defaultOption);
    select.appendChild(unselectedOption);
  });

  afterEach(() => {
    observer0.mockRestore();
    observer1.mockRestore();
    subscription0.unsubscribe();
    subscription1.unsubscribe();
    while (select.firstChild) {
      select.removeChild(select.firstChild);
    }
  });

  it('calls its observers with an *initial state* as soon as they subscribe', () => {
    expect(observer0).toHaveBeenCalledTimes(1);
    expect(observer0).toHaveBeenCalledWith(initialState);
    expect(observer1).toHaveBeenCalledTimes(1);
    expect(observer1).toHaveBeenCalledWith(initialState);
  });

  it('notifies its observers with the *new state* when its `next` method is called', () => {
    select.removeChild(unselectedOption);
    select.appendChild(selectedOption);

    select.dispatchEvent(new Event('change'));

    const newState = { dropdownChangesCount, shape: selectedOption.value };
    expect(observer0).toHaveBeenCalledTimes(2);
    expect(observer0).toHaveBeenLastCalledWith(newState);
    expect(observer1).toHaveBeenCalledTimes(2);
    expect(observer1).toHaveBeenLastCalledWith(newState);
  });
});
