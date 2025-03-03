import { render } from "@testing-library/react";
import { HeaderComponent } from "../components";
import { toBeInTheDocument } from "../utils/jest_helper";

jest.mock("react-router", () => ({
  useNavigate: jest.fn()
}));


describe("Header Component", () => {
  it("Should render and display the component", () => {
    render(<HeaderComponent />);

    toBeInTheDocument("Dashboard");
    toBeInTheDocument("Profile");

    const images = document.querySelectorAll("img");
    expect(images.length).toBe(1);
  });
});
