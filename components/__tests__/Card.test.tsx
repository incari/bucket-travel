import { fireEvent, render, screen } from "../../utils/test-utils/test-utils";
import { Card } from "../Card";

import mockRouter from "next-router-mock";
import { useDeleteById } from "../../utils/api";

import { mockData } from "../../utils/test-utils/mockData";

jest.mock("../../utils/api");

jest.mock("next/router", () => jest.requireActual("next-router-mock"));

const mockDelete = jest.fn();
(useDeleteById as jest.Mock).mockReturnValue({ mutate: mockDelete });

describe("Card", () => {
  beforeEach(() => {
    mockRouter.push("/");
  });

  it("should render the card component", () => {
    //Initial route

    render(<Card destination={mockData[0]} />);

    const title = screen.getByText("Portugal");
    expect(title).toBeInTheDocument();
    const description = screen.getByText(/Embark on a journey/i);
    expect(description).toBeInTheDocument();
  });

  it("should render the introductions when it have", () => {
    const withIntroductions = {
      ...mockData[0],
      introduction: "This should be the introduction instead",
    };

    render(<Card destination={withIntroductions} />);

    const title = screen.getByText("Portugal");
    expect(title).toBeInTheDocument();
    const introduction = screen.getByText(
      /This should be the introduction instead/i
    );
    expect(introduction).toBeInTheDocument();
  });
  it("Should render buttons and  handle routing onClicks", () => {
    render(<Card destination={mockData[0]} />);

    const seeDescription = screen.getByTestId("see-trip-details");
    expect(seeDescription).toBeInTheDocument();

    fireEvent.click(seeDescription);

    // Check to open modal
    expect(mockRouter.asPath).toBe("/?modal=detail&id=1");

    // Check to edit modal
    const editButton = screen.getByTestId("edit-trip");
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);
    expect(mockRouter.asPath).toBe("/?modal=edit&id=1");

    // Check delete button
    const deleteButton = screen.getByTestId("delete-trip");
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    // Assert
    expect(mockDelete).toHaveBeenCalledWith(mockData[0].id);
  });
});
