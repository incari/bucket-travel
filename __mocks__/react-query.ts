import { jest } from "@jest/globals";
import { QueryObserverResult, UseQueryResult } from "@tanstack/react-query";

// Define a generic mock implementation for useQuery
export const useQuery: any = jest.fn().mockImplementation(() => ({
  data: undefined,
  isLoading: false,
  isError: false,
  error: null,
  refetch: jest.fn(),
})) as unknown as jest.MockedFunction<typeof useQuery>;
