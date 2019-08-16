import { render } from "@testing-library/react";
import React from "react";

import { Sidebar, TEST_ID_CONTAINER } from "./index";

describe("Sidebar", () => {
  it("has the expected text", () => {
    const { getByTestId } = render(<Sidebar text={"Hello World"} />);
    expect(getByTestId(TEST_ID_CONTAINER).textContent).toBe(
      "Hello World (0 clicks)"
    );
  });

  it.todo("is collapsible");
});
