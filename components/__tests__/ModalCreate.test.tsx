import { fireEvent, render, screen } from "../../utils/test-utils/test-utils";

import { useGetData, useEditById, useAddNewDestination } from "../../utils/api";

import { ModalCreate } from "../Modal/ModalCreate";
import { mockData } from "../../utils/test-utils/mockData";

jest.mock("next/navigation", () => ({
  ...require("next-router-mock"),
  useSearchParams: () => jest.fn(),
  usePathname: () => jest.fn(),
}));

jest.mock("../../app/actions", () => ({
  ...require("next-router-mock"),
}));

// Mock hooks
jest.mock("../../utils/api", () => ({
  useGetData: jest.fn(),
  useAddNewDestination: jest.fn(() => ({
    mutate: jest.fn(),
  })),
  useEditById: jest.fn(() => ({
    mutate: jest.fn(),
  })),
}));

const mockGetData = useGetData as jest.Mock;
const mockEdit = useEditById as jest.Mock;
const mockCreate = useAddNewDestination as jest.Mock;

describe("ModalCreate", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with data", () => {
    mockGetData.mockReturnValue({
      data: mockData,
      isLoading: false,
    });

    render(<ModalCreate id="1" />);

    // Find the id=1 element
    const title = screen.getByLabelText(/Name/i);
    expect(title).toHaveValue("Portugal");

    const intro = screen.getByLabelText(/Introduction/i);
    expect(intro).toHaveValue("");
  });

  it("Render the empty form", () => {
    render(<ModalCreate id="" />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Italy")).toBeInTheDocument();

    expect(screen.getByText(/introduction/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/From Rome to Venice/i)
    ).toBeInTheDocument();

    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Discover the wonders of the Roman/i)
    ).toBeInTheDocument();

    expect(screen.getByText("Image")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Image URL")).toBeInTheDocument();

    expect(screen.getByText("Day by day Itinerary")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Location")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("Change values", () => {
    render(<ModalCreate id="1" />);

    const title = screen.getByLabelText(/Name/i);

    // Change the original value
    fireEvent.change(title, { target: { value: "France" } });

    // Assert the input value has been updated
    expect(title).toHaveValue("France");
  });
});
