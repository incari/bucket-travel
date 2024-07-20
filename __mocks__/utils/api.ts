// __mocks__/utils/api.ts
import { jest } from "@jest/globals";

export const useDeleteById = jest.fn(() => ({
  mutate: jest.fn(),
}));

export const useGetData = jest.fn();
export const useAddNewDestination = jest.fn(() => ({
  mutate: jest.fn(),
}));
export const useEditById = jest.fn(() => ({
  mutate: jest.fn(),
}));
