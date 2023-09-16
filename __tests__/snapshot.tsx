/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
import App from "../app/page";

it("renders homepage unchanged", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
