import { mockData } from "../../utils/test-utils/mockData";
import { fireEvent, render, screen } from "../../utils/test-utils/test-utils";
import { Header } from "../Header";
import mockRouter from "next-router-mock";

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<Header />);
  });

  it("renders the Header component", () => {
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();

    const createButton = screen.getByTestId("create-trip");
    expect(createButton).toBeInTheDocument();
  });

  it("Clicking thea button should redirect to create modal", () => {
    const createButton = screen.getByTestId("create-trip");
    expect(createButton).toBeInTheDocument();

    fireEvent.click(createButton);
    expect(mockRouter.asPath).toBe("/?modal=create");
  });

  it("Clicking thea logo should redirect to home page", () => {
    mockRouter.push("/random-page");

    expect(mockRouter.asPath).toBe("/random-page");

    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();

    fireEvent.click(logo);
    expect(mockRouter.asPath).toBe("/");
  });
});
