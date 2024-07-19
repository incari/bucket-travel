// card.test.tsx
import { fireEvent, render, screen } from "./test-utils";
import { Card } from "../Card";

import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import mockRouter from "next-router-mock";
import { useDeleteById } from "../../utils/api";

import { mockData } from "./mockData";

jest.mock("../../utils/api");

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
const queryClient = new QueryClient();

describe("Card", () => {
  it("should render the card component and handle routing", () => {
    //Initial route
    mockRouter.push("/");

    const mockDelete = jest.fn();
    (useDeleteById as jest.Mock).mockReturnValue({ mutate: mockDelete });

    render(
      <QueryClientProvider client={queryClient}>
        <Card destination={mockData[0]} />
      </QueryClientProvider>,

      {
        wrapper: MemoryRouterProvider,
      }
    );

    const title = screen.getByText("Portugal");
    expect(title).toBeInTheDocument();

    const seeDescription = screen.getByTestId("see-trip-details");
    expect(seeDescription).toBeInTheDocument();

    fireEvent.click(seeDescription);

    // Check to open modal
    expect(mockRouter.asPath).toBe("/?modal=detail&id=1");

    // Check to edit modal
    fireEvent.click(screen.getByTestId("edit-trip"));
    expect(mockRouter.asPath).toBe("/?modal=edit&id=1");

    // Check delete button
    const deleteButton = screen.getByTestId("delete-trip");
    fireEvent.click(deleteButton);

    // Assert
    expect(mockDelete).toHaveBeenCalledWith(mockData[0].id);
  });
});
