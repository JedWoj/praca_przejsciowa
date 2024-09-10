// @vitest-environment jsdom
import {describe, expect, test} from "vitest";
import Spinner from "./Spinner";
import { render } from "@testing-library/react";

describe(Spinner, () => {
    test("should render spinner", () => {
        const { getByRole } = render(<Spinner />);

        const spinner = getByRole("progressbar");
        console.log(spinner);
    });
})