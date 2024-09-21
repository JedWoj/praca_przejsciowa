// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import Spinner from "./Spinner";

describe(Spinner, () => {
  test("should render spinner", () => {
    const { getByRole } = render(<Spinner />);

    const spinner = getByRole("progressbar");
    console.log(spinner);
  });
});
