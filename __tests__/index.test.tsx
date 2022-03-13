import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import { axe } from "jest-axe";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", {
      name: /Alman Akka/i
    });

    expect(heading).toBeInTheDocument();
  });

  it("does not have accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
