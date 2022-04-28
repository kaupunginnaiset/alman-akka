import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import Home from "../pages/index";

describe("Home", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");

  beforeAll(() => {
    useRouter.mockImplementation(() => ({
      pathname: "/",
      prefetch: () => new Promise(resolve => resolve)
    }));
  });

  it("renders a heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /Tapahtumat/i
    });

    expect(heading).toBeInTheDocument();
  });

  it("does not have accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
