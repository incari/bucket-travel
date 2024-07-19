// __mocks__/utils/api.ts
import { jest } from "@jest/globals";

export const useDeleteById = jest.fn(() => ({
  mutate: jest.fn(),
}));
