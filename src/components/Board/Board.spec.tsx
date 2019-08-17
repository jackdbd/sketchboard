import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { ShapePickerOption } from "../Sidebar";
import { Board, TEST_ID_CONTAINER, TEST_ID_P } from "./Board";

describe("Board", () => {
  it("has the expected text", () => {
    const expected = `Draw a ${ShapePickerOption.Circle} (this is clickable)`;
    const { getByTestId } = render(<Board text={"Hello World"} />);
    expect(getByTestId(TEST_ID_P).textContent).toBe(expected);
  });

  it("can be clicked (TODO: re-render, wait for click to take effect?)", () => {
    const text = "Hello World";
    const { getByTestId } = render(<Board text={text} />);
    const el = getByTestId(TEST_ID_CONTAINER);
    fireEvent(el, new MouseEvent("click"));
  });

  it.todo("something to be done");
});
