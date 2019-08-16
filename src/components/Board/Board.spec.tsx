import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { Board, TEST_ID_CONTAINER } from "./index";

describe("Board", () => {
  it("has the expected text", () => {
    const { getByTestId } = render(<Board text={"Hello World"} />);
    expect(getByTestId(TEST_ID_CONTAINER).textContent).toBe(
      "Hello World (0 clicks)"
    );
  });

  it("can be clicked (TODO: re-render, wait for click to take effect?)", () => {
    const text = "Hello World";
    const { getByTestId } = render(<Board text={text} />);
    const el = getByTestId(TEST_ID_CONTAINER);
    fireEvent(el, new MouseEvent("click"));
  });

  it.todo("something to be done");
});
